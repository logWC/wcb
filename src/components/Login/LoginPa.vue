<script setup lang="ts">
    defineProps<{
        str:string;
    }>();
</script>
<template>
    <span v-cloak>
        {{str}}
    </span>
</template>
<style scoped>
    span{
        font-size: 12px;
        background-color: rgb(34, 238, 238);
        padding: 5px 10px;
        border-radius: 15px; 
    }
</style>