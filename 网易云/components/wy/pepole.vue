<template>
	  <view class="contents">
		  <view class="clear"></view>
		  <view class="all">查看全部</view>
		  <view class="sysr">
		  <view class="pope">
			  <view class="pname">{{name}}</view>
			  <view class="pcontent" v-for="(item,index) of tj" :key="index">{{item.content}}</view>
		  </view>
		  </view>
		  <view class="glay"></view>
		 <!--学yuan--> <view class="school">
		    <view class="school-left">
				<image src="../../static/images/preview.jpg" class="xyimg"></image>
				<view>
					<view>一课学院</view>
				    <view class="wang">2.3万位学员</view>
				</view>
			</view>
			<view class="school-right">
				<view>进入网校</view>
	            <image src="../../static/images/right.png"></image>
			</view>
		 </view>
		 <view class="glay"></view>
		 <!--讲师--> <view class="teacher">
		            <view class="teacher-title">讲师</view>
		            <view class="teacher-content">
						<image src="../../static/images/preview_03.jpg"></image>
						<view class="contet-right">
							<view class="right-title">{{teacher}}</view>
							<view>{{teachercon}}</view>
						</view>
					</view>
		 </view>
		 
	  </view>
</template>

<script>
	export default{
		 name:"pepole",
		 data(){
			 return{
				 name:"适用人群",
				 tj:[
					 {content:"1.应届生、0~3年产品经理"},
					 {content:"2.想转行成为产品经理的人群"},
					 {content:"3.互联网创业者"}
				 ],
				 teacher:"林老师和他的产品们",
				 teachercon:"高级产品经理,擅长人机交互及数据分析,希望通过手把手教学,提高实用性的社会价值。",
			 }
		 }
	}
</script>

<style lang="scss" scoped>
	 .contents{
		 width:100%;
		 background:#fff;
		 font-size:32upx;
		  font-weight:500;
		  .clear{
		  		   content:"";
		  		   display:table;
		  }
		 .all{
			font-size:35upx;
			text-align: center;
			color:#3ac584;
			margin:50upx 0;
		 }
		 .sysr{
			 width:92%;
		     margin:0 auto;
			 .pope{
				padding-bottom:40upx;
				 .pname{
					 margin-bottom:20upx;
				 }
				 .pcontent{
					 padding-left:2upx;
				 }
			 }
		 }
		 .glay{
				  width:100%;
				  height:20upx;
				  background:#f2f4f7;
			  }
			  .school{
				  width:92%;
				  margin:0 auto;
				  display:flex;
				  justify-content: space-between;
				  padding:50upx 0;
				   font-size:34upx;
				   align-items:center;
				  .school-left{
					  display:flex;
					  align-items: center;
					  width:50%;
					 .xyimg{
						  width:106upx;
						  height:106upx;
						  margin:0 30upx 0 10upx;
					  }
					  .wang{
						  font-size:30upx;
						  margin-top:20upx;
					  }
				  }
				  .school-right{
					  display:flex;
					  align-items: center;
					  color:#c9c9c9;
					  font-size:26upx;
					  image{
						 width:30upx;
						 height:30upx;
						 margin-left:2upx;
					  }
				  }
				  
			  }
			  .teacher{
				  padding:40upx 0 160upx 0;
				  width:94%;
				  margin:0 auto;
				  .teacher-title{
					  color:#828b92;
					  margin:5upx 0 50upx 25upx;
					  font-size:38upx;
				  }
				  .teacher-content{
					  display:flex;
					  align-items:top;
					  image{
						  width:160upx;
						  height:130upx;
						  margin-right:40upx;
					  }
					  .contet-right{
						  width:585upx;
						  .right-title{
							  margin:40upx 0 30upx 0;
						  }
					  }
				  }
				  
			  }
		 
	 }
</style>
