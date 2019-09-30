<template>
	<view class="add-address">
		<form @submit="formSubmit" @reset="formReset">
			<view class="add-address-item">
				<view>收货人</view>
				<input type="text" placeholder="请输入收货人姓名" name="consignee">
			</view>
			<view class="add-address-item">
				<view>手机号</view>
				<input type="text" placeholder="请输入收货人手机号码" name="consigneePhone">
			</view>
			<view class="add-address-item">
				<view>省市区</view>
				<picker mode="region" @change="pickerChange">
					<input type="text" placeholder="请输入地区" v-model="provinces" name="provinces">
				</picker>
			</view>
			<view class="add-address-item">
				<view>详细地址</view>
				<input type="text" placeholder="请输入详细地址" name="detailedAddress">
			</view>
			<checkbox-group name="defaultAddress">
				<checkbox value="true" id="defaultAddress"></checkbox>
				<label for="defaultAddress">
					<text class="default-address-text">默认地址</text>
				</label>
			</checkbox-group>
			<button type="primary" form-type="submit">确定</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provinces:""
			}
		},
		methods: {
			pickerChange(event){
				this.provinces = event.detail.value.join(" ")
			},
			formSubmit(event){
				console.log(event.detail)
				// uni.request();
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
.add-address{
	.add-address-item{
		margin-left: 40upx;
		padding: 40upx 40upx 40upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height :26upx;
		font-size:26upx;
		border-bottom:1upx #ececec solid;
		input{
			width: 500upx;
			font-size:26upx;
		}
	}
	checkbox-group{
		checkbox{
			padding: 40upx;
		}
		.default-address-text{
			font-size: 30upx;
		}
	}
}

</style>
