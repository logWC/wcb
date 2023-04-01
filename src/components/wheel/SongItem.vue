<script setup lang='ts'>

const props = defineProps<{
    url:string,
    title:string
}>()
</script>
<template>
    <div class="collect">
        <img :src="props.url" :alt="props.title" />
        <span>{{ props.title }}</span>
    </div>
</template>
<style scoped>
.collect{
    display: flex;
    align-items: center;
    margin: 5px 10px;
}
.collect > img{
    width: 60px;
    height: 60px;
    border-radius: 5px;
}
.collect > span{
    margin-left: 20px;
}
</style>