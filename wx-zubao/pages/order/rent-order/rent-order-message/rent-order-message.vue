<template>
	<view class="rent-order-message">
		<Header></Header>
		<Order></Order>
		<Message></Message>
	</view>
</template>

<script>
	import Header from './components/header'
	import Order from './components/order'
	import Message from './components/message'
	export default {
		components:{
			Header,
			Order,
			Message
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
