<script setup lang="ts">
    import {computed} from 'vue'
    import { useRouter } from "vue-router";

    const router = useRouter()
    // 跳转歌单路由
    function clickMe(id:number,title:string,name:string,src:string):void{
        router.push({
            name: 'SongListView',
            params:{
                id,title,name,src
            }
        })
    }
    const props = defineProps<{
        loading:boolean
        songList:any
    }>()
    const first = computed(()=>props.songList[0])
</script>
<template>
    <div>
        <el-skeleton animated :loading='props.loading' >
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
                <slot></slot>
                <div class="bodyr">
                    <div class="first_div" @click="clickMe(first.id,first.name,first.creator.nickname,first.picUrl)">
                        <img :src="first.picUrl" alt="欧克" />
                        <p>{{first.name}}</p>
                    </div>
                    <div class="vi">
                        <div
                            @click="clickMe(item.id,item.name,item.creator.nickname,item.picUrl)"
                            v-for="item in props.songList.slice(1,5)"
                            :key="item.id">
                                <img :src="item.picUrl" alt="没了" />
                                <p>{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>
<style scoped>
.bodyr{
    /* ***h:w=4:7 */
    height: 400px;
    font-size: .5em;
    display: flex;
    align-items: center;
}
.vi div{
    /* ***h change vi img */
    height: 45%;
    position:relative;
    overflow: hidden;
}
.bodyr > div{
    height: 80%;
    position:relative;
}
.bodyr img{height: 100%;}
.bodyr p{
    opacity: 0;
    transition: all .5s ease-out;
    padding: 2% 3%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0px;
    backdrop-filter: contrast(60%) blur(10px);
    overflow: hidden;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
}
.bodyr div:hover > p{opacity: 1;}
.vi{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-between;
}
</style>