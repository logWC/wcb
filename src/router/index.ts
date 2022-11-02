import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: ()=>import('../views/LoginView.vue'),
    },
    {
      path: "/layout",
      component: () => import("../views/LayoutView.vue"),
      redirect:'/layout/home',
      children:[
        {path:'home',name:'home',component:()=>import('../views/LayoutHomeView.vue')},
        {path:'topic',name:'topic',component:()=>import('../views/LayoutTopicView.vue')},
        {path:'mine',name:'mine',component:()=>import('../views/LayoutMineView.vue')},
        {path:'search',name:'search',component:()=>import('../views/LayoutSearchView.vue')},
      ]
    },
    {
      path:'/songlist/:id/:src/:title?/:name?',
      name:'SongListView',
      component:()=>import('../views/SongListView.vue')
    },
    {
      path:'/likes',
      name:'likes',
      component:()=>import('../views/LikesView.vue')
    },
    {
      path:'/lyric',
      name:'lyric',
      component:()=>import('../views/LyricView.vue')
    }

  ],
  scrollBehavior(to,from,savedPosition){
    return {top:0}
  }
});

export default router;
