<template name='search'>
	<view>
		<view class="content_box">
			<view class="box">
				<input class="uni-input" placeholder-style="color:#d0d0d0" placeholder="请输入关键词" />
				<button type=""><text class="iconfont">&#xe680;</text></button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'search',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@font-face {
	  font-family: 'iconfont';
	  src: url('~@/static/iconfont/iconfont.eot');
	  src: url('~@/static/iconfont/iconfont.eot?#iefix') format('embedded-opentype'),
	      url('~@/static/iconfont/iconfont.woff2') format('woff2'),
	      url('~@/static/iconfont/iconfont.woff') format('woff'),
	      url('~@/static/iconfont/iconfont.ttf') format('truetype'),
	      url('~@/static/iconfont/iconfont.svg#iconfont') format('svg');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.content_box{
		width:100%;
		box-sizing: border-box;
		border-bottom:1upx solid #ececec ;
		padding:20upx 50upx;
		.box{
			width:100%;
			box-sizing: border-box;
			padding-left: 30upx;
			display:flex;
			border-radius: 50upx;
			border:4upx solid #ea986c;
			input{
				width: 80%;
				height: 70upx;
				font-size: 30upx;
				color: #333333;
			}
			button{
				width:20%;
				line-height: 70upx;
				background:none;
				text-align: center;
				height:70upx;
				text{
					font-size: 50upx;
					color: #d0d0d0;
				}
			}
			button:after{
				border: none;
			}
		}
	}

</style>
