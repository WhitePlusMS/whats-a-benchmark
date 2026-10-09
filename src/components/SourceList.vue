<script setup lang="ts">
import { useRoute } from "vue-router";
import type { SourceReferenceGroup } from "../lib/sourceReferences";
import { sourceRoleLabels } from "../content/labels";
import Icon from "./Icon.vue";
defineProps<{ groups: SourceReferenceGroup[] }>();
const route = useRoute();
</script>
<template>
  <div class="source-list">
    <article v-for="group in groups" :key="group.first.id" class="source-entry">
      <a
        :id="group.first.id"
        :href="group.first.source.url"
        target="_blank"
        rel="noreferrer"
        class="source-main"
      >
        <span class="source-number">[{{ group.first.number }}]</span>
        <span>
          <strong>{{ group.first.source.label }}</strong>
          <small
            >{{
              group.roles.map((role) => sourceRoleLabels[role]).join(" · ")
            }}
            · <span translate="no">{{ group.host }}</span></small
          >
        </span>
        <Icon name="up" :size="19" />
      </a>
      <details
        v-if="group.locations.length"
        class="source-locations"
        :open="
          group.locations.some((location) => route.hash === `#${location.id}`)
        "
      >
        <summary>其他段落定位 · {{ group.locations.length }}</summary>
        <ul>
          <li
            v-for="location in group.locations"
            :id="location.id"
            :key="location.id"
          >
            <a :href="location.source.url" target="_blank" rel="noreferrer"
              >[{{ location.number }}] {{ location.source.label }}
              <Icon name="up" :size="13"
            /></a>
          </li>
        </ul>
      </details>
    </article>
  </div>
</template>
