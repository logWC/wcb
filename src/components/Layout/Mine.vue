<script setup lang="ts">
import { inject } from "vue";
import { useUser } from "@/stores/useUser";
import { useSongPlay } from "@/stores/useSongPlay";
import {useRouter} from 'vue-router'
import $api from '@/api/index'

const useuser = useUser();
const router = useRouter();

const changeInclude:(arr:string[])=>void = (inject('changeInclude') as (arr:string[])=>void)

function logout(){
    $api.logout()
    .then(con=>{
        useSongPlay().clearMe(0);
        useuser.clearData();
        // 清空缓存
        changeInclude([]);
        // 跳转路由
        router.push('/');
    })
    .catch(error=>alert('退出失败'))
}
function likeListMe(){
    router.push('/likes')
}
</script>
<template>
    <div v-if="useuser.likeList.length!==0">
        <!-- 头像及名字 -->
        <div class="thead">
            <img :src="useuser.profile.avatarUrl" alt="正在加载">
            <p> {{useuser.profile.nickname}} </p>
        </div>
        <!-- like列表 -->
        <div class="likeList" @click="likeListMe" v-if="useuser.likeList.length!==0">
            <img :src="useuser.likeList[0].al.picUrl">
            <div>
                <p>我喜欢的音乐</p>
                <span> {{useuser.likeList.length}}首 </span>
            </div>
        </div>
    </div>
    <!-- 退出登录 -->
    <div class="signIn">
        <button @click="logout">退出登录</button>
    </div>
</template>
<style scoped>
.thead{
    margin: 10px;
    text-align: center;
}
.thead > img{
    width: 100px;
    height: 100px;
    border-radius: 100%;
}
.thead > p{
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
}
.likeList{
    display: flex;
    padding: 10px;
}
.likeList > img{
    width: 60px;
    height: 60px;
}
.likeList > div{
    box-sizing: border-box;
    height: 60px;
    flex-grow: 1;
    background-color: rgb(78, 106, 131);
    line-height: 20px;
    padding: 10px;
}
.likeList > span{
    display: block;
    font-size: 9px;
}
.signIn{
    display: flow-root;
    border-radius: 5px;
}
.signIn > button{
    box-sizing: border-box;
    float: right;
    padding: 5px 10px;
    margin: 10px;
    border-radius: 5%;
    border: 1px solid rgb(160, 160, 160);
    background-color: rgb(167, 194, 218);
}
</style>