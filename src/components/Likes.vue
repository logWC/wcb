<script setup lang="ts">
import SongLi from '@/components/wheel/SongLis.vue'
import {useUser} from '@/stores/useUser'

const useuser = useUser()
</script>
<template>
    <div v-if="useuser.likeList.length!=0">
        <h3>我喜欢的歌</h3>
        <SongLi :songArr="useuser.likeList" :uid="2" />
    </div>
</template>
<style scoped>
h3{
    text-align: center;
    padding: 15px 0;
    margin: 0 15px;
}
</style>