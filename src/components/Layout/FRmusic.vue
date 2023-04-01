<script setup lang="ts">
    import {ref} from "vue"
    import $api from "@/api/index";
    import { useSongPlay } from "@/stores/useSongPlay";
    import LeftTiele from "../wheel/LeftTiele.vue";
    import {useSongName} from "@/components/useSongName";

    const usesongplay = useSongPlay()

    let idList:number[];
    let recommendNewMusicList=ref<any[]>([]);
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
                    <div
                        :style="{backgroundImage:'url('+item.picUrl+'?param=500y500'+')'}"
                        class="bodyr"
                        @click="playMe(item.id)"
                        v-for="item in recommendNewMusicList" :key="item.id">
                            <p>{{item.name}}</p>
                            <p> {{useSongName(item.song.artists)}} - {{item.song.album.name}} </p>
                    </div>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>
<style scoped>
    .bodyr{
        height: 40px;
        margin-top: 5px;
        font-size: 15px;
        font-weight: 600;
        overflow: hidden;
        background-clip: content-box;
        -webkit-background-clip: text;
        color: rgba(0, 0, 0, 0.1);
        filter: blur(3px);
    }
    .bodyr p{
        cursor: pointer;
        overflow: inherit;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* filter: blur(1px); */
    }
    .bodyr p:last-child{
        font-size: 9px;
    }
</style>