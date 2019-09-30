<template>
	 <view class="helplist">
	  <view class="list" v-for="(item,index) of helplist" :key="index" :class="{'boderb':item.boderb}" @tap="changelist(index)">
		<view>{{item.title}}</view>
		<image :src="imglists.img1"></image>  
	  </view>
	       <view class="showdiv">
		   <text class="show">点击查看关于租包</text>
		  </view> 
	  </view>	  
</template>

<script>
	  export default{
		    props:{
				 helplist:{
					type:Array,
				
				}
			}, 
		   data(){
			  return{
				  list:this.helplist,
				  imglists:{
					  img1:require("../../../../static/user/user-help/right.png"),
				  }
				
				  
			  } 
		   },
		   onLoad(){
			   console.log(this.list);
		   },
			methods:{
				changelist(index){
					var that=this;
				    var listData=JSON.stringify(that.list[index]);
					uni.navigateTo({
					    url: 'help-content?list='+listData
					});
				}
			}
	  }
</script>

<style lang="scss" scoped>
        .helplist{
		 width:100%;	  
		.list{
		  width:96%;
		  margin-left:4%;
		  border-top:1upx solid #f2f2f2;
		  display:flex;
		  justify-content:space-between;
		  align-items:center;
		  font-size:32upx;
          color:#3d3d3d;
		  padding:28upx 0;
		  image{
			  width:70upx;
			  height:55upx;
			  margin-right:5upx; 
		  }
		}
		.boderb{
		  border-top:0;
		  border-bottom:4upx solid #f2f2f2;
		}
		.showdiv{
		  width:100%;
		  margin-top:50upx; 
		  text-align:center;
		.show{
		  color:#ec848f;
		  font-size:28upx;
		  border-bottom:4upx solid #f2f2f2;
		}
		}
		
	   	} 
	 	
</style>
