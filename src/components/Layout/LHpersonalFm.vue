<script setup lang='ts'>
import { ref } from "vue";

const img_src = ref<string>()
let can = document.createElement('canvas')
can.width = can.height = 500
let c = can.getContext('2d') as CanvasRenderingContext2D;
function initc(c:CanvasRenderingContext2D) {
    c.fillStyle = 'yellow'
    c.fillRect(0,0,500,500)
    c.strokeStyle = '#333'
    c.lineWidth = 5
    c.strokeRect(50,50,400,400)
}
function draw(can:HTMLCanvasElement){
    img_src.value = can.toDataURL('image/jpeg',1)
}
initc(c)
draw(can)

</script>
<template>
    <div v-if="img_src!==undefined">
        <img :src="img_src" alt="oh" />
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangyou"></use>
        </svg>
    </div>
</template>
<style scoped>
img{
    width: 100px;
    /* height: 100px; */
}
</style>