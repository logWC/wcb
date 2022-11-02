<script setup lang='ts'>
import $api from "@/api/index";
import { ref } from "vue";
import LeftTiele from "../wheel/LeftTiele.vue";
import SongLi from "../wheel/SongLi.vue";

const new_data = ref<any>({})
const hot_data = ref<any>({})
const hide_boo = ref(false)
Promise.all([$api.playlistTrackAll(3779629),$api.playlistTrackAll(3778678)])
.then(([new_datas,hot_datas])=>{
    new_data.value = new_datas.data
    hot_data.value = hot_datas.data
    hide_boo.value = true
})
.catch(err=>console.log(err))


</script>
<template>
    <div class="list" v-if="hide_boo">
        <div>
            <LeftTiele str="新歌榜" />
            <SongLi :uid="3779629" :song-arr="new_data.songs.slice(0,10)" :topic="true" />
        </div>
        <div>
            <LeftTiele str="热歌榜" />
            <SongLi :uid="3778678" :song-arr="hot_data.songs.slice(0,10)" :topic="true" />
        </div>
    </div>
</template>
<style scoped>
.list{
    display: flex;
    justify-content: space-between;
    width: 700px;
    margin: 0 auto;
    overflow: hidden;
}
.list > div{
    width: 45%;
}
</style>