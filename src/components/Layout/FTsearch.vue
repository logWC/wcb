<script setup lang="ts">
import { ref } from "vue";
import $api from "@/api/index";

// 清除历史记录
// localStorage.removeItem('searchRecord')
// 获取历史记录
const historyData = ref<string[]>([]);
const historyData_ = localStorage.getItem('searchRecord');
if(historyData_){
    historyData.value = JSON.parse(historyData_);
}
// 存储历史记录
function historyDataLRU(content:string){
    historyData.value.forEach(
        (val,ind,arr)=>{
            val==content&&arr.splice(ind,1)[0]
        }
    )
    historyData.value.unshift(content)
    historyData.value.length==11&&historyData.value.pop()
    localStorage.setItem('searchRecord',JSON.stringify(historyData.value))
}

// 搜索建议显示控制
const pBoo = ref(false);
let showBoo_ = false
function blur(){
    pBoo.value = !showBoo_;
}
function focus(){
    pBoo.value = true;
    showBoo_ = true;
}
function mouseEnter(){
    showBoo_ = false
}
function mouseLeave(){
    showBoo_ = true
}

// 获取搜索结果
const songArr = ref<any[]>([]);
const searchContent = ref('')
function getSearch(content:string){
    // 清空搜索原先的结果
    songArr.value = [];
    // 点击历史记录触发的搜索需要在搜索框添加text
    searchContent.value = content;
    // 进行历史存储
    if(!content)return
    historyDataLRU(content);
    // 发送获取请求
    $api.search(content)
    .then(({data})=>{
        songArr.value = data.result.songs;
    })
    .catch(error=>alert('搜索出错了,'+error))
    // 隐藏搜索建议
    pBoo.value = false;
}

// 使用防抖获取搜索建议
const pList = ref<any[]>([]);
let i:number;
function throttle(event:KeyboardEvent){
    window.clearTimeout(i)
    if(event.code=='Enter'){
        getSearch(searchContent.value)
    }else{
        i = window.setTimeout(
            ()=>{
                if(searchContent.value==''){
                    pList.value = [];
                    // pBoo.value = false;
                }else{
                    // 获取搜索建议
                    pBoo.value = true
                    $api.searchSuggest(searchContent.value)
                    .then(({data})=>pList.value=data.result.songs || [])
                    .catch(error=>pList.value=[])
                }
            },100
        )
    }
}
</script>
<template>
    <div class="search">
        <!-- 搜索框 -->
        <input
        type="text"
        :value="searchContent"
        @input="val=>searchContent=(val.target as HTMLInputElement).value.trim()"
        @blur="blur"
        @click.stop
        @focus="focus"
        @keyup="throttle" />
        <button @click="getSearch(searchContent)">搜索</button>
        <!-- 历史记录 -->
        <ul
        v-show="pBoo&&historyData&&searchContent==''"
        @mouseleave="mouseLeave"
        @mouseenter="mouseEnter"
        class="proposal">
            <p>历史记录</p>
            <li @click="getSearch(content)" v-for="content in historyData" :key="content">{{content}}</li>
        </ul>
        <!-- 搜索建议 -->
        <ul v-show="pBoo&&pList.length!=0" @mouseleave="mouseLeave" @mouseenter="mouseEnter" class="proposal">
            <li @click="getSearch(item.name)" v-for="item in pList" :key="item.id">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>
<style scoped>
.search{
    height: 30px;
    display: flex;
    position: relative;
}
.search > input{
    box-sizing: border-box;
    flex-grow: 1;
    flex-basis: 78%;
    padding: 0 10px;
    background-color: transparent;
    background-color: white;
}
.search > button{
    width: 60px;
    flex-shrink: 0;
    border: none;
    outline: none;
}
.search > button:hover{
    background-color: rgb(161, 116, 58);
}
.proposal{
    width: 100%;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    top: 35px;
    z-index: 1;
}
.proposal > li{
    font-size: 13px;
    text-overflow: ellipsis;
    padding: 5px 0px;
    margin: 0px 10px;
    overflow: hidden;
    white-space: nowrap;
}
.proposal > li:hover{
    background-color: aliceblue;
}
.proposal > p{
    font-weight:bold;
    font-size: 15px;
    margin:0px 10px;
    padding:5px 0px;
    border-bottom:1px solid rgb(223, 222, 222);
}
</style>