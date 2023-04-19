export function usePlayCount(num:number){
    let arr:string|string[] = num.toString().split('').reverse();
    arr = arr.reduce((tol,val,index)=>{
        return val+(index===4?'万':tol)
    })
    return arr
}