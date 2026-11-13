<script setup lang="ts">
import type { TaskSample } from "../types/benchmark";
import { computed, ref } from "vue";
import {
  findLiberoCase,
  liberoOfficialRoot,
  liberoVideoSource,
  readLiberoFrame,
  readLiberoTask,
} from "../content/liberoExperience";
import {
  liberoMediaUrl,
  nextLiberoMediaRetryToken,
  isCurrentMediaEvent,
} from "../lib/liberoMediaRetry";
import LiberoRelations from "./LiberoRelations.vue";
const props = defineProps<{ sample: TaskSample }>();
const entry = computed(() => findLiberoCase(props.sample.id));
const train = computed(() => entry.value?.kind === "train");
const frame = computed(() => readLiberoFrame(props.sample.raw));
const task = computed(() => readLiberoTask(props.sample.raw, train.value));
const panel = ref("goal"),
  observation = ref("video"),
  failed = ref<string[]>([]),
  retry = ref(0);
const retryToken = ref("");
const media = computed(() =>
  props.sample.assets?.find((a) =>
    observation.value === "video"
      ? a.kind === "video"
      : a.kind === "image" &&
        a.path.includes(observation.value === "first" ? "first" : "last"),
  ),
);
const mediaFailed = computed(
  () => !!media.value && failed.value.includes(media.value.path),
);
function fail(path: string, event?: Event) {
  if (!isCurrentMediaEvent(event)) return;
  if (!failed.value.includes(path)) failed.value.push(path);
}
function retryMedia() {
  failed.value = [];
  retry.value++;
  retryToken.value = nextLiberoMediaRetryToken();
}
const base = import.meta.env.BASE_URL;
</script>

