<script setup lang='ts'>
    import { ref,onBeforeUnmount,nextTick } from "vue";

    const props = defineProps<{
        heigh:number
    }>()
    nextTick(()=>canvasInitial())
    // 获取颜色
    function getColor(baseHue:number) {
		const hue = Math.floor(baseHue + Math.random() * 15) % 360;
		const lightness = Math.floor(Math.pow(Math.random(), 2) * 50 + 50);
		return `hsl(${hue}, 30%, ${lightness}%`;
	}
    // 初始化画布
    let canvas = ref();
    let can:CanvasRenderingContext2D;
    function canvasInitial() {
        can = (canvas.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
        can.fillStyle = getColor(Math.random() * 360);
        requestAnimationFrame(canvasAnimation)
    }
    // 开始画布动画
    let saveTime:number;
    let num=0;
    let i=0;
    let color=getColor(Math.random()*360)
    function canvasAnimation(time:number) {
        if(saveTime!==time){
            num++;
            can.beginPath();
            can.moveTo(num,0);
            can.arc(0,0,num,0,Math.PI);
            can.fill();
            if(num>100){
                can.save();
                can.fillStyle = color;
                can.beginPath();
                can.moveTo(num-50,0);
                can.arc(0,0,num-50,0,Math.PI);
                can.fill();
                can.restore();

                can.beginPath();
                can.moveTo(num-100,0);
                can.arc(0,0,num-100,0,Math.PI);
                can.fill();
            }else if(num>50){
                can.save();
                can.fillStyle = color;
                can.beginPath();
                can.moveTo(num-50,0);
                can.arc(0,0,num-50,0,Math.PI);
                can.fill();
                can.restore();
            }
            saveTime=time;
            if(num>props.heigh){
                num=0;
                can.fillStyle = getColor(Math.random() * 360);
                color = getColor(Math.random() * 360);
            }
            i=requestAnimationFrame(canvasAnimation)
        }
    }
    // 清除动画循环
    onBeforeUnmount(()=>{
        cancelAnimationFrame(i);
    })
</script>
<template>
    <div style="margin:0px;">
        <div style="position: relative;">
            <canvas
            ref="canvas"
            :width=props.heigh
            :height=props.heigh
            ></canvas>
            <div :style="{
            position: 'absolute',
            top: '0px',
            height:props.heigh+'px',
            width:props.heigh+'px',
            backdropFilter: 'contrast(90%) blur(50px)'
        }"
            ></div>
        </div>
    </div>
</template>