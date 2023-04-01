<script setup lang="ts">
import LHsignin from "./LHsignin.vue"
import LHrecommendSongSheet from "./LHrecommendSongSheet.vue";
import LHtopic from "./LHtopic.vue";
import $api from '@/api/index'
import { ref } from "vue";
    
    const loading = ref(true)
    const recommendList = ref(null)
    const new_data = ref(null)
    const hot_data = ref(null)
    Promise.all([$api.recommend(),$api.playlistTrackAll(3779629),$api.playlistTrackAll(3778678)])
    .then(([song_datas,new_datas,hot_datas])=>{
        if(!song_datas.data.recommend)throw new Error("未登录");
        // 推荐歌单
        recommendList.value = song_datas.data.recommend
        // 排行榜
        new_data.value = new_datas.data
        hot_data.value = hot_datas.data
        // 子组件骨架状态
        loading.value = false
    })
    .catch(err=>console.log(err))
</script>
<template>
    <div>
        <LHsignin />
        <LHrecommendSongSheet :songList="recommendList" :loading="loading" />
        <LHtopic :loading="loading" :new_data="new_data" :hot_data="hot_data" />
    </div>
</template>