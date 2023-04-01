<script setup lang='ts'>
import LeftTiele from "../wheel/LeftTiele.vue";
import SongLi from "../wheel/SongLis.vue";

const props = defineProps<{
    new_data:any,
    hot_data:any,
    loading:boolean
}>()



</script>
<template>
    <div class="list" v-if="!props.loading">
        <div>
            <LeftTiele str="新歌榜" />
            <SongLi :uid="3779629" :song-arr="props.new_data.songs.slice(0,10)" :topic="true" />
        </div>
        <div>
            <LeftTiele str="热歌榜" />
            <SongLi :uid="3778678" :song-arr="props.hot_data.songs.slice(0,10)" :topic="true" />
        </div>
    </div>
</template>
<style scoped>
.list{
    display: flex;
    justify-content: space-between;
}
.list > div{
    width: 45%;
}
</style>