import { ref,reactive } from "vue";
import { defineStore } from "pinia";
import $api from "@/api/index";

export const useUser = defineStore('user', ()=>{
  const profile:any = ref(null);
  const likeList = reactive<any>([])
  const likeIdObj = reactive<any>({})
  const userCreateList = ref<any>(null)
  const userCollectList = ref<any>(null)
  // set userdata
  async function userData(profiles: any){
    // get user likeids
    let likeIdList = await $api.likeList(profiles.userId)
    .then(({data})=>data.ids)
    // get user likelist
    $api.songDetail(likeIdList)
    .then(({data})=>{
      likeIdList.forEach((val:any,index:number) => {
        likeIdObj[val] = val
        likeList.push(data.songs[index])
      });
    })
    .catch(err=>console.log('$api songDetail catch',err))
    // 修改登录状态
    signIn.value = true
    // get coll/create list
    Promise.all([$api.userSubcount(),$api.userPlaylist(profiles.userId)])
    .then(([countObj,collectObj])=>{
        let i = countObj.data.createdPlaylistCount
        userCreateList.value = collectObj.data.playlist.slice(1,i)
        userCollectList.value = collectObj.data.playlist.slice(i)
    })
    // cache user profiles
    profile.value = profiles;
  }
  // get user status and set userData
  function getUserStatus(){
    $api.loginStatus()
    .then(({data})=>{
      if(data.data.profile){
        userData(data.data.profile)
      }
    })
    .catch(err=>console.log(err))
  }
  // like song
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
  // clear user data and cache router
  function clearData(){
    profile.value = null;
    likeList.length = 0;
    for(let i in likeIdObj){
      delete likeIdObj[i]
    }
    changeCacheRouter('clear')
  }
  // login component use a signIn status
  const signIn = ref(false)
  function changeSignIn(boo:boolean) {
    signIn.value = boo
  }
  // cache router
  const cacheRouter = ref(['LayoutView,LyricView'])
  function changeCacheRouter(param:any){
    if(param==='defined'&&cacheRouter.value.length===0){
      cacheRouter.value = ['LayoutView','LyricView']
    }else if(param==='clear'){
      cacheRouter.value = []
    }
  }
  return {profile,likeList,likeIdObj,editorLike,userData,getUserStatus,clearData,signIn,changeSignIn,cacheRouter,changeCacheRouter,userCreateList,userCollectList}
})