<template>
   <div>
   <head-er></head-er>
   <big-img></big-img>
   <quan-yi></quan-yi>
   <zheng-che></zheng-che>
   </div>
</template>


<script>
import HeadEr from "./components/header"
import BigImg from "./components/bigimg"
import QuanYi from "./components/quanyi"
import ZhengChe from "./components/zhengche"
export default {
       components:{
        HeadEr,
        BigImg,
        QuanYi,
        ZhengChe
       },
      data(){
        return{

        }
      }
  
};
</script>

<style>
</style>