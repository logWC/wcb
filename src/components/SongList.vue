<script setup lang="ts">
    import { ref } from "vue";
    import $api from "@/api/index";
    import { useRoute } from "vue-router";
    import SongLi from "./wheel/SongLis.vue";

    const route = useRoute()

    let songArr = ref([]);
    let loading = ref(true);

    $api.playlistTrackAll(route.params.id)
    .then(({data})=>{
        if(data.songs){
            songArr.value = data.songs;
            loading.value = false;
        }else{
            alert('歌曲好像太多了')
        }
    })
    .catch(error=>console.log('未知错误',error))

</script>
<template>
    <el-skeleton animated :loading='loading'>
        <template #template>
            <div style="text-align:center;padding:15px 0px">
                <el-skeleton-item style="width:100px;height:25px" />
            </div>
            <div style="display:flex;">
                <el-skeleton-item class="image" variant='image' />
                <div style="flex-grow:1;margin:5px 25px;">
                    <el-skeleton-item />
                    <el-skeleton-item />
                </div>
            </div>
            <div>
                <div style="padding:20px 0px">
                    <el-skeleton-item style="width:100px;height:20px" />
                </div>
                <el-skeleton-item style="height:35px" v-for="item in 20" :key="item" variant='h1' />
            </div>
        </template>
        <template #default>
            <div>
                <h3>歌单详情</h3>
                <div class="head-div">
                    <img class="image" :src="(route.params.src as string)" alt="加载出错" />
                    <div>
                        <h4>{{route.params.title}}</h4>
                        <p>歌单创作者: {{route.params.name}}</p>
                    </div>
                </div>
                <SongLi :uid="parseFloat((<string>route.params.id))" :songArr='songArr' />
            </div>
        </template>
    </el-skeleton>
</template>
<style scoped>
    h3{
        text-align: center;
        padding: 15px 0;
    }
    .image{
        width: 100px;
        height: 100px;
    }
    .head-div{
        display: flex;
        height: 100px;
        background-color: green;
    }
    .head-div > div{
        flex-grow: 1;
    }
    .head-div > div h4{
        color: white;
        line-height: 1.5em;
        max-height: 3em;
        -webkit-line-clamp: 2;
    }
    .head-div > div *{
        margin: 10px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
    }
    .head-div > div p{
        -webkit-line-clamp: 1;
    }
</style>