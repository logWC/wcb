import axios from 'axios'

const myInterceptors = axios.interceptors.request.use(function (config){
    console.log(config.url)
    return config
}, function(error){
    console.log('出错了')
    return Promise.reject(error)
})

function time(){
    return Math.random()
}
export default {
    logon<T>(phone:T,password:T,captcha:T){
        return axios.get(`/api/login/cellphone?phone=${phone}&password=${password}${captcha?'&captcha='+captcha+'&':'&'}time=${time()}`)
    },
    // 获取验证码
    getCaptcha<T>(phone:T){
        return axios.post(`/api/captcha/sent`,{
            phone
        })
    },
    // 验证验证码
    captchaVerify<T>(phone:T,captcha:T){
        return axios.get(`/api/captcha/verify?phone=${phone}&captcha=${captcha}`)
    },
    // 二维码登录：获取key
    qrKey(){
        return axios.get(`/api/login/qr/key?time=${time()}`)
    },
    // 二维码登录：获取二维码
    qrCreate<T>(key:T){
        return axios.get(`/api/login/qr/create?key=${key}&qrimg=${true}&time=${time()}`)
    },
    // 二维码登录，检测扫码状态
    qrCheck<T>(key:T){
        return axios({url:`/api/login/qr/check?key=${key}&time=${time()}`})
    },
    // 登录状态
    loginStatus(){
        return axios.get(`/api/login/status?time=${time()}`)
    },
    // 刷新登录状态
    loginRefresh(){
        return axios.get(`/api/login/refresh`)
    },
    // 退出登录
    logout(){
        return axios.get(`/api/logout?time=${time()}`)
    },
    // 游客账号
    regiterAnonimous(){
        return axios.get(`/api/register/anonimous?time=${time()}`)
    },
    // 用户信息，歌单，收藏，mv，dj数量
    userSubcount(){
        return axios.get(`/api/user/subcount?time=${time()}`)
    },
    // 获取用户歌单
    userPlaylist(uid:number,limit=30,offset=0){
        return axios.get(`/api/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}&time=${time()}`)
    },
    // 喜欢列表
    likeList<T>(id:T){
        // axios.interceptors.request.eject(myInterceptors)
        return axios.get(`/api/likelist?uid=${id}&time=${time()}`)
    },
    // 喜欢
    like<T,K>(id:T,boole:K){
        return axios.get(`/api/like?id=${id}&like=${boole}&time=${time()}`)
    },
    // 推荐歌单
    recommend(){
        return axios.get(`/api/recommend/resource?time=${time()}`)
    },
    // 歌单详情
    songListDetails<T>(id:T){
        return axios.get('/api/playlist/detail',{
            params:{
                id
            }
        })
    },
    // 获取歌单所有歌曲
    playlistTrackAll<T>(id:T){
        return axios.get(`/api/playlist/track/all?id=${id}`)
    },
    // 向歌单添加歌曲
    addSongdelSong<T,K,Y>(change:T,pid:K,id:Y){
        return axios.get(`/api/playlist/tracks?op=${change}&pid=${pid}&tracks=${id}`)
    },
    // 推荐音乐（首）
    recommendNewMusic(){
        return axios.get(`/api/personalized/newsong?time=${time()}`)
    },
    // 专辑
    album<T>(id:T){
        return axios.get('/api/album',{
            params:{
                id
            }
        })
    },
    // 音乐,返回promise类型的url
    song<T>(id:T){
        return axios.get('/api/song/url',{
            params:{
                id
            }
        })
    },
    // 歌曲详情
    songDetail<T>(id:T){
        return axios.get(`/api/song/detail?ids=${id}`)
    },
    // 歌词
    lyric<T>(id:T){
        return axios.get('/api/lyric',{
            params:{
                id
            }
        })
    },
    // 验证歌曲url能否播放
    checkMusic<T>(id:T){
        return axios.get('/api/check/music',{
            params:{id}
        })
    },
    // 搜索
    search<T,K>(keywords:T,type=1){
        return axios.get('/api/search',{
            params:{
                keywords,
                type
            }
        })
    },
    // 搜索建议
    searchSuggest<T>(keywords:T){
        return axios.get('/api/search/suggest',{
            params:{
                keywords
            }
        })
    },
    // 签到
    dailySignin(type:number){
        return axios.get('/api/daily_signin',{
            params:{
                type
            }
        })
    },
    // 乐签
    signHappyInfo(){
        return axios.get('/api/sign/happy/info')
    },
    // 排行榜
    toplist(){
        return axios.get('/api/toplist')
    },
    // 并发请求
    all<T,K>(obj1:T,obj2:K){
        return axios.all([obj1,obj2])
    },
}