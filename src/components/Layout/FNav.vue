<script setup lang="ts">
    import {useRouter} from 'vue-router'
    const router = useRouter();
    const navArr = [
        {nav:'主页',name:'home'},
        {nav:'榜单',name:'topic'},
        {nav:'我的',name:'mine'},
        {nav:'搜索',name:'search'}
    ];
    function changeRouter(name:string){
        router.push({
            name
        })
    }
</script>
<template>
    <div class="nav">
        <div style="
        height:50px;
        margin: 20px 0px 30px;
        padding: 0;">
            <img src="@/assets/logo1.png" alt="#" />
        </div>
        <div
        :class="router.currentRoute.value.name==item.name?'active':'hove'"
        @click="changeRouter(item.name)"
        v-for="item in navArr"
        :key="item.name"
        >
            {{item.nav}}
        </div>
    </div>
</template>
<style scoped>
    .nav{
        box-sizing: border-box;
        padding: 0 25px;
        width: 250px;
        background-color: rgb(247, 247, 247);
    }
    .nav img{
        background-color: transparent;
    }
    .nav div~div{
        cursor: pointer;
        padding: 8px 13px;
        transition: all 0.1s;
    }
    .hove:hover{
        background-color: aquamarine;
    }
    .active{
        background-color: rgb(222, 232, 240);
        color: rgb(188, 27, 27);
        border-radius: 5px;
    }
</style>