<script setup lang="ts">
    import { ref, onBeforeUnmount, getCurrentInstance, inject } from "vue";
    import { useRouter } from "vue-router";
    import { useUser } from "@/stores/useUser";
    import LoginQr from './LoginQr.vue'
    import LoginPa from './LoginPa.vue'

    // 获取api
    const {$api}:any = getCurrentInstance()?.proxy;
    // 获取路由
    const router = useRouter();
    // 获取store
    const useuser = useUser();

    let phone = ref(null);
    let password = ref(null);
    let captcha = ref(null);
    let loginBoolean = ref(3);
    let error = ref('');
    let timeout:number;
    
    let signIn = ref(false);
    function loginStatus(){
        if(useuser.profile==null){
            $api.loginStatus()
            .then(({data}:any)=>{
                if(data.data.profile.userId !== 7943082392){
                    useuser.userData(data.data.profile)
                    router.replace('/layout/home')
                }else{
                    signIn.value=true
                    qr()
                }
            })
            .catch((error:any)=>{
                signIn.value=true
                qr()
            })
        }else{
            router.replace('/layout/home')
        }
    }
    loginStatus()

    let loginKey='';
    let src = ref('');
    async function qr():Promise<void>{
        if(loginKey==''){
            loginKey = await $api.qrKey()
            .then((content:any)=>content.data.data.unikey)
            src.value = await $api.qrCreate(loginKey)
            .then((content:any)=>content.data.data.qrimg)
        }
        loginBoolean.value = 3
        error.value = ''
        const loginCheck = ()=>{
            if (!signIn.value) return
            $api.qrCheck(loginKey)
            .then(({data}:any)=>{
                if(data.code==803){
                    loginStatus()
                }
                else if(data.code==802 || data.code==801){
                    if(loginBoolean.value == 3){
                        timeout = window.setTimeout(loginCheck,2000)
                    }
                }
                else if(data.code==800){
                    console.log('二维码过期了')
                    loginKey = ''
                    loginBoolean.value==3&&qr()
                }
            })
        }
        loginCheck()
    };
    function pa(num:number):void{
        window.clearTimeout(timeout)
            loginBoolean.value = num;
            error.value = ''
    };
    function login(){
        $api.logon(phone.value,password.value,captcha.value)
        .then(({data}:any) => {
            useuser.userData(data.profile)
            // this.$store.dispatch('profiles/userData',data.profile)
            router.replace('/layout/home')
        })
        .catch((error:any) => error.value = '密码或手机号出错')
    };
    function vcMe(){
        //定义正则表达式
        var reg='^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$';
        //创建正则表达式对象
        var regExp=new RegExp(reg);
        //使用test()函数验证数据是否匹配正则表达式，匹配返回true,否则返回false
        if(regExp.test(String(phone.value))){
            $api.getCaptcha(phone.value)
            .then(({data}:any)=>{console.log(data)})
        }else{
            error.value = '请输入正确的手机号';
        }
    };
    function verify(){
        if(loginBoolean.value==2){
            $api.captchaVerify(phone.value,captcha.value)
            .then(({data}:any)=>data.code==200&&login())
            .catch((error:any)=>error.value = '验证码出错')
        }else{
            login()
        }
    };
    onBeforeUnmount(() => {
        // 添加主页路由到缓存数组
        const changeInclude = (inject('changeInclude') as (arr:string[])=>void)
        changeInclude(['LayoutView,LyricView'])
        // 清除正在进行的或定时回调已经进入主栈的定时器
        window.clearTimeout(timeout);
        signIn.value = false;
    })

</script>
<template>
    <div class="signIn" v-if="signIn">
        <div class="user">
            <h3>网易云登录</h3>
                <div class="switch-login">
                    <img v-if="loginBoolean==3" :src="src" alt="加载出错" />
                    <div v-else>
                        <input type="text" @focus="error=''" v-model.number="phone" placeholder="手机号" />
                        <input v-if="loginBoolean==1" type="password" @keyup.enter="login" @focus="error=''" v-model.number="password" placeholder="密码" />
                        <div v-else style="box-sizing: border-box;width:80%;display:flex;align-items:center;border: 1px solid black;">
                            <input type="text" style="flex-grow:1;flex-shrink:2;border: none;" @focus="error=''" v-model.number="captcha" placeholder="验证码" />
                            <button style="flex-basis:100px;height:25px;margin-right:10px;font-size:10px;border: 1px solid rgba(0, 0, 0, 0.1);background-color:inherit" @click="vcMe">获取验证码</button>
                        </div>
                    </div>
                    <span class="error"> {{error}} </span>
                    <button v-if="loginBoolean!=3" @click="verify">登录</button>
                </div>
                <div class="switch-button">
                    <login-qr v-if="loginBoolean!=3" @click.native='qr' />
                    <login-pa v-if="loginBoolean!=1" @click.native='pa(1)' str="密码登录" />
                    <login-pa v-if="loginBoolean!=2" @click.native='pa(2)' str="验证码登录" />
                </div>
            <span class="tourist" @click="$router.replace('/layout/home')">游客</span>
        </div>
        <p> 网站仅供学习使用</p>
    </div>
</template>
<style scoped>
    .signIn{
        height: calc(80vh);
        margin: 2% auto;
        backdrop-filter: blur(20px);
    }
    .user{
        width: 50%;
        height: 340px;
        margin: 0 auto;
        border: 1px solid rgba(0, 0, 0, 0.219);
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        overflow: hidden;
    }
    h3{
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        background-color: #5d85a8;
    }
    input{
        box-sizing: border-box;
        width: 80%;
        padding: 10px;
        border: 1px solid black;
    }
    .error{
        width: 100%;
        font-size: 9px;
        position: absolute;
        bottom: 31%;
        left: 10%;
        color: rgb(201, 15, 15);
    }
    .switch-login{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        width: 100%;
        height: 200px;
    }
    .switch-login > div{
        height:40%;
        width:100%;
        display:flex;
        flex-wrap:wrap;
        align-content:space-between;
        justify-content:center;
    }
    .switch-login > button{
        margin-top: 6%;
        padding: 5px 30px;
        border: 1px solid rgba(0, 0, 0, 0.644);
        background-color: inherit;
    }
    .switch-button{
        height: 40px;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    .tourist{
        position:absolute;
        top:0;
        right:0;
        font-size:13px;
        font-weight:bold;
        width:50px;
        height:50px;
        line-height: 40px;
        text-align:right;
        border-bottom-left-radius:50px;
        background:yellow
    }
    p{
        position: absolute;
        bottom: 1%;
        right: 2%;
        font-size: 10px;
        text-align: right;
    }
</style>