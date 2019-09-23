<template>
	<view class="content" :style="'height:'+height+'px'">
		<view class="product">
			<view class="product-con flex">
				<image src="../../../static/login/part5_picture2.png"></image>
				<view class="title-cont">
					<view class="title">自行车是的是的是的是的是的是的是的是的ssssssssssssssssssssssssssssssss</view>
					<view class="ffifle glaytext">sdsdsdsds</view>
				</view>	
		</view>
		<view class="eval flex">
		 <view class="all">整体评价</view>
		 <ra-te :color="color" :size="size" :activeColor="activeColor" :value="100" v-on:changg="chang11($event)"></ra-te>
		</view>
	</view>
     </view>
</template>

<script>
import RaTe from "../../../components/uni-ui/uni-rate/uni-rate.vue"	
	 export default{
		 components:{
			RaTe 
		 },
		 data(){
			 return{
				 height:'',
				 color:'#f2f2f2',
				 activeColor:"#ff5204",
				 size:"30",
				 ss:"",
			 }
		 },
		 methods:{
			 chang11($event){
			   console.log($event)
			 }
		 },
		 created(){
			 const system = uni.getSystemInfoSync()
			 var statusBarHeight = (system.statusBarHeight || 25)+45;
			 this.height = Math.floor(uni.getSystemInfoSync().windowHeight-statusBarHeight);
			 // #ifdef APP-PLUS
			 this.height = Math.floor(uni.getSystemInfoSync().windowHeight - 56);
			 // #endif 
				
		 }
		
	 }
</script>

<style lang="scss" scoped>
	.content{
			width:100%;
			background:#f3f3f3;
		    font-size:30upx;	
			.flex{
			  display:flex;
			  align-items:center;	  
			}
			.glaytext{
				color:#b9b9b9;
			}
			 .product{
				padding:50upx 20upx 30upx;
				background:#fff;
			    .product-con{
				  justify-content: space-between;
				image{
				  width:90upx;
				 height:90upx;
					   
				}
				.title-cont{
				  width:82%;
			
				  view{
				   overflow: hidden;
				   text-overflow: ellipsis;
					 white-space: nowrap;
				  }	  
				}
			   .title{
				  margin-bottom:8upx; 
			   }		  
				}
		       .eval{
				  margin-top:50upx; 
				  .all{
					 font-weight:bold;
					 margin-right:20upx;
					 font-size:32upx; 
				  } 
				   
			   }       		
		 
			 }
	}
</style>
