<script setup lang="ts">
import { useSongPlay } from "@/stores/useSongPlay";
import { ref,watch,onActivated,onMounted } from "vue";

const usesongplay = useSongPlay();

const lyricEl = ref();
const timeIndex = ref(0);

watch(()=>usesongplay.lyricContentList,(val)=>{
    timeIndex.value = 0;
})


function timeUpdated({target}:Event){
    let time = (<HTMLAudioElement>target).currentTime;
    while(usesongplay.lyricTimeList[timeIndex.value] < time){
        lyricEl.value.scrollTop = (usesongplay.lyricMap as Map<number, string>).get(timeIndex.value)
        timeIndex.value++
    }
    while(usesongplay.lyricTimeList[timeIndex.value-1] > time){
        lyricEl.value.scrollTop = (usesongplay.lyricMap as Map<number, string>).get(timeIndex.value-2)
        timeIndex.value--
    }
}

let audioEl;
onMounted(() => {
    audioEl = document.getElementById('audioEl');
    (<HTMLAudioElement>audioEl).addEventListener('timeupdate',timeUpdated)
}),

onActivated(()=>{
    timeIndex.value = timeIndex.value?timeIndex.value-1:0;
})
</script>
<template>
    <div class="whole" :style="{backgroundImage:'url('+usesongplay.url+')'}">
        <div class="wholeGlass">
            <div class="headr">
                未使用
            </div>
            <div class="bodyr">
                <div class="pic">
                    这里放图片
                </div>
                <div ref="lyricEl" class="lyric">
                    <p v-for="i in 8"></p>
                    <p :class="{red:timeIndex==index+1}" v-for="(i,index) in usesongplay.lyricContentList" :key="index">
                    {{i}}
                    </p>
                    <p v-for="i in 9"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.whole{
    width: 800px;
    min-height: 900px;
    background-color: white;
    background-position: center;
    position: relative;
    margin: 0 auto;
}
.wholeGlass{
    width: inherit;
    height: inherit;
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    background-color: rgba(128, 128, 128, 0.5);
    backdrop-filter: blur(10px);
}
.headr{
    width: inherit;
    height: 60px;
}
.bodyr{
    display: flex;
    flex-wrap: wrap;
    height: 540px;
    margin: 0 auto;
}
.pic{
    flex-basis: 50%;
    height: inherit;
}
.lyric{
    flex-basis: 50%;
    height: inherit;
    font-family: Arial;
    font-size: 15px;
    overflow: auto;
    scroll-behavior: smooth;
    transition: all 1s 0.5s ease-in;
    -webkit-transition: all 1s 0.5s ease-in;
}
.lyric::-webkit-scrollbar{
    /* 隐藏滚动条 */
    display: none;
}
p{
    min-height: 30px;
    line-height: 30px;
}
.red{
    color: rgb(117, 61, 8);
    font-size: 18px;
}
</style>