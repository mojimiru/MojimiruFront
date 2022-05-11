<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar>
        <q-toolbar-title>
          <div id="input" class="row items-center">
            <span id="cursor" class="text-transparent col-0">{{ activeContent }}<span class="text-black">|</span></span>
            <q-input color="black" class="q-pa-sm col-12" dense v-model="activeContent" bg-color="transparent"
              @change="change" />
          </div>
        </q-toolbar-title>
        <q-btn flat round dense color="black" icon="filter_alt" class="q-mr-sm" @click="drawer = !drawer" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <FontList ref="fontlist" :text="activeContent" :selected="selectedTags" :tagMap="tagMap" />
      <q-dialog full-width v-model="drawer">
        <q-card class="q-pa-md">
          <q-input class="q-pa-sm" color="black" label="表示したい文章を入力" style="font-size: 1.2rem;" clearable
            v-model="activeContent" outlined autogrow @change="change" />
          <div v-for="(tags, i) in fontJson.tags" :key="i" class="q-pa-sm">
            <ChipGroup v-model="selectedTags[i]"
              :options="Object.entries(tags).map(v => ({ value: v[0], label: v[1] }))">
            </ChipGroup>
          </div>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FontList from './components/FontList.vue'
import * as fontJson from '@/assets/fonts.json'
import ChipGroup from './components/ChipGroup.vue'

const activeContent = ref('ParaGlyph')
const fontlist = ref(null)
const drawer = ref(false)
const change = () => {
  fontlist.value?.reflesh()
}
const tagMap = Object.fromEntries(fontJson.tags.flatMap(Object.entries))

const selectedTags = ref(fontJson.tags.map(() => []))

let cursor: HTMLElement | null = null

onMounted(() => {
  cursor = document.getElementById('cursor')
})
</script>

<style>
#input input {
  font-size: 1.5rem;
  font-family: sans-serif;
  caret-color: transparent;
}

#cursor {
  animation: flash 1s step-end infinite;
  font: 1.5rem sans-serif;
  position: absolute;
  padding: 10px 8px;
}

@keyframes flash {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
