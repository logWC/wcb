<script setup lang='ts'>
import { useUser } from "@/stores/useUser";
import { ref } from "vue";

const useuser = useUser();
</script>
<template>
    <div class="user" v-if="useuser.profile!=null">
        <img :src="useuser.profile.avatarUrl" alt="头像" />
        <span>{{useuser.profile.nickname}}</span>
        <span>vip标识</span>
        <span>皮肤</span>
        <span>工具</span>
    </div>
</template>
<style scoped>
.user{
    display: flex;
    align-items: center;
    font-size: 13px;
    white-space: nowrap;
}
.user > img{
    width: 30px;
    height: 30px;
    border-radius: 100%;
}
.user > span{
    margin-left: 5px;
}
</style>