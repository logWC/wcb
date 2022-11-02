import {ref, computed} from 'vue'
import type {Ref} from 'vue'
import { defineStore } from "pinia";
import $api from "@/api/index";

let canvas = document.createElement("canvas");
let measureText = (canvas.getContext('2d') as CanvasRenderingContext2D);
measureText.font = "15px Arial"

export const useSongPlay = defineStore('songPlay', ()=>{
    let uid = ref(0);  // 唯一标识符
    let id:Ref<number> = ref(0);  // song 的 id

    // 上一首、下一首的组件逻辑
    let idIndex = computed({
        get(){
            console.log('id变了没，还是playList变了')
            return playList.value.length==0?0:playList.value.findIndex(i=>i==id.value)
        },
        set(val){
            if(playList.value.length!=0){
                if(val<0){
                    val = playList.value.length-1
                }else if(val==playList.value.length){
                    val = 0
                }
                id.value = playList.value[val]
                getSongInfo(id.value)
            }
        }
    })

    // 播放循序逻辑
    let orderNum = ref(0);
    const orderArr = ['正在单曲循环','正在顺序播放','正在随机播放'];
    let orderStr = computed(()=>{
        return orderArr[orderNum.value]
    })
    function changeOrderNum(){
        console.log('开始改变orderNum')
        orderNum.value = orderNum.value==2?0:orderNum.value+1
        if(playList.value.length==0)return
        if(orderNum.value==2){
            changePlayList(playList.value)
        }else if(orderNum.value==0){
            playList.value = idList.value
        }
    }

    // idList赋值
    let idList:Ref<number[]> = ref([]);  // playList 的 源idList
    let playList:Ref<number[]> = ref([]);  // playList 的 idList
    function setIdList(list:number[],num:number){
        console.log('开始赋值idList')
        uid.value = num
        let i = list.length;
        let o = 0;
        idList.value = []
        playList.value = []
        for(o;o<i;o++){
            idList.value.push(list[o])
            playList.value.push(list[o])
        }
    }

    // 播放列表组件逻辑，点击播放时，可能需要改变播放顺序
    function clickPlayList(i:number){
        console.log('开始点击播放')
        id.value = i
        orderNum.value==2&&changePlayList(playList.value)
        getSongInfo(i)
    }

    // 获取歌曲信息
    let src:Ref<string | null> = ref(null);  // song 的 src
    let url = ref('');  // song 的 img
    function getSongInfo(i:number){
        console.log('开始获取歌曲信息')
        // 清空数据
        clearMe();
        // 获取歌曲信息
        Promise.all([$api.song(i),$api.songDetail(i),$api.lyric(i)])
        .then(([src_,url_,lyrics])=>{
            if(src_.data.data[0].url&&src_.data.code==200){
                src.value = src_.data.data[0].url
                url.value = url_.data.songs[0].al.picUrl
                lyricMe(lyrics.data.lrc.lyric)
            }else if(src_.data.code==-462){
                alert('请登录播放')
            }else{
                console.log('没有版权')
                clearMe(1)
                // 暂时逻辑
                idIndex.value++
            }
        })
        .catch(error=>alert('获取歌曲信息出错，可能断网了'))
    }

    // 歌词数组赋值
    let lyricTimeList:Ref<number[]> = ref([])
    let lyricContentList:Ref<string[]> = ref([])
    let lyricMap:Ref<Map<number,string> | null> = ref(null);
    function lyricMe(lrc:string){
        let extrasHeight=0;
        let lyric = lrc.split('\n');
        let reg = /\[\d*:\d*(\.|:)\d*/g;
        let currentTimeList = []
        let currentContentList:string[] = []
        let map = new Map()
        let width,i;
        lyric.forEach((val,index)=>{
            // 转换时间为秒，并以键值对显示 时间：歌词
            let timeReg = val.match(reg)
            if (timeReg){
                let content = val.replace(timeReg[0],"").slice(1)
                let min_ = timeReg[0].match(/\[\d*/g)
                let sec_ = timeReg[0].match(/\d*\.\d/g)
                let time:number;
                if(min_ && sec_){
                    time = parseFloat(min_[0].slice(1))*60 + parseFloat(sec_[0])
                    currentTimeList.push(time)
                    currentContentList.push(content)
                    map.set(index,(index*30)+extrasHeight)
                }
                width = measureText.measureText(content).width
                if(width>=400){
                    i = Math.floor(width/400)
                    extrasHeight = (30*i)+extrasHeight
                }
            }
        })
        /* 优化最后一句台词 */
        currentTimeList.push(999999)
        /* 歌词赋值 */
        lyricTimeList.value = currentTimeList
        lyricContentList.value = currentContentList
        lyricMap.value = map
    }

    // 改变playList顺序
    function changePlayList(arr:number[]){
        console.log('开始改变playList')
        let i = arr.length
        let arr_ = []
        for(let o=0;o<i;o++){
            arr_.push(arr[o])
        }
        for(i;i>0;i--){
            let ran = Math.floor(Math.random()*i)
            arr_.push(arr_.splice(ran,1)[0])
        }
        playList.value = arr_
    }

    // 重置数据
    function clearMe(num=-1){
        // 0:退出登录
        // 1:没有版权
        // 2:src失效
        console.log('开始清除数据')
        lyricTimeList.value = [];
        lyricContentList.value = [];
        lyricMap.value?.clear();
        if(num==1){
            src.value = null;
            url.value = ''
        }else if(num==2){
            src.value = null;
        }else if(num==0){
            uid.value=0;
            playList.value=[];
            idList.value=[];
            id.value=0;
            idIndex.value=0;
            src.value = null
            url.value='';
        }
    }
    return {
        id,
        uid,
        src,
        url,
        idIndex,
        setIdList,
        clickPlayList,
        lyricTimeList,
        lyricContentList,
        lyricMap,
        orderNum,
        orderStr,
        changeOrderNum,
        clearMe
    }
})