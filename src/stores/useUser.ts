import { ref,reactive } from "vue";
import { defineStore } from "pinia";
import $api from "@/api/index";

export const useUser = defineStore('user', ()=>{
  const profile:any = ref(null);
  const likeList = reactive<any>([])
  const likeIdObj = reactive<any>({})

  function userData(profiles: any){
    // 存储用户信息
    profile.value = profiles;
    getLikeList()
  }
  async function getLikeList(){
    // 存储like的id
    let likeIdList = await $api.likeList(profile.value.userId)
    .then(({data})=>data.ids)
    // 存储like的list
    let songs = await $api.songDetail(likeIdList)
    .then(({data})=>data.songs)
    
    likeIdList.forEach((val:any,index:number) => {
      likeIdObj[val] = val
      likeList.push(songs[index])
    });
  }
  async function editorLike(id:number,boo:boolean){
    if(boo){
      likeIdObj[id] = id
      let data = await $api.songDetail(id)
      .then(({data})=>data.songs[0])
      likeList.unshift(data)
    }else{
      delete likeIdObj[id];
      let index = likeList.findIndex((val:any)=>val.id==id)
      likeList.splice(index,1)
    }
  }
  function clearData(){
    profile.value = null;
    likeList.length = [];
    for(let i in likeIdObj){
      delete likeIdObj[i]
    }
  }
  return {profile,likeList,likeIdObj,editorLike,userData,clearData}
})