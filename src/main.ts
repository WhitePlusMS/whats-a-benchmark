import { ViteSSG } from "vite-ssg";
import "@fontsource-variable/inter";
import { nextTick, ref } from "vue";
import {
  humanEvalInitialAnchor,
  preserveSavedDetailPosition,
  shouldWaitForDetailLayout,
} from "./lib/deferredDetailAnchor";
import App from "./App.vue";
import { allBenchmarks } from "./content/catalog";
import ExploreView from "./views/ExploreView.vue";
import { catalogNavigationKey } from "./composables/catalogNavigation";
import "./styles/main.css";

// Explicit content routes become real /benchmarks/<id>/index.html files at build time.
export const createApp = ViteSSG(
  App,
  {
    base: import.meta.env.BASE_URL,
    routes: [
      { path: "/", component: ExploreView },
      { path: "/embodied/", component: ExploreView },
      ...allBenchmarks.map((item) => ({
        path: `/benchmarks/${item.id}/`,
        component: () => import("./views/DetailView.vue"),
        meta: { benchmarkId: item.id },
      })),
      { path: "/compare/", component: () => import("./views/CompareView.vue") },
      {
        path: "/releases/",
        component: () => import("./views/ReleasesView.vue"),
      },
      { path: "/guide/", component: () => import("./views/GuideView.vue") },
      { path: "/about/", component: () => import("./views/AboutView.vue") },
      { path: "/404/", component: () => import("./views/NotFoundView.vue") },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("./views/NotFoundView.vue"),
      },
    ],
    scrollBehavior(to, from, saved) {
      if (saved) return saved;
      if (to.hash) return { el: to.hash, top: 120 };
      if (to.path === from.path) return false;
      return { top: 0 };
    },
  },
  ({ app, router, isClient }) => {
    const catalogLocation = ref("/");
    const embodiedLocation = ref("/embodied/");
    let catalogScrollTop = 0;
    let embodiedScrollTop = 0;
    app.provide(catalogNavigationKey, { catalogLocation, embodiedLocation });
    if (!isClient) return;

    // 只记录离开目录时的位置；筛选和视图状态本身由目录 URL 保存。
    router.beforeEach((to, from) => {
      // HumanEval, GSM8K, LIBERO, MMMLU and IFEval share this async-layout handshake.
      // A new navigation cancels the previous readiness/scroll request. Same-page
      // sample switches must keep the existing router behavior, not start a wait.
      humanEvalInitialAnchor.cancel();
      if (
        (to.path === "/benchmarks/human-eval/" && to.path !== from.path) ||
        (to.path === "/benchmarks/gsm8k/" && to.path !== from.path) ||
        (to.path === "/benchmarks/libero/" && to.path !== from.path) ||
        (to.path === "/benchmarks/mmmlu/" && to.path !== from.path) ||
        (to.path === "/benchmarks/ifeval/" && to.path !== from.path) ||
        (to.path === "/benchmarks/calvin/" && to.path !== from.path) ||
        (to.path === "/benchmarks/bfcl/" && to.path !== from.path)
      )
        humanEvalInitialAnchor.begin(to.fullPath);
      if (from.path === "/" && from.matched.length && to.path !== "/") {
        catalogLocation.value = from.fullPath;
        catalogScrollTop = window.scrollY;
      }
      if (
        from.path === "/embodied/" &&
        from.matched.length &&
        to.path !== "/embodied/"
      ) {
        embodiedLocation.value = from.fullPath;
        embodiedScrollTop = window.scrollY;
      }
    });
    router.options.scrollBehavior = async (to, from, saved) => {
      const documentNavigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;
      const restoreSaved =
        !!saved &&
        preserveSavedDetailPosition(
          from.matched.length > 0,
          humanEvalInitialAnchor.matches(to.fullPath) && !!to.hash,
          documentNavigation?.type,
        );
      let waitedForInitialLayout = false;
      const initialAnchorToken = humanEvalInitialAnchor.token(to.fullPath);
      if (
        shouldWaitForDetailLayout(
          initialAnchorToken !== undefined,
          !!to.hash,
          restoreSaved,
        )
      ) {
        // Hash targets and saved pixel positions both depend on the final layout.
        // User interaction or a newer navigation always cancels the restoration.
        const cancel = () => humanEvalInitialAnchor.cancel();
        const events = [
          "wheel",
          "touchstart",
          "pointerdown",
          "keydown",
        ] as const;
        for (const event of events)
          window.addEventListener(event, cancel, { passive: true });
        try {
          if (!(await humanEvalInitialAnchor.wait(to.fullPath))) return false;
          await nextTick();
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
          if (
            humanEvalInitialAnchor.token(to.fullPath) !== initialAnchorToken ||
            router.currentRoute.value.fullPath !== to.fullPath
          )
            return false;
          humanEvalInitialAnchor.cancel();
          waitedForInitialLayout = true;
        } finally {
          for (const event of events) window.removeEventListener(event, cancel);
        }
      } else if (initialAnchorToken !== undefined) {
        // A fresh entry without a hash or saved position needs no deferred scroll.
        humanEvalInitialAnchor.cancel();
      }
      if (restoreSaved && saved) return { ...saved, behavior: "instant" };
      if (to.hash) {
        // 精确引用可能在折叠的来源定位中；先展开祖先，刷新深链接也能到达。
        const target = document.getElementById(to.hash.slice(1));
        for (let parent = target; parent; parent = parent.parentElement)
          if (parent instanceof HTMLDetailsElement) parent.open = true;
        const offset = Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--anchor-offset",
          ),
        );
        return {
          el: to.hash,
          top: offset,
          ...(waitedForInitialLayout ? { behavior: "instant" as const } : {}),
        };
      }
      if (to.path === from.path) return false;
      if (to.fullPath === catalogLocation.value)
        return { top: catalogScrollTop, behavior: "instant" };
      if (to.fullPath === embodiedLocation.value)
        return { top: embodiedScrollTop, behavior: "instant" };
      return { top: 0 };
    };
  },
);
