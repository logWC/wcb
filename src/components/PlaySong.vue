<script setup lang="ts">
    import { ref,onMounted,watch,onBeforeUnmount } from "vue";
    import { useSongPlay } from "@/stores/useSongPlay";
    import $api from "@/api/index"
    import { useRouter } from "vue-router";
    import LikeIcon from "./wheel/LikeIcon.vue";

    const usesongplay = useSongPlay();
    const router = useRouter();
    
    let show = ref(true);
    let suspendBoolean = ref(false);
    let audioEl=ref(),int:number;
    // 播放、暂停
    function changePlayStatus(){
        audioEl.value.paused?audioEl.value.src&&audioEl.value.play():audioEl.value.pause()
    }
    // 播放结束
    function ended(){
        if(usesongplay.orderNum===0){
            // 单曲循环
            let src = audioEl.value.src
            audioEl.value.src = null
            setTimeout(()=>audioEl.value.src=src,200)
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
                usesongplay.clickPlayList(usesongplay.id)
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
    watch(()=>usesongplay.src,(val)=>{
        suspendBoolean.value = false;  // 加载状态
        audioEl.value.src = val;
        if(val){
            int = window.setInterval(()=>{
                if(audioEl.value.readyState==4){
                    window.clearInterval(int);
                    changePlayStatus()
                }
            },500)
        }else{
            audioEl.value.load()
        }
    })
    onMounted(()=>{
        wearOut(4000)
    })
    onBeforeUnmount(() => {
        window.clearInterval(int);
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
            @play="suspendBoolean=true"
            @pause="suspendBoolean=false"
            @ended="ended"
            ref="audioEl"
            id="audioEl"
            >
                对不起，你的浏览器不支持audio标签，请升级或更换浏览器进行播放
            </audio>
            <button>
                <LikeIcon :ids="usesongplay.id" />
            </button>
            <button @click="usesongplay.idIndex--">上一首</button>
            <button @click="changePlayStatus">{{!suspendBoolean?'播放':'暂停'}}</button>
            <button @click="usesongplay.idIndex++">下一首</button>
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
        bottom: -50px;
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
        background-color: white;
    }
    .thead audio{
        flex-grow: 1;
        height: inherit;
        background-color: inherit;
    }
    .thead button{
        background-color: inherit;
        border: none;
    }
    .thead img{
        width: 50px;
        height: 50px;
    }
</style>