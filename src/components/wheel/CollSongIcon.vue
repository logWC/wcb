<script setup lang='ts'>
import $api from "@/api/index";
import { useUser } from "@/stores/useUser";
import { ref,nextTick } from "vue";

const useuser = useUser()
function collsongMe(change:string,listid:number,id:number) {
    $api.addSongdelSong(change,listid,id)
    .then(({data})=>{
        console.log(data)
    })
    .catch(err=>{console.log(err)})
}

const props = defineProps<{
    id:number
}>()

const colldiv = ref()
const boo = ref(false)
function showColl(event:MouseEvent) {
    boo.value = true
    nextTick(()=>{
        let innerHeight = window.innerHeight;
        let offsetHeight = colldiv.value.offsetHeight;
        if(innerHeight>offsetHeight){
            let gap = innerHeight-event.y-offsetHeight;
            if(gap<0){
                colldiv.value.style.top=gap+'px'
            }
        }
    })
}
</script>
<template>
    <div class="relative" v-if="useuser.userCreateList!==null">
        <svg class="icon" @click.once="showColl" aria-hidden="true">
            <use xlink:href="#icon-tx-shizixing"></use>
        </svg>
        <div class="items" ref="colldiv" v-show="boo">
            <p
            v-for="item in useuser.userCreateList"
            @click="collsongMe('add',item.id,props.id)"
            :key="item.id"
            :title="item.name"
            >{{item.name}}</p>
        </div>
    </div>
</template>
<style scoped>
svg{
    width: 16px;
    cursor: pointer;
}
.relative{
    position: relative;
}
.items{
    position: absolute;
    right: 100%;
    top: 0px;
    border: 1px #999 solid;
    border-radius: 5px;
    background-color: white;
    padding: 10px;
}
.items > p{
    text-align: left;
    height: 20px;
    max-width: 150px;
    padding: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 3px;
}
.items > p:hover{
    background-color: rgb(0, 193, 207);
}
</style>