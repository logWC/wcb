<script setup lang="ts">
    import {ref} from "vue"
    import type {Ref} from 'vue'
    import $api from "@/api/index";
    import { useSongPlay } from "@/stores/useSongPlay";
    import LeftTiele from "../wheel/LeftTiele.vue";
    import {useSongName} from "@/components/useSongName";

    const usesongplay = useSongPlay()

    let idList:number[];
    let recommendNewMusicList:Ref<any[]>=ref([]);
    let loading = ref(true);
    function playMe(id:number){
        if(usesongplay.uid!=1){
            usesongplay.setIdList(idList,1)
        }
        usesongplay.clickPlayList(id)
    }
    $api.recommendNewMusic()
    .then(({data})=>{
        recommendNewMusicList.value = data.result
        idList = data.result.map((val:any)=>val.id)
        loading.value = false;
    })
    .catch(error=>console.log(error))
</script>
<template>
    <div>
        <el-skeleton animated :loading='loading'>
            <template #template>
                <el-skeleton-item style="width:100px"></el-skeleton-item>
                <el-skeleton-item></el-skeleton-item>
                <ul>
                    <li v-for="item in 10" :key="item">
                        <el-skeleton-item style="height:100%" variant='image'></el-skeleton-item>
                    </li>
                </ul>
            </template>
            <template #default>
                <div>
                    <LeftTiele str="新音乐" />
                    <button @click="usesongplay.idIndex--">上一首 {{usesongplay.idIndex}}</button>
                    <button @click="usesongplay.idIndex++">下一首 {{usesongplay.idIndex}} </button>
                    <span @click="usesongplay.changeOrderNum"> {{usesongplay.orderStr}} </span>
                    <ul>
                        <li v-for="item in recommendNewMusicList" :key="item.id">
                            <div :style="{background:'url('+item.picUrl+'?param=500y500'+') center'}">
                                <div class="singers" @click="playMe(item.id)">
                                    <p>{{item.name}}</p>
                                    <span> {{useSongName(item.song.artists)}} - {{item.song.album.name}} </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>
<style scoped>
    ul{
        padding: 5px 0px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    li{
        height: 60px;
        display: flex;
        flex-basis: 48%;
        margin: 5px 0;
    }
    li img{
        height: 100%;
    }
    li > div{
        flex-grow: 1;
        overflow: hidden;
        position: relative;
    }
    
    li p{
        overflow: inherit;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    li span{
        display: block;
        overflow: inherit;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 9px;
    }
    .singers{
        box-sizing: border-box;
        position: absolute;
        left: 100%;
        top: 0;
        height: 100%;
        width: 100%;
        padding: 10px 15px;
        overflow: inherit;
        transition: all 0.6s 0.1s;
        background-color: rgba(96, 96, 96, 0.5);
        color: white;
        backdrop-filter: blur(6px);
    }
    li:hover > div > div{
        left: 0%;
        transition: left 0.3s 0.3s;
    }
    </style>