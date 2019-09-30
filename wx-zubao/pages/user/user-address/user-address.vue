<template>
	<view class="user-address">
		<view class="user-address-list">
			<view class="user-address-item" v-for="(item,index) in userAddressDataSort">
				<view class="address-item-content">
					<view class="item-content-top">
						<view class="item-content-name">{{item.name}}</view>
						<view class="item-content-phone">{{item.phone}}</view>
					</view>
					<view class="item-content-site">{{item.site}}</view>
					<view class="item-content-redact">
						<view class="content-redact-tags" v-if="item.default">默认</view>
						<view class="content-redact-operation">
							<text @click="removeAddress(index)">删除</text>
							<text @click="editAddress(index)">编辑</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<button type="primary" @click="addClick">添加地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userAddressData:[
					{
						name:"荷里活",
						phone:18718114711,
						site:"广东省清远市清城区东城街道清远职业技术学院了大家的拉瓦号打两把挖苦我了回来",
						default:false
					},
					{
						name:"荷里活",
						phone:22222222222,
						site:"广东省清远市清城区东城街道清远职业技术学院了大家的拉瓦号打两把挖苦我了回来",
						default:true
					},
					{
						name:"荷里活",
						phone:18718114711,
						site:"广东省清远市清城区东城街道清远职业技术学院了大家的拉瓦号打两把挖苦我了回来",
						default:false
					},
				]
			}
		},
		methods: {
			addClick(){
				uni.navigateTo({
					url: "add-address/add-address"
				})
			},
			removeAddress(index){
				const _self = this
				uni.showModal({
				    title: '提示',
				    content: '确定删除该地址?',
				    success: function (res) {
				        if (res.confirm) {
				           _self.userAddressData.splice(index,1)
				        } else if (res.cancel) {
				           
				        }
				    }
				});
			},
			editAddress(index){
				uni.navigateTo({
					url: "edit-address/edit-address?id="+index
				})
			}
		},
		computed:{
			userAddressDataSort(){
				let dataSort = this.userAddressData.concat()
				let cut
				console.log(dataSort)
				dataSort.forEach((item,index)=>{
					if(item.default){
						cut = dataSort.splice(index,1)
					}
				})
				dataSort.unshift(cut[0])
				return dataSort
			}
		}
	}
</script>
<style>
	page {
		background-color:#f9f9f9;
	}
</style>
<style lang="scss" scoped>
.user-address {
	margin-bottom:100upx;
	background-color:#f6f6f6;
	.user-address-list {
		.user-address-item {
			position:relative;
			background-color:#ffffff;
			.address-item-content {
				padding:40upx 40upx 0 40upx;
				margin-top: 10upx;
				.item-content-top {
					display:flex;
					align-items: center;
					.item-content-name {
						font-size: 28upx;
						font-weight: 600;
					} 
					.item-content-phone {
						padding-left: 32upx;
						font-size: 22upx;
						font-weight: 600;
					}
				}
				.item-content-site {
					padding: 20upx 0;
					font-size: 24upx;
					color: #888888;
					border-bottom: 1upx #ececec  solid;
				}
				.item-content-redact {
					position: relative;
					height:80upx;
					font-size:22upx;
					.content-redact-tags {
						position: absolute;
						top:50%;
						left: 0;
						transform: translateY(-50%);
						width: 80upx;
						height: 40upx;
						text-align: center;
						line-height:40upx;
						color: #ff8a00;
						border: 1upx #ff8a00 solid;
					}
					.content-redact-operation {
						position: absolute;
						top:50%;
						right: 0;
						transform: translateY(-50%);
						font-weight: 600;
					}
					.content-redact-operation text {
						margin-left: 73upx;
					}
				}
			}
		}
	}
	button {
		position: fixed;
		bottom:0;
		width:100%;
	}
}	
</style>