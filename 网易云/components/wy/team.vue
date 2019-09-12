<template>
	<view class="teamcont">
	  <view class="teamcon">
		<view class="team-top pultitle">课程设计团队</view>
		<view class="team-bottom">
			<view class="box" v-for="(item,index) of boxlist" :key="index">
              <view class="box-top">
				 <text class="top-text">{{item.name}}</text>
				 <image :src="item.src"></image> 
			  </view>
			  <view class="box-bottom" :style="'background:'+item.bg">{{item.content}} 
			  </view> 
			</view>
		</view>  
	  </view>
	  <view class="pepole">
		<view class="pepolecon">
			<view class="pultitle">课程适合人群</view>
			<view class="plist">
			   <view class="items" v-for="(item,index) of plist" :key="index">
				  <view class="items-left">
					 <view>{{item.title}}</view>
					 <view class="left-bottom" :style="'color:'+item.color">{{item.content}}</view> 
				  </view>
				   <view class="items-right">
					<image :src="item.src"></image>   
				   </view> 
			   </view>
			</view>
		 <!--jiuyejihui-->
		<view class="jycontent">
		 <view class="jytitle">众多的就业机会: 推荐<text class="boss">Boss直聘</text>、<text class="lagou">拉勾网</text>寻找就业</view>
		  <view class="jylist">
			  <view class="jy" v-for="(item,index) of jylists" :key="index">
				<view class="jytop">
				  <view class="top-left">
				  <view class="leftf">
				   <text class="gtext">【校招】 金融产品经理[北京·东城区]</text>
				  <text class="htext">1天前发布</text>
				   <image class="wx" src="../../static/images/xiaoxi.png"></image> 
				  </view>
				  <view class="lefts">
				   <text class="otext">15k-25k</text>
				    <text class="jytext">经验应届毕业生/本科</text>		 
				  </view>		
				  </view>
				  <view class="top-right">
					<view class="rightl">
					<view class="rightlf">	
					 <text class="gtext">字节跳动</text>
					 <image src="../../static/images/anquan.png"></image>
					 </view>
					 <view class="jytext">移动互联网.数据服务/c轮/2000人以上</view>	 
					</view>
					 <view class="rightr">
						 <image src="../../static/images/xiao.jpg"></image>
					 </view> 
				  </view>	  
				</view>
				<view class="jybottom">
				 <view class="bottom-l">
				  <view class="ryq">扁平管理</view>	 
				  <view class="ryq">弹性工作</view>	 
				  <view class="ryq">大厨定制三餐</view>	 
				  <view class="ryq">就近租房补贴</view>	 
				 </view>
				 <view class="bottom-r">
				"六险一金，弹性工作，免费三餐，租房补贴"	 
				 </view>	 
				</view>   
			  </view>
		  </view>	 
		 <view class="three">
			 <view class="zfx" v-for="(item,index) of zfx" :key="index"> 
			 </view>
		 </view>
		</view>	 
		</view>  
	  </view>
	</view>
</template>

<script>
	 export default{
		    data(){
			  return{
				  zfx:3,
				  jylists:4,
				 boxlist:[
					{name:"Token/林满",src:"../../static/images/111_08.jpg",content:"Tencent、pconline产品经理,inneed产品经理创始人，天使投资人，网易年度金鱼奖、特别贡献奖得主。",bg:"#38374f"},
					{name:"Seth/许思",src:"../../static/images/111_05.jpg",content:"Tencent、pconline产品经理,inneed产品经理创始。",bg:"#697fd0"},
					{name:"Tom/汤宇",src:"../../static/images/111_07.jpg",content:"Tencent、pconline产品经理",bg:"#897d84"},
				 ],
				 plist:[
					 {title:"应届毕业生",src:"../../static/images/103.jpg",color:"#1de1ae",content:"数据表明，本课程应届毕业生就业率高达80%"},
					 {title:"转行人群",src:"../../static/images/104.jpg",color:"#697b92",content:"数据表明，本课程应届毕业生就业率高达80%"},
					 {title:"我要升职",src:"../../static/images/105.jpg",color:"#143b9f",content:"数据表明，本课程应届毕业生就业率高达80%"},
					 {title:"我要创业",src:"../../static/images/106.jpg",color:"#5ea398",content:"数据表明，本课程应届毕业生就业率高达80%"},
				 ],
				 jylist:[
					 {
					  top:[
						  {
						   title:"【校招】 金融产品经理[北京·东城区]",
						   time:"1天前发布",
						   src:"../../static/images/xiaoxi.png",
						   gz:"15k-25k",
						   yq:"经验应届毕业生/本科"
						  },
						  {
						   title:"字节跳动",
						   src:"../../static/images/anquan.png",
						   yq:"经验应届毕业生/本科"
						  },
						  
					  ],
					bottom:[
						
					]	   
					 }
				 ] 
			  }	
			}
	 }
