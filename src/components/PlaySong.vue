<script setup lang="ts">
    import { ref,reactive,onMounted,watch,onBeforeUnmount } from "vue";
    import { useSongPlay } from "@/stores/useSongPlay";
    import $api from "@/api/index"
    import { useRouter } from "vue-router";
    import LikeIcon from "./wheel/LikeIcon.vue";

    const usesongplay = useSongPlay();
    const router = useRouter();
    
    let show = ref(true);
    let audioEl=ref(),int:number|null=null;
    let playStatusIconObj = reactive<any>({
        play:'#icon-pause',
        pause:'#icon-play',
        waiting:'#icon-jiazaizhong'
    })
    let playStatusIcon = ref(playStatusIconObj.pause);
    // 播放、暂停
    function changePlayStatus(){
        audioEl.value.paused?audioEl.value.src&&play():audioEl.value.pause()
    }
    // 播放结束
    function ended(){
        if(usesongplay.orderNum===0){
            // 单曲循环
            play()
        }else{
            usesongplay.idIndex++;
        }
    }
    // 播放出错
    function error(){
        if(usesongplay.src==null)return
        $api.checkMusic(usesongplay.id)
        .then(({data})=>{
            if(!data.success){
                usesongplay.clearMe(2)
            }else{
                console.log('start update src')
                usesongplay.updateSrc()
            }
        })
    }

    // 显示、隐藏
    let setTime:number;
    function penetrate(){
        show.value = true;
        window.clearTimeout(setTime)
    }
    function wearOut(time:number){
        setTime = window.setTimeout(()=>show.value=false,time)
    }
    // play song
    function play() {
        if(int===null){
            int = window.setInterval(()=>{
                    if(audioEl.value.readyState==4){
                        window.clearInterval(int as number);
                        int = null;
                        audioEl.value.play()
                    }
                },200)
        }
    }
    // 监听src：更新src、处理src出错
    watch(()=>usesongplay.src,(val)=>{
        audioEl.value.src = val;
        if(val){
            // play song
            play()
        }else{
            // clear audio status
            audioEl.value.load()
        }
    })
    onMounted(()=>{
        wearOut(4000)
    })
    onBeforeUnmount(() => {
        window.clearInterval(int as number);
    })
    // 跳转歌词路由
    function showLyric(){
        router.currentRoute.value.path!='/lyric'&&router.push('/lyric')
    };
    // 图片出错处理
    function imgError(event:Event){
        (event.target as HTMLImageElement).src = new URL('../assets/logo.png',import.meta.url).href
    }

</script>
<template>
    <div class="bodyr"
    :class="{whole1:!show,whole2:show}"
    @mouseleave="wearOut(2000)"
    @mouseenter="penetrate">
        <div style="background-color:transparent;height:20px"> </div>
        <div class="thead">
            <img @error="imgError" @click="showLyric" :src="usesongplay.url" alt="#" />
            <audio 
            @error="error"
            @play="playStatusIcon=playStatusIconObj.play"
            @pause="playStatusIcon=playStatusIconObj.pause"
            @playing="playStatusIcon=playStatusIconObj.play"
            @waiting="playStatusIcon=playStatusIconObj.waiting"
            @ended="ended"
            ref="audioEl"
            id="audioEl"
            >对不起,你的浏览器不支持audio标签,请升级或更换浏览器进行播放
            </audio>
            <button>
                <LikeIcon :ids="usesongplay.id" />
            </button>
            <button @click="usesongplay.idIndex--">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-play-previous"></use>
                </svg>
            </button>
            <button @click="changePlayStatus">
                <svg class="icon" :class="{transfrom:playStatusIcon===playStatusIconObj.waiting}" aria-hidden="true">
                    <use :xlink:href="playStatusIcon"></use>
                </svg>
            </button>
            <button @click="usesongplay.idIndex++">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-play-next"></use>
                </svg>
            </button>
            <button @click="usesongplay.changeOrderNum">{{usesongplay.orderStr}}</button>
        </div>
    </div>
</template>
<style scoped>
.bodyr{
    position: fixed;
    width: 100%;
    transition: all 0.3s;
}
.whole1{
    bottom: -53px;
}
.whole2{
    bottom: 0px;
}
@media screen and (max-aspect-ratio:1/1) {
    .whole1{
        bottom: 0px;
    }
}
.thead{
    display: flex;
    height: 50px;
    box-shadow: 0px -1px 5px #333;
    backdrop-filter: blur(5px);
}
.thead audio{
    flex-grow: 1;
    height: inherit;
}
.thead button{
    margin-left: 20px;
}
.thead button:first-of-type svg{
    font-size: 1.3em;
}
.thead button~button svg{
    font-size: 1.5em;
    padding: 5px;
    border: 2px solid rgb(163, 163, 163);
    background-color: rgb(97, 97, 97);
    border-radius: 30px;
}
.thead img{
    width: 50px;
    height: 50px;
}
.transfrom{
    animation: anrotateZ .5s alternate infinite;
}
@keyframes anrotateZ {
    100%{
        transform: rotateZ(90deg);
    }
}
</style>