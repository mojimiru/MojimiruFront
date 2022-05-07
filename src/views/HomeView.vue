<template>
  <div class="home">
    <FontList/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'
import FontList from '@/components/FontList.vue'

@Options({
  components: {
    HelloWorld,
    FontList
  }
})
export default class HomeView extends Vue {}
</script>
