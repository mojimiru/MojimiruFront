<template>
  <FontList/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Components
import FontList from '../components/FontList.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    FontList
  }
})
</script>
