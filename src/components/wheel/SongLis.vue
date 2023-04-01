<script setup lang="ts">
    import { ref, computed,onMounted } from 'vue';
    import {useSongName} from '@/components/useSongName'
    import { useSongPlay } from "@/stores/useSongPlay";
    import LikeIcon from './LikeIcon.vue'
    import CollSong from './CollSongIcon.vue';

    // 接受参数
    interface Props {
        songArr:any[],
        uid:number,
        topic?:boolean
    }
    const props = withDefaults(defineProps<Props>(),{
        topic:false
    })
    // 获取idList，用于传递给store
    const idList = computed(()=>{
        return props.songArr.map(val=>val.id)
    })
    // 传递idList，用于播放
    let usesongplay:any = false;
    function playMe(id:number){
        if(usesongplay===false){
            usesongplay = useSongPlay();
        }
        if(usesongplay.uid!=props.uid){
            usesongplay.setIdList(idList.value,props.uid)
        }
        usesongplay.clickPlayList(id)
    }

    // 控制显示like图标
    let detailsIndex = ref(0);
    function detailsChange(id=0){
        detailsIndex.value=id;
        return;
    }

    // 触底加载
    let touchbottom = ref<null|HTMLButtonElement>(null);
    function openIo(){
        let io = new IntersectionObserver(entries=>entries[0].isIntersecting&&getAllSong())
        io.observe((touchbottom.value as HTMLButtonElement))
    }
    const num = ref(0);
    function getAllSong(){
        console.log('触底了');
        let startIndex = showData.value.length;
        let maxIndex = props.songArr?props.songArr.length:0;
        if(startIndex+50<=maxIndex){
            num.value = startIndex + 50;
        }else if(startIndex<maxIndex){
            num.value = maxIndex;
        }else{
            return
        }
    }
    const showData = computed(()=>{
        return props.songArr?props.songArr.slice(0,num.value):[]
    })

    onMounted(()=>{
        openIo()
    })

</script>
<template>
    <div>
        <p style="font-weight:bold;padding: 10px 0px;" v-if="!topic">歌曲{{songArr.length}}</p>
        <ul>
            <li v-if="!topic" class="li-first">
                <div><i style="margin-right:20px;"></i>歌曲</div>
                <div>
                    <span>歌手</span>
                </div>
                <div>
                    <span>专辑</span>
                </div>
                <button>
                    <span>详情</span>
                </button>
            </li>
            <li class="body-li" v-for="(item,index) in showData" :key="item.id">
                <div @click="playMe(item.id)">
                    <i style="margin-right:10px">{{index+1}}</i>
                    {{item.name}}
                </div>
                <!-- 歌手名字分隔 -->
                <div>
                    <span v-if="item.ar"> {{useSongName(item.ar)}} </span>
                    <span v-else> {{useSongName(item.artists)}}</span>
                </div>
                <div v-if="!topic">
                    <span v-if="item.al">{{item.al.name}}</span>
                    <span v-else="item.album">{{item.album.name}}</span>
                </div>
                <button :class="{relative:item.id===detailsIndex}" v-if="!topic" @blur="detailsChange()">
                    <div class="absolute" v-if="item.id===detailsIndex">
                        <LikeIcon :ids="item.id" />
                        <CollSong :id="item.id" />
                    </div>
                    <svg @click="detailsChange(item.id)" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-androidgengduo"></use>
                    </svg>
                </button>
            </li>
        </ul>
        <div ref="touchbottom"></div>
    </div>
</template>
<style scoped>
    li{
        display: flex;
        justify-content: space-between;
    }
    .body-li:hover{
        background-color: rgb(167, 72, 72);
    }
    .body-li>*{
        padding: 15px 10px 15px 4.5px;
        font-size: 14px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .body-li> div> span,.body-li svg{
        cursor: pointer;
    }
    li > div:nth-of-type(1){
        flex-basis: 35%;
        flex-shrink: 5;
        flex-grow: 1;
    }
    li > div:nth-of-type(2){
        flex-basis: 20%;
        flex-shrink: 0;
        flex-grow: 0.3;
        font-size: 10px;
        color:red;
    }
    li > div:nth-of-type(3){
        flex-basis: 25%;
        flex-shrink: 5;
        flex-grow: 1;
    }
    li button{
        flex-basis: 8%;
        flex-shrink: 0;
        text-align: center;
        padding: 15px 0;
    }
    .li-first div,.li-first span{
        color: rgb(128, 128, 128);
        font-size: 10px;
    }
    .relative{
        position: relative;
        overflow: visible;
    }
    .absolute{
        position: absolute;
    }
</style>