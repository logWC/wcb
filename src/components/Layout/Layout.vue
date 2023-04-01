<script setup lang="ts">
    import { ref,onMounted } from "vue";
    import {RouterView} from 'vue-router'
    import FLNav from "./FLNav.vue";
    import FRNav from "./FRNav.vue";
    import Tail from "../Tail.vue";
    import FHead from "./FTHead.vue";
    import BackCan from '../wheel/BackCan.vue'
    let main = ref();
    let height = ref(0)
    onMounted(()=>{
        height.value = main.value.offsetHeight
    })

</script>
<template>
    <div class="root">
        <!-- 左侧固定导航 -->
        <FLNav class="stick" />
        <div class="bo">
            <!-- 固定头部 -->
            <FHead class="stick" />
            <main ref="main" class="main">
                <!-- 主体内容 -->
                <div>
                    <RouterView v-slot="{Component}">
                        <KeepAlive>
                            <component :is='Component' />
                        </KeepAlive>
                    </RouterView>
                    <Tail />
                </div>
                <BackCan class="back-can" :heigh="height" />
            </main>
        </div>
        <!-- 右侧导航 -->
        <FRNav class="show" />
    </div>
</template>
<style scoped>
.root{
    display: flex;
    justify-content: space-between;
    /* *** */
}
.bo{
    flex-grow: 1;
    border-left: 1px solid rgb(223, 223, 223);
    border-right: 1px solid rgb(223, 223, 223);
    /* overflow: clip; */
}
.main{
    position: relative;
    overflow-x: hidden;
    top: 0;
}
.main > div{
    width: 700px;
    margin: 0px 30px 60px;
}
.back-can{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
}
.stick{
    position: sticky;
    top: 0px;
}
.show{
    box-sizing: border-box;
    width: 300px;
    margin: 0 30px;
}
@media (max-width:1250px){
    .show{
        width: 240px;
    }
}
@media (max-width:1150px) {
    .show{
        display: none;
    }
}
</style>