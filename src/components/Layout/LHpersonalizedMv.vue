<script setup lang='ts'>
import { computed } from "vue";
import { usePlayCount } from "../usePlayCount";
import { useSongName } from "../useSongName";
const props = defineProps<{
    loading:boolean,
    mvList:any
}>()
let mvList = computed(()=>{
    console.log(props.mvList.result)
    return props.mvList.result
})
</script>
<template>
    <div class="video_img" v-if="!props.loading">
        <div v-for="item in mvList" :key="item.id">
            <img :src="item.picUrl" alt="oh" />
            <div class="detail">
                <p>{{ item.copywriter }}</p>
                <p>{{ useSongName(item.artists) }}</p>
                <p>{{ item.name }}</p>
                <p>{{ usePlayCount(item.playCount) }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.video_img{
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
}
.video_img > div{
    height: inherit;
    position: relative;
    margin-right: 5%;
    background-color: aliceblue;
    overflow: hidden;
}
.video_img img{
    height: inherit;
}
.video_img div:hover > div{
    left: 0px;
}
.detail{
    transition: all .3s ease-in-out;
    position: absolute;
    left: 100%;
    top: 0px;
    height: inherit;
    width: 100%;
    font-size: .5em;
    color: white;
    backdrop-filter: grayscale(50%) brightness(70%) contrast(80%);
}
.detail p{
    padding: 2% 2% 0%;
}
.detail p:first-child{
    margin-bottom: 5%;
}
.detail p~p:not(:last-child){
    margin-left: 5%;
}
.detail p:last-child{
    position: absolute;
    right: 1%;
    bottom: 3%;
}
</style>