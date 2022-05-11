<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  fontData:{id:string, name:string, types:string[], weight:number, letters:string[], tags:string[], desc:string|undefined, url:string}
  content: string
  fontsize: number
  tagMap: {[key:string]:string}
}>()
</script>

<template>
  <q-card class="q-pa-md" style="width: 700px; max-width: 80vw;">
    <q-card-section align="start" class="q-pa-sm col-auto">
      <span class="title">{{fontData.name}}</span>
    </q-card-section>
    <q-card-section align="center" class="q-pa-sm col-12">
      <pre :id="fontData.id" :style="`white-space: pre-wrap; word-break:break-all; font-size: ${fontsize*1.5}px; color:black; font-family: '${fontData.id}'`">{{ content }}</pre>
    </q-card-section>
    <q-card-section  align="left" v-if="fontData.desc" class="q-pa-md" style="bottom: 0">
      <pre style="white-space: pre-wrap; font-family: sans-sarif;">{{fontData.desc}}</pre>
    </q-card-section>
    <q-card-section  align="right" class="q-pa-xs" style="bottom: 0">
      <q-chip v-for="a in fontData.tags" :key="a" dense size="0.8rem">
        {{tagMap[a]}}
      </q-chip>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn color="black" text-color="white" unelevated :href="fontData.url" target="_blank" label="配布ページを開く"><q-icon name="navigate_next"/></q-btn>
  </q-card-actions>
</q-card>
</template>

<style scoped>
.label {
  font-size: 1em;
}
.title {
  font-size: 1.2em;
  font-weight: 500;
}
</style>
