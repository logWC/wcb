<script setup lang='ts'>
import SongItem from '../wheel/SongItem.vue';

const props = defineProps<{
    runSongList:Function,
    userCreateList:any
}>()


</script>
<template>
    <div v-if="userCreateList!==null">
        <h3>创建的歌单</h3>
        <SongItem 
        v-for="item in props.userCreateList"
        :title="item.name"
        :url="item.coverImgUrl"
        @click="props.runSongList(item.id,item.name,item.creator.nickname,item.coverImgUrl)"
        :key="item.id"
        />
    </div>
</template>
<style scoped>

</style>