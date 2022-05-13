<script setup lang="ts">
</script>

<template>
  <img v-show="$q.dark.mode" src="@/assets/icon_dark.svg">
  <img v-show="!$q.dark.mode" src="@/assets/icon_light.svg">
</template>
