<script setup lang='ts'>
import FTsearch from "./FTsearch.vue";

</script>
<template>
    <div class="view">
        <FTsearch />
    </div>
</template>
<style scoped>
.view{
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: space-evenly;
    backdrop-filter: blur(4px);
    background-image: radial-gradient(white 0%,rgba(255, 255, 255, 0.5) 25%,rgba(255, 255, 255, 0.5) 30%,white 40%);
    background-size: 5px 5px;
    border-bottom: 1px solid white;
    z-index: 1;
}
</style>