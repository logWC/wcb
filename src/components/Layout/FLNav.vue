<script setup lang="ts">
    import {useRouter} from 'vue-router'
    const router = useRouter();
    const navArr = [
        {nav:'主页',name:'home',icon:'#icon-zhuye'},
        {nav:'榜单',name:'topic',icon:'#icon-a-xiaofeipaihang2x'},
        {nav:'我的',name:'mine',icon:'#icon-31wode'},
        {nav:'搜索',name:'search',icon:'#icon-31sousuo'}
    ];
    function changeRouter(name:string){
        router.push({
            name
        })
    }
</script>
<template>
    <div class="nav">
        <div class="nav-logo">
            <img src="@/assets/logo.png" alt="#" />
        </div>
        <div class="nav-body">
            <div v-for="item in navArr" :key="item.name">
                <div
                    :class="{'active':router.currentRoute.value.name==item.name}"
                    :title="item.nav"
                    @click="changeRouter(item.name)">
                        <svg
                            class="icon"
                            aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                        </svg>
                </div>
            </div>
        </div>
        <div class="nav-tail">
            <svg
                class="icon"
                aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
            </svg>
        </div>
    </div>
</template>
<style scoped>
    .nav{
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        width: 79px;
        height: 100vh;
        text-align: center;
    }
    .nav-logo{
        width:inherit;
        padding-top: 40px;
    }
    .nav-logo img{
        width: 40px;
    }
    .nav-body{
        width: inherit;
    }
    .nav-body svg{
        font-size: 23px;
    }
    .nav-body > div{
        padding-bottom: 35px;
    }
    .nav-body > div > div{
        cursor: pointer;
    }
    .nav-tail{
        width: inherit;
        padding-bottom: 60px;
    }
    .nav-tail svg{
        font-size: 32px;
    }
    .active{
        color: rgb(188, 27, 27);
    }
</style>