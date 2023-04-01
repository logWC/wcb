<script setup lang="ts">
  import { RouterView } from "vue-router";
  import {useUser} from '@/stores/useUser'
  import PlaySong from './components/PlaySong.vue'

  const useuser = useUser()

  useuser.getUserStatus()

</script>
<template>
  <div>
    <RouterView v-slot="{Component}">
      <KeepAlive :include="useuser.cacheRouter">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <PlaySong />
  </div>
</template>