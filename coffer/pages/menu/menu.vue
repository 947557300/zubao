<template>
	<view class="container">
	   <view class="page-body">
		 <scroll-view class="nav-left" scroll-y="true" :style="'height:'+height+'px'">
		 	<view class="nav-left-item" :class="index==categoryActive?'active':''" v-for="(item,index) in shopList" :key="index" @tap="categoryClick(index)">{{item.classify}}</view>
		 </scroll-view>
		   <scroll-view class="nav-right" scroll-y="true" :scroll-top="scrollTop">
			  <view class="nav-right-item">
				 <view class="item-header">{{itemObj.classify}}</view>
				  <view class="item-state" v-show="itemObj.state!==''">{{itemObj.state}}</view>                <view class="item-li" v-for="(shop,index) of itemObj.shopData" :key="index"
				 @tap="showMiddlePopup(shop,index)" >
				   <image src="../../static/shop.png" class="item-img"></image>
				   <view class="item-text">
					   <view class="item-title">{{shop.title}}</view>
					   <view class="item-en">{{shop.en}}</view>
					 <view class="item-default">默认：
					 	<text v-for="d in shop.default" :key="d">{{d}} </text>
					 </view>
					   <view class="item-price">￥{{shop.price}}</view>
					   <view class="plus-filled" stop><uni-icon type="plus-filled"></uni-icon></view>
				   </view>
				  </view>
			  </view>
		   </scroll-view>
	   </view>
	  <!--ycquyu--> <view v-show="showPopup">
		   <view class="mask">
	         <view class="popup">
			  <view class="popup-header">
				  <view class="uni-icon uni-icon-close popup-close" @click="hidePopup"> </view>
				  <view class="popup-title">{{p.title}}</view>
				  <view class="popup-en">{{p.en}}</view>
			  </view>
			  <!--中间--><view class="popup-middle">
				  <view class="sort" v-for="(item,index) of p.kind" :key="index">
					 <view class="sort-lable">{{item.name}}</view>
					 <view class="sort-select" v-for="(fen,indexs) of item.type" :key="indexs" :class='item.selected==indexs?"active":""' @tap='changetab(index,indexs)'>
						{{fen}}
					 </view>
				  </view>
				  <!--描述-->
				  <view class="describe">
					  <view class="describe-title">商品描述</view>
					  <view class="describe-text">
						圣诞特别限定新品，香醇拿铁融合姜饼、香蕉风味，顶部轻盈奶油和牛奶巧克力碎奇妙相遇，甜蜜暖心。 
					  </view>
				  </view>
					  
				</view>  
			    <view class="popup-footer">
				 <view class="popup-priceout">	
				 <view class="popup-price">
					<view class="text-main">￥{{p.price}}</view>
					 <view class="text-small">{{p.title}}￥{{p.price}}+单糖￥0</view>
				 </view>
				<view class="popup-numbox">
				  <view class="numbox-minus uni-icon uni-icon-minus" @tap="less()"></view>
				  <view class="numbox-value">{{num}}</view>
				  <view class="numbox-plus uni-icon uni-icon-plus-filled" @tap="more()"></view>
				</view>	 
				</view>
				<!--Btn-->
				<view class="btn-group">
				 <view class="btn first-btn">充2赠一，充五赠五</view>
				 <view class="btn two-btn">收藏口味</view>
				 <view class="btn three-btn" >加入购物车</view>
				</view>
				</view>
			 </view>  
		   </view>
	   </view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon.vue"
	import shopData from "./data.json"
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
			  shopList:[],
			  categoryActive:0,
			  itemObj: [],
			  scrollTop:0,
			  showPopup:false,
			  height:0,
			  p:[],
			  num:1,
			}
		},
		onLoad:function(){
			this.shopList=shopData.data;
			this.itemObj=this.shopList[0];
			this.height = Math.floor(uni.getSystemInfoSync().windowHeight);
			// #ifdef APP-PLUS
			this.height = Math.floor(uni.getSystemInfoSync().windowHeight - 56);
			// #endif
		},
		methods: {
			categoryClick(index){
			 this.categoryActive=index;
			 this.itemObj = this.shopList[index];
			},
			showMiddlePopup(shop,index){
				this.p=this.itemObj.shopData[index];
				this.showPopup=true;
			},
			hidePopup(){
			this.showPopup=false;	
			},
			changetab(index,indexs){
			 this.p.kind[index].selected=indexs;
			},
			less(){
				if(this.num==1){
					uni.showToast({
					    title: '不能再少了',
					    duration: 1000,
						icon:"none",
					});
				}
				else{
				  this.num--;	
				}
			},
			more(){
			  if(this.num==999){
			  	uni.showToast({
			  	    title: '不能再多了',
			  	    duration: 1000,
			  		icon:"none",
			  	});
			  }
			  else{
				this.num++; 
			  }
			}
			
			
		}
	}
</script>

