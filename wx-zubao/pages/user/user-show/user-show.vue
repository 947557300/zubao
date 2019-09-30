<template>
	<view class="index">
		<view class="left" v-if="list.length>0">
			<view v-for="(item, index) in list" :key="index" class="itemlist" v-if="index%2==0">
				<view :class="item.touchstart? 'card bg' :'card'" @longpress="gotouchstart(index)" @click='clickView(index)'>
					<image class="card-img" :src="item.img_src" mode="widthFix"></image>
					<!--<text class="card-num-view">{{item.img_num}}P</text>  -->
					<view class="car-title-view">
						<text class="card-title">{{item.title}}</text>
						<view class="box">
							<view class="card-time">{{item.time}}</view>
							<view class="dianzang">
								<image :src="dianzang" mode="widthFix"></image>
								<text>{{item.num}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="right" v-if="list.length>0">
			<view v-for="(item, index) in list" :key="index" class="itemlist" v-if="index%2==1">
				<view :class="item.touchstart? 'card bg' :'card'" @longpress="gotouchstart(index)" @click='clickView(index)'>
					<image class="card-img" :src="item.img_src" mode="widthFix"></image>
					<!--                    <text class="card-num-view">{{item.img_num}}P</text>  -->
					<view class="car-title-view">
						<text class="card-title">{{item.title}}</text>
						<view class="box">
							<view class="card-time">{{item.time}}</view>
							<view class="dianzang">
								<image :src="dianzang" mode="widthFix"></image>
								<text>{{item.num}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup :show="show" type="center" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">确定</view>
				<view class="uni-tip-content">是否删除该晒单？</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @tap="closePopup">取消</view>
					<view class="uni-tip-button" @tap="changelist(index)">确定</view>
				</view>
			</view>
		</uni-popup>
			<view class="text_box" v-if="list.length==0">
				<view class="text">
					<text>您的晒单空空如也~</text>
					<text>快去晒单吧~</text>
				</view>
				<button type="default" @tap='goPage()'>去晒单</button>
			</view>

	</view>
</template>

<script>
	import './user-show.scss'
	import uniPopup from "@/components/uni-ui/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				show: false,
				index: -1,
				dianzang:require('@/static/show/dianzan-kongxin.png'),
				list: [{
						img_src: require('@/static/show/2.jpg'),
						title: '这是标这是这是标这是标题这是标题这是标题这是标题这是标题题标题这是标题这是标题这是标题这是标题题',
						time: '2019-10-11 00:00:00',
						touchstart: false,
						num:3500
					},
					{
						img_src: require('@/static/show/3.jpg'),
						title: '乱写点东西这是标题',
						time: '2019-10-11 00:00:00',
						touchstart: false,
						num:3500
					},
					{
						img_src: require('@/static/show/4.jpg'),
						title: '测试一下瀑布流',
						time: '2019-10-11 00:00:00',
						touchstart: false,
						num:3500
					},
					{
						img_src: require('@/static/show/5.jpg'),
						title: '不知道可不可以成功',
						time: '2019-10-11 00:00:00',
						touchstart: false,
						num:3500
					},
					{
						img_src: require('@/static/show/4.jpg'),
						title: '乱写点东西这是标题',
						time: '2019-10-11 00:00:00',
						touchstart: false,
						num:3500
					},
					{
						img_src: require('@/static/show/3.jpg'),
						title: '这是标这是这是标这是标题这是标题这是标题这是标题这是标题题标题这是标题这是标题这是标题这是标题题',
						time: '2019-10-11 00:00:00',
						touchstart: false,
						num:3500
					},
					{
						img_src: require('@/static/show/2.jpg'),
						title: '这是标题',
						time: '2019-10-11 00:00:00',
						touchstart: false,
						num:3500
					},
				],
				a:[],
				b:[],
				c:[]
			}
		},
		components: {
			uniPopup
		},
		methods: {
			gotouchstart(index) {
				this.index = index
				this.list[index].touchstart = true
				this.openPopup()
			},
			openPopup() {
				// this.$refs.popup.open()
				this.show = ! this.show
			},
			odd(){
				let length = this.a.length > this.b.length ? this.a.length : this.b.length;
				for(let j = 0; j < length; j++){
					if (this.a[j]) this.c.push(this.a[j]);
					if (this.b[j]) this.c.push(this.b[j]);
				}
			},//a,b数组交叉push进c数组
			double(){
				let length = this.a.length > this.b.length ? this.a.length : this.b.length;
				for(let t = 0; t < length; t++){
					if (this.b[t]) this.c.push(this.b[t]);
					if (this.a[t]) this.c.push(this.a[t]);
				}
			},//b,a数组交叉push进c数组
			closePopup() {
				// this.$refs.popup.close()
				this.list[this.index].touchstart = false
				this.openPopup()
				// this.index = -1
			},
			changelist(index){
				this.list.splice(this.index,1)//删除长按元素的值
				for(var i=0;i<this.list.length;i++){
					if(i%2==1){
						if(i>=this.index){
							this.a.push(this.list[i])
						}
					}
					else{
						if(i>=this.index){
							this.b.push(this.list[i])
						}
					}
				}//遍历数组，拿到点击元素后面所有的值然后按奇偶赋值给a,b数组
				this.list.splice(this.index,this.list.length-this.index)
				if(this.index%2==0){
					this.odd()
				}
				else this.double()
				for(var h=0 ; h<this.c.length ; h++){
					this.list.push(this.c[h])
				}
				this.a.splice(0,this.a.length)
				this.b.splice(0,this.b.length)
				this.c.splice(0,this.c.length)//清空数组
				this.openPopup()
				
				
				console.log(this.list.length)
			},
			deleteShow(index) {

			},
			change(e) {
				console.log(e.show)
			},
			clickView(index) {
				if (this.list[index].touchstart == true) {
					this.list[index].touchstart = false

					return
				} else {
					return
					//去到商品详情页面，携带参数id
				}
			}
		},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	
</style>