</script>

<style lang="scss" scoped>
	 .teamcont{
		 width:100%;
		 background:#fff;
		 .pultitle{
			 color:#602398;
			 font-weight:900;
			 padding:20upx 0 18upx 0;
			 font-size:30upx;		
		 }
		 .teamcon{
			 width:88%;
			 margin:0 auto;
			.team-bottom{
			display:flex;
		    justify-content: space-between;
		    align-items:center;
		    .box{
			  width:31%;
			  border:1upx solid #f6f6f6;
		   	  font-size:20upx;
			  color:#602398;
			  .box-top{
				 display:flex;
				 justify-content:space-around;
				 align-items:center;
				 margin-top:20upx;
				  
				.top-text{
				 font-size:14upx;
				 margin-left:10upx; 
				 
				}
				 image{
				  width:108upx;
				  height:165upx;	   
				 } 
			  }
				.box-bottom{
				  color:#fffcff;
				 font-size:18upx;
				 height:130upx;
				 padding:0 10upx;
				  display:flex;
				 justify-content:center;
				 align-items:center;
						  
				}		  
			}	
			
			}  
			  
		 }
		 .pepole{
			width:92%;
			margin:15upx auto 0;
			background:#f2f2f2;
			height:1020upx;
			.pepolecon{
				width:95%;
				margin:0 auto;
		     .plist{
				display:flex;
				justify-content: space-between;
				flex-wrap:wrap;
			  .items{
				background:#fff;
				color:black;
				font-size:17upx;
				width:49%;
				display:flex;
				justify-content:space-around;
			    border-radius:10upx;
				font-weight:bold;
				margin-bottom:20upx;
				.items-left{
				 margin:20upx 0 5upx 15upx;	
					.left-bottom{
					 margin:16upx 0;
					 width:214upx; 
					}  
				}
		       .items-right{
				  margin-top:31upx; 
				  image{
					width:93upx;
					height:88upx;  
				  } 
			   }			
				
			  }	
			 }
			 .jycontent{
				width:100%;
			   .jytitle{
				 width:54%;
				 margin:0 auto;  
				 font-size:16upx;
				 font-weight:bold;
				 .boss{
					color:#179591; 
				 }
				 .lagou{
					color:#70bd4b; 
				 }  
			   }
			 .jylist{
				 width:100%;
				background:#fff;
				color:#acacac;
				margin-top:10upx;
			    padding:12upx 0;
				
			   .jy{
				  width:96%;
				  border:1upx solid #f3f3f3;
				  margin:0 auto 18upx;
				  padding-top:10upx;
				  &:last-child{
				  margin-bottom:0;	
				  }	
				  .jytop{
					 width:100%; 
					display:flex;
					align-items:center;
					justify-content:space-between;
					.gtext{
					  color:#1ee0ae;
					  font-size:13upx;
					  margin-right:5upx;		
					}
					.htext{
					  color:#c5c5c5;
					  font-size:10upx;	  
					}
					.otext{
					  color:#ef9a81;
					  font-size:16upx;
					  margin-right:15upx;
							
					}
					.jytext{
					 color:#8d8d8d;
					 font-size:12upx;	 
					}
					.top-left{
					    .leftf{	
						display:flex;
						align-items:center;
						.wx{
						 width:25upx;
						 height:25upx;
						 margin-left:2upx;	  
						}
						}
					 .lefts{
						display:flex;
						align-items:center;
						 
					 }	
					}
					.top-right{
					  display:flex;
					 align-items:center;
					 width:43%;
					 justify-content:space-around; 
					 .rightl{
					    .rightlf{
						 display:flex;
						 align-items:center;
						 margin-bottom:5upx;	  
						image{
						 width:22upx;
						 height:22upx; 
						} 
						}
					 }
				     .rightr{
						image{
						 width:55upx;
						height:55upx;	 
						} 
					 }			
					}
					  
				  }
				  .jybottom{
					width:100%;
					background:#fafafa;
					margin-top:10upx;
					color:#8d8d8d;
					font-size:10upx;
					padding:8upx 0;
					display:flex;
					align-items:center;
					.bottom-l{
					  display:flex;
					 align-items:center;
					 width:57%;
					 .ryq{
						border:1upx solid #e8e8e8;
						padding:2upx;
						margin-right:4upx;
						 
					 }		
					} 
				           }	  
			   }	 
			 }
			  .three{
				  width:16%;
				  margin:25upx auto 0;
				  display:flex;
				  justify-content:center;
				  .zfx{
					 background:#cdcdcd;
					  height:10upx;
					  width:10upx;
					  margin-right:15upx;
				  } 
			  }		 
			 }		 
			}
			 
		 }
	 }
</style>
