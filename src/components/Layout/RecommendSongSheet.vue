<script setup lang="ts">
    import {ref, computed} from 'vue'
    import { useRouter } from "vue-router";
    import $api from '@/api/index'
    import LeftTiele from "../wheel/LeftTiele.vue";

    const router = useRouter()

    let recommendList = ref<any[]>([]);
    const loading = ref(true);
    function clickMe(id:number,title:string,name:string,src:string):void{
        router.push({
            name: 'SongListView',
            params:{
                id,title,name,src
            }
        })
    }
    function obtainRecommendNewMusicList(){
        $api.recommend()
        .then(({data})=>{
            recommendList.value = data.recommend
            loading.value = false
        })
        .catch(error => console.log('出错了'))
    }
    obtainRecommendNewMusicList()
    const first = computed(()=> recommendList.value[0])
</script>
<template>
    <div style="width: 700px;margin: 0 auto;">
        <el-skeleton animated :loading='loading' >
            <template #template>
                <el-skeleton-item style="width:100px"></el-skeleton-item>
                <el-skeleton-item></el-skeleton-item>
                <div class="tbody">
                    <div class="tshow" v-for="item in 8" :key="item">
                        <el-skeleton-item style="width:140px;height:140px" variant='image'></el-skeleton-item>
                        <div>
                            <el-skeleton-item></el-skeleton-item>
                            <el-skeleton-item></el-skeleton-item>
                        </div>
                    </div>
                </div>
            </template>
            <template #default>
                <LeftTiele str="定制推荐" />
                <div class="bodyr">
                    <div class="dy">
                        <div @click="clickMe(first.id,first.name,first.creator.nickname,first.picUrl)">
                            <img :src="first.picUrl" alt="欧克" />
                            <p>{{first.name}}</p>
                        </div>
                    </div>
                    <div
                    class="vi">
                        <div class="vice">
                            <div
                            @click="clickMe(item.id,item.name,item.creator.nickname,item.picUrl)"
                            v-for="item in recommendList.slice(1,5)"
                            :key="item.id">
                                <img :src="item.picUrl" alt="没了" />
                                <p>{{item.name}}</p>
                            </div>
                        </div>
                        <div class="vice vice-e" v-if="recommendList.length>=9">
                            <div
                            @click="clickMe(item.id,item.name,item.creator.nickname,item.picUrl)"
                            v-for="item in recommendList.slice(5,9)"
                            :key="item.id">
                                <img :src="item.picUrl" alt="没了" />
                                <p>{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>
<style scoped>
.bodyr{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 400px;
}
.bodyr > div{
    width: 50%;
    height: 86%;
}
.dy{
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
}
.dy img{
    width: 91%;
    height: 91%;
    margin: 0 auto;
}
.vi{
    position:relative;
    transform-style: preserve-3d;
    perspective: 2000px;
}
.vice{
    position: absolute;
    top: 0px;
    left:0px;
    height: 98%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-content:space-around;
    justify-content: space-around;
}
.vice-e{
    display: none;
    transform:  translateZ(-10px) rotateY(-180deg);
}
.vice div{
    width: 34%;
    height: 45%;
}
.vice img{
    width: auto;
    height: 80%;
    box-shadow: -1px -1px 3px black;
}
.bodyr p{
    font-size: 13px;
    overflow: hidden;
    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>