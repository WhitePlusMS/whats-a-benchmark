import { ViteSSG } from "vite-ssg";
import { ref } from "vue";
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
    let catalogScrollTop = 0;
    app.provide(catalogNavigationKey, { catalogLocation });
    if (!isClient) return;

    // 只记录离开目录时的位置；筛选和视图状态本身由目录 URL 保存。
    router.beforeEach((to, from) => {
      if (from.path === "/" && from.matched.length && to.path !== "/") {
        catalogLocation.value = from.fullPath;
        catalogScrollTop = window.scrollY;
      }
    });
    router.options.scrollBehavior = (to, from, saved) => {
      if (saved) return { ...saved, behavior: "instant" };
      if (to.hash) return { el: to.hash, top: 150 };
      if (to.path === from.path) return false;
      if (to.fullPath === catalogLocation.value)
        return { top: catalogScrollTop, behavior: "instant" };
      return { top: 0 };
    };
  },
);
import "./styles/responsive.css";
