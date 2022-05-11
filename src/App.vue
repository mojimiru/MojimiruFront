<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="`bg-${$q.dark.mode?'black':'white'}`">
      <q-toolbar>
        <q-toolbar-title>
          <div id="input" class="row items-center">
            <span id="cursor" class="text-transparent col-0">{{ activeContent }}<span :class="$q.dark.mode?'text-white':'text-black'">|</span></span>
            <q-input :color="$q.dark.mode?'white':'black'" class="q-pa-sm col-12" dense v-model="activeContent" bg-color="transparent"
              @change="change" />
          </div>
        </q-toolbar-title>
        <q-btn dense :color="$q.dark.mode?'white':'black'" icon="filter_alt" class="q-mr-sm" @click="drawer = !drawer" outline></q-btn>
        <q-btn dense :color="$q.dark.mode?'white':'black'" :icon="$q.dark.mode?'dark_mode':'light_mode'" class="q-mr-sm" @click="$q.dark.toggle" outline></q-btn>
        <q-btn dense :color="$q.dark.mode?'white':'black'" icon="question_mark" class="q-mr-sm" @click="questionDialog = true" outline></q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <FontList ref="fontlist" :text="activeContent" :selected="selectedTags" :tagMap="tagMap" />
      <q-dialog full-width v-model="drawer">
        <q-card class="q-pa-md">
          <div class="row items-start">
            <q-input class="q-pa-sm grow" :color="$q.dark.mode?'white':'black'" label="表示したい文章を入力" style="font-size: 1.2rem;" clearable
              v-model="activeContent" outlined autogrow @change="change" />
            <q-btn :color="$q.dark.mode?'white':'black'" icon="close" flat round dense v-close-popup />
          </div>
          <div v-for="(tags, i) in fontJson.tags" :key="i" class="q-pa-sm col-auto">
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
import { useQuasar } from 'quasar'

const $q = useQuasar()

const questionDialog = ref(false)

const activeContent = ref('ParaGlyph')
const fontlist = ref(null)
const drawer = ref(false)
const change = () => {
  fontlist.value?.reflesh()
}
const tagMap = Object.fromEntries(fontJson.tags.flatMap(Object.entries))

const selectedTags = ref(fontJson.tags.map(() => []))

onMounted(() => {
  const speed = 100
  const value = activeContent.value
  value.split('').forEach((char, index) => {
    setTimeout(() => {
      activeContent.value = activeContent.value + char
      change()
    }, speed * index)
  })

  setTimeout(() => {
    change()
  }, speed * value.length)

  activeContent.value = ''
  change()
})
</script>

<style>
* {
  font-family: Roboto, 'Helvetica Neue', sans-serif;
}

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

.grow{
  flex-grow:100;
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
