<script setup lang="ts">
// import LHsignin from "./LHsignin.vue"
import LeftTiele from "../wheel/LeftTiele.vue";
import LHpersonalFm from "./LHpersonalFm.vue";
import LHpersonalizedMv from "./LHpersonalizedMv.vue";
import LHrecommendSongSheet from "./LHrecommendSongSheet.vue";
import LHtopic from "./LHtopic.vue";
import $api from '@/api/index'
import { ref } from "vue";
    
    const loading = ref(true)
    const recommendList = ref(null)
    const new_data = ref(null)
    const hot_data = ref(null)
    const mvList = ref(null)
    Promise.all([$api.recommend(),$api.playlistTrackAll(3779629),$api.playlistTrackAll(3778678),$api.personalizedMv()])
    .then(([song_datas,new_datas,hot_datas,personalizedMv_datas])=>{
        if(!song_datas.data.recommend)throw new Error("未登录");
        // 推荐歌单
        recommendList.value = song_datas.data.recommend
        // 排行榜
        new_data.value = new_datas.data
        hot_data.value = hot_datas.data
        // 推荐mv
        mvList.value = personalizedMv_datas.data
        // 子组件骨架状态
        loading.value = false
    })
    .catch(err=>console.log(err))
</script>
<template>
    <div>
        <!-- <LHsignin /> -->
        <LHrecommendSongSheet :songList="recommendList" :loading="loading" >
            <LeftTiele str="定制推荐" />
        </LHrecommendSongSheet>
        <LHpersonalFm />
        <LHtopic :loading="loading" :new_data="new_data" :hot_data="hot_data" >
            <template #newsong>
                <LeftTiele str="新歌top10"/>
            </template>
            <template #hotsong>
                <LeftTiele str="热歌top10" />
            </template>
        </LHtopic>
        <LHpersonalizedMv :loading="loading" :mvList="mvList" />
    </div>
</template>