<template>
  <div class="libero-pilot">
    <article v-if="entry && task" class="libero-workbench">
      <header class="libero-workbench-head">
        <div>
          <span>{{ entry.badge }}</span>
          <h3>
            {{
              train
                ? "两个杯子，两项同时成立的目标"
                : "两只黑碗，只拿关系描述指定的那只"
            }}
          </h3>
        </div>
        <span class="libero-badge">{{
          train ? "episode 0 · 214 帧" : "task 0 · trial 0 · seed 7"
        }}</span>
      </header>
      <div class="libero-layout">
        <div class="libero-observation">
          <template v-if="train">
            <div
              class="libero-media-controls"
              role="group"
              aria-label="选择真实观测材料"
            >
              <button
                v-for="v in [
                  { id: 'video', label: '播放观测' },
                  { id: 'first', label: '首帧 · 0' },
                  { id: 'last', label: '末帧 · 213' },
                ]"
                :key="v.id"
                type="button"
                :aria-pressed="observation === v.id"
                @click="observation = v.id"
              >
                {{ v.label }}
              </button>
            </div>
            <div class="libero-screen">
              <div v-if="mediaFailed" class="libero-media-error" role="alert">
                <b>这份观测媒体加载失败</b>

                <button
                  type="button"
                  class="primary-button"
                  @click="retryMedia"
                >
                  重试图解媒体</button
                ><a :href="sample.source" target="_blank" rel="noreferrer"
                  >查看源分片 ↗</a
                >
              </div>
              <video
                v-else-if="media?.kind === 'video'"
                :key="`${media.path}:${retry}`"
                :src="liberoMediaUrl(base, media.path, retryToken)"
                controls
                playsinline
                preload="metadata"
                aria-label="双杯 train 轨迹 0 的真实观测帧合成视频"
                @error="fail(media.path, $event)"
              />
              <img
                v-else-if="media?.kind === 'image'"
                :key="`${media.path}:${retry}`"
                :src="liberoMediaUrl(base, media.path, retryToken)"
                :alt="media.alt"
                width="256"
                height="256"
                @error="fail(media.path, $event)"
              />
            </div>
            <div class="libero-timeline">
              <span>0.0 s · frame 0</span><i aria-hidden="true" /><span
                >21.3 s · frame 213</span
              >
            </div>
            <p class="libero-caption">
              214 帧 / 10 Hz · 视频容器时长 21.4 秒，末帧时间戳约 21.3
              秒。由场景相机观测按 10 Hz 重新编码，不是原始录像。
            </p>
            <p class="libero-camera-note">
              画面右侧是白杯，左侧是黄白杯。任务的 left / right
              来自场景定义，不能直接当作屏幕左右。
            </p>
          </template>
          <template v-else>
            <div class="libero-scene-heading">
              <span>先定位物体，再执行动作</span>
              <h4>“在盘子与 ramekin 之间”</h4>
            </div>
            <LiberoRelations :train="false" />
            <p class="libero-camera-note">
              目标是
              <code>akita_black_bowl_1</code
              >。场景还有另一只黑碗，仅凭“黑色”不足以确定对象。
            </p>
            <a
              class="primary-button libero-video-link"
              :href="liberoVideoSource"
              target="_blank"
              rel="noreferrer"
              >打开这次第三方运行的原录像 ↗</a
            >
            <p class="libero-caption">
              录像仅外链，不复制或截帧。第三方数据卡为 license:
              other，未给出独立明确的再发布授权。双杯视频不属于这次运行。
            </p>
          </template>
        </div>
        <div class="libero-inspect">
          <div class="libero-panels" role="group" aria-label="选择证据视角">
            <button
              v-for="p in [
                { id: 'goal', label: '目标关系' },
                { id: 'record', label: train ? '首帧记录' : '单次日志' },
                { id: 'judge', label: '如何判断' },
              ]"
              :key="p.id"
              type="button"
              :aria-pressed="panel === p.id"
              @click="panel = p.id"
            >
              {{ p.label }}
            </button>
          </div>
          <section v-if="panel === 'goal'" class="libero-panel">
            <span class="libero-eyebrow">语言 → 对象 → 目标关系</span>
            <h4>
              {{ train ? "不是“随便放上一个盘子”" : "关系描述决定目标对象" }}
            </h4>
            <LiberoRelations v-if="train" :train="true" />
            <template v-else
              ><div class="libero-goal-equation">
                <span>akita_black_bowl_1</span><b>↓ On</b><span>plate_1</span>
              </div>
              <p>
                先用 between
                关系定位黑碗，再把它放到指定盘子。图示只说明关系，不提供可直接执行的坐标。
              </p></template
            >
            <div class="libero-original">
              <span>来源记录中的任务原文</span>
              <p translate="no">
                {{ task }}
              </p>
            </div>
            <p class="libero-caption">
              {{
                train
                  ? "白杯 porcelain_mug_1 → plate_1；黄白杯 white_yellow_mug_1 → plate_2。"
                  : "上面英文来自第三方日志；官方 BDDL 的语言含 akita，不冒充同一份原文。"
              }}
            </p>
          </section>
          <section v-else-if="panel === 'record'" class="libero-panel">
            <span class="libero-eyebrow">{{
              train ? "仅展示已保存的首帧数值" : "第三方报告 · 不是本站评测"
            }}</span>
            <h4>
              {{ train ? "相机之外，还有状态与动作" : "一次运行，不是成功率" }}
            </h4>
            <template v-if="train && frame"
              ><div
                v-for="(values, key) in {
                  state: frame.state,
                  action: frame.action,
                }"
                :key="key"
                class="libero-vector"
              >
                <h5>
                  {{
                    key === "state"
                      ? "observation.state · 8 维"
                      : "action · 7 维"
                  }}
                </h5>
                <ol>
                  <li v-for="(value, i) in values" :key="i">
                    <span>[{{ i }}]</span><code>{{ value.toFixed(5) }}</code
                    ><i
                      :style="{
                        width: `${Math.min(100, Math.abs(value) * 28 + 3)}%`,
                      }"
                    />
                  </li>
                </ol>
              </div>
              <p class="libero-caption">
                为阅读舍入到 5 位小数；精确值见下方
                raw。条形仅表达数值大小，不是动作方向或轨迹。没有完整
                state/action 序列，不补造中间动作。
              </p></template
            >
            <template v-else-if="!train"
              ><dl class="libero-log">
                <div>
                  <dt>环境动作步 action_steps</dt>
                  <dd>79</dd>
                </div>
                <div>
                  <dt>该次 status</dt>
                  <dd>success</dd>
                </div>
                <div>
                  <dt>task / trial / seed</dt>
                  <dd>0 / 0 / 7</dd>
                </div>
              </dl>
              <p>
                日志报告这次成功。79
                是环境动作步，不是模型决策次数；运行配置另有
                replan=5、wait_steps=10。
              </p>
              <p class="libero-caption">
                路径中的 official 是第三方命名，不表示 LIBERO
                官方发布。本页没有运行该策略，也不从一条记录计算整体成功率。
              </p></template
            >
            <a :href="sample.source" target="_blank" rel="noreferrer"
              >核对固定版本原始记录 ↗</a
            >
          </section>
          <section v-else class="libero-panel">
            <span class="libero-eyebrow">官方固定版本规则 · 本站解释</span>
            <h4>看起来放上了，不等于检查已通过。</h4>
            <p>
              <code>On</code>
              检查仿真状态中的接触与位置条件，不只看图像。环境遍历目标条件并做逻辑合取。
            </p>
            <p v-if="!train" class="libero-camera-note">
              此例的目标为
              <code>On(akita_black_bowl_1, plate_1)</code
              >。本页解释当前固定官方规则，未证明第三方历史运行使用的依赖 SHA
              与之相同。
            </p>
            <p v-if="train" class="libero-caption">
              训练末帧仅提供观测，不附官方 success 输出，不能据画面补写成功。
            </p>
            <a
              :href="`${liberoOfficialRoot}libero/libero/envs/object_states/base_object_states.py#L78-L94`"
              target="_blank"
              rel="noreferrer"
              >查看 On 的接触与位置检查 ↗</a
            >
          </section>
        </div>
      </div>
    </article>
  </div>
</template>
<style scoped src="../styles/pilot-common.css"></style>
<style scoped src="../styles/libero-pilot.css"></style>
