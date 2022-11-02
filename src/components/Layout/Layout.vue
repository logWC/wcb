<script setup lang="ts">
    import Nav from "./FNav.vue";
    import {RouterView} from 'vue-router'
    import { ref,onBeforeUnmount } from "vue";
    import Tail from "../Tail.vue";
    import FHead from "./FHead.vue";

    // 动态改变高度
    const rootHeight = ref(window.innerHeight)
    let i = true;
    function changeRootHeight(){
        rootHeight.value = window.innerHeight;
        i=true
    }
    function resize() {
        if(i){
            i=false
            window.setTimeout(changeRootHeight,100)
        }
    }
    window.addEventListener('resize',resize)
    onBeforeUnmount(()=>{
        window.removeEventListener('resize',resize)
    })
</script>
<template>
    <div class="root">
        <!-- 左侧导航 -->
        <Nav class="navr" :style="{height:rootHeight+'px'}"></Nav>
        <!-- 主体 -->
        <div class="main" :style="{height:rootHeight+'px'}">
            <!-- 主体固定头部 -->
            <FHead class="main-head" />
            <!-- 主体内容 -->
            <div>
                <RouterView v-slot="{Component}">
                    <KeepAlive>
                        <component :is='Component' />
                    </KeepAlive>
                </RouterView>
                <Tail />
            </div>
        </div>
    </div>
</template>
<style scoped>
    .root{
        display: flex;
    }
    .navr{
        flex-shrink: 0;
        overflow: hidden;
    }
    .main{
        flex-grow: 1;
        max-width:800px;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .main::-webkit-scrollbar{
        display: none;
    }
    .main-head{
        position: sticky;
        top: 0px;
        z-index: 1;
    }
</style>