<style>
	/*menu yinchang-start*/
	.mask{
	 background:rgba(0,0,0,.3);
	 position:fixed;
	 z-index:999;
	 top:0;
	 right:0;
	 bottom:0;
	 left:0;
	 width:100%;
	}
	.popup{
	 position:fixed;
	width:690upx;
	height:76%;
	background:#fff;
	box-shadow:0 0 30upx rgba(0,0,0,.1);
	top:12%;
	left:30upx;	 
	}
	.popup-header{
	  position:relative;
	  height:33%;
	 background:red;
	background:url(https://s2.luckincoffeecdn.com/luckywebrm/images/index/cooperation/part5_picture2.png) center;			 
	}
	.popup-title,.popup-en{
		color:#fff;
		margin-left:20upx;
		position:absolute;	
	}
	.popup-title{
    	font-size:36upx;
		bottom:42upx;	  
	}
	.popup-en{
		font-size:22upx;
	    bottom:15upx;	
		
	}
	.popup-close{
		color:#fff;
		position:absolute;
		top:20upx;
		right:20upx;
		font-size:55upx;
	}
	.popup-middle{
		height:40%;
		overflow:auto;
		box-sizing: border-box;
		padding:10upx 30upx 0;
	}
	.sort{
	  display:flex;
	  font-size: 24upx;
	  margin-top: 30upx;
	  
	}
	.sort-lable{
		margin-right:20upx;
	}
	.sort-select{
		width:120upx;
		border-radius: 30upx;
		border: 1px solid #e3dbd3;
		color: #e3dbd3;
		text-align: center;
		margin-left:20upx;
	}
	.sort-select.active{
		background:#e3dbd3;
		color:#fff;
		font-weight:400;
	}
	.describe{
		border-top: 1px solid #f1f1f1;margin-top: 30upx;padding: 30upx 0 10upx;
	}
	.describe-title{
	 margin-top:10upx;	 
	}
	.describe-text{
	  color:#666;
	  font-size:24upx;	  
	}
	.popup-footer{
	border-top: 1px solid #f1f1f1;
	padding:20upx 10upx 0;
	height:232upx;
	}
	.popup-priceout{
		display: flex;
		align-items:center;
		 width:96%;
		 margin:0 auto;
		 justify-content: space-between;
	}
	.popup-price{
	 padding-left:10upx;
	}
	
	.text-main{
	 font-size:32upx;
	 color:#222;   
	}
	.text-small{
     font-size:20upx;
	 color:#666;
	 font-size:24upx;
	}
	.popup-numbox{
	 display:flex;
	 align-items:center;	  
	}
	.numbox-minus,.numbox-plus{
		font-size:56upx;
		line-height:68upx;
		color:#91b5d9;
	}
	.numbox-value{
	 margin:0 16upx;
	 color:#91b5d9;
	font-weight:700;
	min-width:20upx;	  
	}
	.btn-group{
		display:flex;
	    margin-top:10upx;
		justify-content:flex-end;
		border-top: 1px solid #f1f1f1;
		padding-top:20upx;
		width:100%;
	}
	.btn{
		height:60upx;
		text-align: center;
	    color:#fff;
		margin-right:14upx;
	    line-height:60upx;	
		font-size:24upx;
	    padding:0;
	}
	.first-btn{
	   width:206upx;
	   border:1px solid #dc5a00;
	   background:#e06e11;
	}
	.two-btn{
	 border:1px solid #73a1cf;
	 width:170upx;
	 background:#f3f3f3;
	color:#73a1cf;
	}
	.three-btn{
	width:180upx;
	border:1px solid #6c9ccd;
	background:#79a1cf;	
	}
	
	
	
	
	/*menu yinchang-end*/
	/*menu main-start*/
	.container{border-top: 1px solid #f0f0f0;}
     .page-body{
		display:flex;
		
	 }
	 .active{
		 background:#fff;
		 font-weight:700;
		 color:#333;
	 }
	 
	
	.nav-left{
      width:180upx;
	 background:#f7f7f7;
	}
	.nav-left-item{
	height:86upx;
	border-bottom:1px solid #ececec;
	font-size:28upx;
	display:flex;
	justify-content:center;
	color:#666;
	line-height:86upx;	
	}
	.nav-left-item:last-child{
	  border-bottom:none;	
	}
	.nav-right{
	  width:570upx;
	 background:#fff;	   
	}
	.nav-right-item{
	 width:100%;	
	 font-size:28upx;
	 padding:0 26upx;
	 box-sizing: border-box;
	}
	.item-header{
		padding-top:36upx;
		font-size:24upx;
		font-weight:700;
		line-height:24upx;
	}
	.item-state{
		margin-top:10upx;
	}
	.item-state,.item-en,.item-default{
		font-size:24upx;
		line-height:20upx;
		color:#999;
	}
	.item-li{padding: 22upx 0;position: relative;border-bottom: 1px solid #f1f1f1;height: 134upx;}
	.item-img{width: 134upx;height: 134upx;border-radius: 8upx;}
	.item-text{display: inline-block;vertical-align: top;margin-left: 16upx;}
	.item-title{font-size: 28upx;line-height: 28upx;font-weight: 700;}
	.item-en{margin: 10upx 0 8upx 0;}
	.item-price{font-size: 28upx;line-height: 28upx;font-weight: 700;margin-top: 28upx;}
	.plus-filled{position: absolute;bottom: 16upx;right: 0;color: #81aad2;}
	.fixed{position: fixed;top: 0;left: 206upx;background: #fff;}
	/*menu main end*/
</style>
