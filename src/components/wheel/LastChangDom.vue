<script setup lang="ts">
    const lastTime:string[] = document.lastModified.replace(/\ .*/,'').split('/');
</script>
<template>
    <h3>
        文档最后修改于{{lastTime[2]}}年{{lastTime[0]}}月{{lastTime[1]}}日
    </h3>
</template>
<style scoped>
    h3{
        height: 50px;
        line-height: 50px;
        background-color: rgba(128,128,128,0.1);
        padding: 0px 10px;
    }
</style>