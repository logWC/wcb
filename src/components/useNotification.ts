import { useSongName } from "./useSongName"
export function useNotification(params:any) {
    Notification.requestPermission().then(result=>{
        if(result==='granted'){
            let notification = new Notification(params.name,{
                badge:'/logo.png',
                icon:params.al.picUrl,
                body:useSongName(params.ar),
                tag:'song'
            })
            notification.addEventListener('show',()=>{
                setTimeout(notification.close.bind(notification),2000)
            })
        }
    })
}