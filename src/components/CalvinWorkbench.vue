<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  calvinSteps,
  calvinPrefixStatuses,
  calvinScore,
  calvinNumber,
  calvinRoot,
  calvinEnvironmentRules,
  type CalvinRecord,
} from "../content/calvinExperience";
const props = defineProps<{ record: CalvinRecord }>();
const step = ref(0),
  frame = ref(0),
  prefix = ref<number | null>(null),
  trials = ref<number[]>([]);
watch(
  () => props.record,
  () => {
    step.value = 0;
    frame.value = 0;
    prefix.value = null;
    trials.value = [];
  },
);
const statuses = computed(() => calvinPrefixStatuses(prefix.value));
const score = computed(() => calvinScore(trials.value));
const selectedStep = computed(() => calvinSteps[step.value]);
const selectedFrame = computed(() =>
  props.record.kind === "door" ? props.record.frames[frame.value] : null,
);
const dimensions: Record<string, string> = {
  robot_obs: "TCP 位置 3 + 姿态 3 + 夹爪宽 1 + 机械臂关节 7 + 夹爪动作 1",
  scene_obs:
    "滑门 / 抽屉 / 按钮 / 开关各 1 + 灯泡 / LED 各 1 + 红蓝粉块位姿各 6",
  actions: "绝对目标位置 3 + 姿态 3 + 夹爪 1",
  rel_actions: "归一化相对位置 3 + 姿态 3 + 夹爪 1",
};
const stateLabels = ["x", "y", "z", "roll", "pitch", "yaw", "pad", "gripper"];
function resetPractice() {
  prefix.value = null;
  trials.value = [];
}
</script>
<template>
  <div class="cv-workbench">
    <template v-if="record.kind === 'chain'">
      <div class="cv-initial">
        <div>
          <span class="cv-eyebrow">序列文件给出的初始符号状态</span>
          <h3>从同一个环境，连续做五件事。</h3>
          <p>
            蓝块在桌上；红块在滑门左区，粉块在右区；夹爪未持物。下面是配置关系，不是机器人画面。
          </p>
        </div>
        <dl>
          <div v-for="(value, key) in record.initial" :key="key">
            <dt>{{ key }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </div>
      <p class="cv-boundary">
        任务链与规则示意 ·
        无实际执行记录。点击步骤只查看目标，不表示机器人已完成。
      </p>
      <ol class="cv-chain" aria-label="五个连续子任务">
        <li v-for="(task, i) in calvinSteps" :key="task.key">
          <button type="button" :aria-pressed="step === i" @click="step = i">
            <span class="cv-step-number">{{ i + 1 }}</span
            ><b>{{ task.title }}</b
            ><small>{{ i === 0 ? "起始环境" : "接续上一步环境" }}</small>
          </button>
        </li>
      </ol>
      <section class="cv-rule" aria-live="polite">
        <span class="cv-eyebrow"
          >步骤 {{ step + 1 }} · 官方固定版本规则解释</span
        >
        <h3>{{ selectedStep.relation }}</h3>
        <code>{{ record.tasks[step] }}</code>
        <blockquote lang="en" translate="no">
          {{ selectedStep.language }}
        </blockquote>
        <small>官方语言映射示例；配置文件未记录实际模型 prompt。</small>
        <p>{{ selectedStep.rule }}</p>
        <p class="cv-boundary">{{ selectedStep.warning }}</p>
        <a :href="calvinEnvironmentRules" target="_blank" rel="noreferrer"
          >核对任务判断代码 ↗</a
        >
        ·
        <a
          :href="`${calvinRoot}calvin_models/conf/callbacks/rollout/tasks/new_playtable_tasks.yaml`"
          target="_blank"
          rel="noreferrer"
          >参数配置 ↗</a
        >
      </section>
      <section class="cv-practice" aria-labelledby="cv-practice-title">
        <span class="cv-eyebrow">独立评分练习 · 由你设定，不是模型成绩</span>
        <h3 id="cv-practice-title">第三步失败，后两步还算执行过吗？</h3>
        <p>选择一条假设链的连续成功长度。首个失败即停止，后面不再执行。</p>
        <div
          class="cv-prefix-options"
          role="group"
          aria-label="设定假设连续成功长度"
        >
          <button
            v-for="n in 6"
            :key="n"
            type="button"
            :aria-pressed="prefix === n - 1"
            @click="prefix = n - 1"
          >
            {{ n === 6 ? "全部 5 步通过" : `第 ${n} 步停止` }}
          </button>
        </div>
        <ol class="cv-status-chain" aria-label="假设任务执行状态">
          <li
            v-for="(status, i) in statuses"
            :key="i"
            :class="{
              passed: prefix !== null && i < prefix,
              stopped: prefix === i,
            }"
          >
            <b>{{ i + 1 }}</b
            ><span>{{ status }}</span>
          </li>
        </ol>
        <p aria-live="polite">
          {{
            prefix === null
              ? "尚未设定，没有成绩。"
              : `这条假设链的连续成功长度 = ${prefix} / 5。`
          }}
        </p>
        <div class="cv-practice-actions">
          <button
            type="button"
            class="secondary-button"
            :disabled="prefix === null || trials.length >= 20"
            @click="prefix !== null && trials.push(prefix)"
          >
            加入假设小批次</button
          ><button type="button" class="pilot-link" @click="resetPractice">
            清空练习
          </button>
        </div>
        <template v-if="score"
          ><p>
            你设定的 {{ score.total }} 条假设链：<code>{{
              trials.join("、")
            }}</code
            >（最多 20 条）
          </p>
          <div class="cv-score-grid">
            <div v-for="(count, i) in score.counts" :key="i">
              <span>连续 ≥ {{ i + 1 }} 步</span
              ><b>{{ count }} / {{ score.total }}</b
              ><small>{{ ((count / score.total) * 100).toFixed(1) }}%</small>
            </div>
          </div>
          <p class="cv-average">
            平均连续成功长度 <b>{{ score.mean.toFixed(2) }} / 5</b>
          </p>
          <p>
            成功率@k = 连续成功长度 ≥ k 的链条数 ÷
            总链条数。不是五道独立题的准确率。
          </p></template
        >
      </section>
    </template>
    <template v-else-if="record.kind === 'pink'">
      <div class="cv-record-heading">
        <span class="cv-eyebrow">InternRobotics · train · episode 0</span>
        <h3 lang="en" translate="no">{{ record.task }}</h3>
        <p>
          轨迹元数据：46 帧、10 fps。本站数值摘录只保存第 0
          帧；其余帧没有在这里补造。
        </p>
      </div>
      <aside class="cv-boundary">
        <b>视频有来源，但本站不播放。</b>
        <p>
          上游演示和场景素材的独立再发布许可仍未确认。这不是加载失败；第三方卡片标注
          MIT，不自动覆盖上游媒体。
        </p>
      </aside>
      <h4>第 0 帧 · t = 0 秒</h4>
      <div
        class="cv-table-wrap"
        tabindex="0"
        role="region"
        aria-label="粉块首帧状态与动作数值"
      >
        <table>
          <caption>
            分字段读取；动作不是下一帧状态，不能据此判定粉块移动成功。
          </caption>
          <thead>
            <tr>
              <th>字段</th>
              <th>维数</th>
              <th>数值（五位小数）</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(values, key) in record.fields" :key="key">
              <th scope="row">
                <code>{{ key }}</code>
              </th>
              <td>{{ values.length }}</td>
              <td class="cv-numbers">
                {{ values.map(calvinNumber).join(" · ") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        官方推块规则还检查粉块本身位移与起末接触关系。这里没有对应起末物体接触数据，不能重算成功。10
        fps 是此转换集元数据，不等于官方 30 Hz 动作频率。
      </p>
    </template>
    <template v-else-if="record.kind === 'door' && selectedFrame">
      <div class="cv-record-heading">
        <span class="cv-eyebrow">CollisionCode · train · episode 0</span>
        <h3 lang="en" translate="no">move the door to the left side</h3>
        <p>
          65 帧训练轨迹，本站仅保存 0 / 32 / 64
          三个离散采样点。没有完整轨迹、图像或成功字段。
        </p>
      </div>
      <div
        class="cv-frame-picker"
        role="group"
        aria-label="选择已保存的滑门轨迹帧"
      >
        <button
          v-for="(f, i) in record.frames"
          :key="f.frame_index"
          type="button"
          :aria-pressed="frame === i"
          @click="frame = i"
        >
          <b>帧 {{ f.frame_index }}</b
          ><small>约 {{ f.timestamp.toFixed(1) }} 秒</small>
        </button>
      </div>
      <p class="cv-boundary">
        state 的 x / y / z
        是末端执行器位置字段，不是门的关节状态。坐标变化不能证明门成功移动；动作单位和转换缩放未重新确认，不直接标为米或下一帧坐标。
      </p>
      <div
        class="cv-table-wrap"
        tabindex="0"
        role="region"
        aria-label="滑门所选帧状态与动作对照"
      >
        <table>
          <caption>
            第
            {{
              selectedFrame.frame_index
            }}
            帧 · 数值保留五位小数；完整精度在下方原始记录。
          </caption>
          <thead>
            <tr>
              <th>分量</th>
              <th>观测 state（8 维）</th>
              <th>动作 actions（7 维）</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(label, i) in stateLabels" :key="label">
              <th scope="row">{{ label }}</th>
              <td>{{ calvinNumber(selectedFrame.state[i]) }}</td>
              <td>
                {{
                  label === "pad"
                    ? "不含此分量"
                    : calvinNumber(
                        selectedFrame.actions[label === "gripper" ? 6 : i],
                      )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else-if="record.kind === 'frame'">
      <div class="cv-record-heading">
        <span class="cv-eyebrow">第三方标注 validation · 未带任务标签</span>
        <h3>读得出字段，猜不出任务。</h3>
        <code>{{ record.key }}</code>
        <p>
          没有任务指令、时序后续、模型身份或
          success。不能把它当作上面的五任务链，也不能依据机器人姿态猜任务。
        </p>
      </div>
      <div
        class="cv-table-wrap"
        tabindex="0"
        role="region"
        aria-label="validation 单帧字段与维度"
      >
        <table>
          <caption>
            字段结构参照官方说明；第三方与原版帧的逐字段映射尚未核实。
          </caption>
          <thead>
            <tr>
              <th>本站保存字段</th>
              <th>维数</th>
              <th>官方结构说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(values, key) in record.fields" :key="key">
              <th scope="row">
                <code>{{ key }}</code>
              </th>
              <td>{{ values.length }}</td>
              <td>{{ dimensions[key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="cv-boundary">
        原查看接口还提供静态 / 腕部 RGB
        与深度通道。本站未复制画面；该第三方发布没有数据卡或明确素材许可。少量数值原文可在下方查看。
      </p>
      <a
        :href="`${calvinRoot}dataset/README.md`"
        target="_blank"
        rel="noreferrer"
        >核对官方字段说明 ↗</a
      >
    </template>
  </div>
</template>
