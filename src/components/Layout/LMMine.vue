<script setup lang="ts">
import { useUser } from "@/stores/useUser";
import { useSongPlay } from "@/stores/useSongPlay";
import {useRouter} from 'vue-router'
import $api from '@/api/index'
import LMcoll from "./LMcoll.vue";

const useuser = useUser();
const router = useRouter();


// logout and clear (user/song status)
function logout(){
    $api.logout()
    .then(con=>{
        // clear song status
        useSongPlay().clearMe(0);
        // clear cache router and user status
        useuser.clearData();
        // 跳转路由
        useuser.changeSignIn(false)
        router.push('/');
    })
    .catch(error=>alert('退出失败'))
}
function runLikeList(){
    router.push('/likes')
}
function runSongList(id:number,title:string,name:string,src:string){
    router.push({
        name: 'SongListView',
        params:{
            id,title,name,src
        }
    })
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
        <div class="likeList" @click="runLikeList" v-if="useuser.likeList.length!==0">
            <img :src="useuser.likeList[0].al.picUrl">
            <div>
                <p>我喜欢的音乐</p>
                <span> {{useuser.likeList.length}}首 </span>
            </div>
        </div>
        <LMcoll :runSongList="runSongList" :userCreateList="useuser.userCreateList" />
    </div>
    <!-- 退出登录 -->
    <div class="signIn">
        <button @click="logout">退出登录</button>
    </div>
</template>
<style scoped>
.thead{
    text-align: center;
    padding: 20px;
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