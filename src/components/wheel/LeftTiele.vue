<script setup lang="ts">
    defineProps<{
        str:string
    }>();
</script>
<template>
    <div>
        <h4 v-cloak>{{str}}</h4>
    </div>
</template>
<style scoped>
h4{
    font-weight:bold;
    font-size:16px;
    letter-spacing:3px;
    border-bottom:1px solid red;
    padding-top: 5px;
    padding-bottom:5px;
}
</style>