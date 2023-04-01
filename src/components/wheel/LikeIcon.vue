<script setup lang="ts">
    import { computed } from "vue";
    import { useUser } from "@/stores/useUser";
    import $api from "@/api/index"

    const props = defineProps<{
        ids:number
    }>()


    const useuser = useUser()
    let icon = computed(()=>{
        return useuser.likeIdObj[props.ids]
        ?'#icon-aixinshoucang'
        :'#icon-aixinD'
    })

    function likeMe(){
        let boo = icon.value == '#icon-aixinD'
        $api.like(props.ids,boo)
        .then(val=>useuser.editorLike(props.ids,boo))
        .catch(error=>{
            error.toString().includes(500)
            ?alert('没有版权，喜欢失败')
            :alert('未知错误，喜欢失败')
        })
    }
</script>
<template>
    <svg @click="likeMe" class="icon" aria-hidden="true">
        <use :xlink:href="icon"></use>
    </svg>
</template>