export function useSongName(nameArr:any[]){
    return nameArr.reduce(
        (total,value) => {
            return total == "" ?  value.name : total + "/" + value.name
        },"")
}