<template>
	<view>
			<view class="nav_top" :class={bgColor:hasBgc} :style="{height:headHeight+'px'}">
				<view class="statusBar" :style="{height:statusBarHeight+'px'}"></view>
				<view class="topContent">
					<view v-if="isBack" class="goBack" @click="goBack()">
						<image  src="../../../static/login/back.png" mode="" ></image>
						<text class="backtext">{{backtext}}</text>
					</view>
					<view class="title">{{title}}</view>
				</view>
			</view>
			<view v-if="isHeight" class="marginBox" :style="{height:headHeight+'px'}"></view>
		</view>
	 </view>
	
</template>

<script>
	export default {
			props:{
				title:{
					type:String,
					default:''
				},
				backtext:{
					type:String,
					default:''
				},
				isBack:{   //是否有返回箭头
					type:Boolean,
					default:true
				},
				isHeight:{   //头部撑开高度
					type:Boolean,
					default:true
				},
				isNavBack:{   //固定返回前面的页面
					type:Boolean,
					default:true
				},
				backUrl:{    //返回到指定页面
					type:String,
					default:'index'
				},
				
			},
			data() {
				return {
					statusBarHeight:'',
					headHeight:'',
				};
			},
			methods:{
				goBack(){
						uni.navigateBack({
						    delta: 1
						})
					
				}
			},
			created() {
				const system = uni.getSystemInfoSync()
				this.statusBarHeight = system.statusBarHeight || 25
				this.headHeight = (system.statusBarHeight || 25) + 45//可调整
			}
		}
	
</script>

<style lang="scss" scoped>
	
	
	    .nav_top{
	    		width: 100vw;
	    		position: fixed;
	    		top: 0;
	    		left: 0;
	    		z-index: 900;
	    		display: flex;
	    		flex-direction: column;
	    		background-color: transparent;
	    		&.bgColor{
	    			background-color: #fff;
	    		}
				.statusBar{
				  background-color:#fff;	
				}
	    		.topContent{
	    			width: 100vw;
	    			height: 45px;//可调整
	    			position: relative;
	    			.goBack{
	    				position: absolute;	
	    				top: 0;
	    				left: 0;
	    				width: 60vw;
	    				height: 100%;
	    				display: flex;
	    				align-items: center;
	    				padding-left:10upx;
	    				box-sizing: border-box;
	    				image{
	    					width: 38upx;
	    					height: 36upx;
							margin-right:14upx;
							
	    				}
						.backtext{
						  font-size:34upx;
						  color:#060606;
						  margin-bottom:5upx;		
						}
	    			}
					
	    			.title{
	    				width: 100%;
	    				height: 100%;
	    				display: flex;
	    				align-items: center;
	    				justify-content: center;
	    				color: #fff;
	    				font-size: 40upx;
	    			}
	    		}
	    	}
	    	
</style>
