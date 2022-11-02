<script setup lang="ts">
  import { provide,ref } from "vue";
  import { RouterView } from "vue-router";
  import $api from '@/api/index'
  import {useUser} from '@/stores/useUser'
  import PlaySong from './components/PlaySong.vue'

  const useuser = useUser()

  $api.loginStatus()
  .then(({data})=>{
    if(data.data.profile.userId!==7943082392){
      useuser.userData(data.data.profile)
    }
  })
  .catch(error=>console.log(error.toString().includes('400')?'未登录':error))

  // 动态修改缓存路由,使用inject有Login、Mine组件
  const includeArr = ref(['LayoutView,LyricView']);
  function changeInclude(arr:string[]){
    includeArr.value = arr;
  }
  provide('changeInclude',changeInclude)

</script>
<template>
  <div>

    <RouterView v-slot="{Component}">
      <KeepAlive :include="includeArr">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <PlaySong />
  </div>
</template>