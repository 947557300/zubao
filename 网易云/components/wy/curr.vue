<template>
	<view class="content">
		<view class="baifen">
		<!--first-->
		<view class="curriculum">
			<view class="clear"></view>
		  <view class="currcont title">
			{{title}}
		  </view>
		  <view class="currcont name">
		  {{name}}
		  </view>
		  <view class="currcont">
		  	<view>{{jsfist}}</view>
		  	<text>{{jssecond}}</text>	
		  </view>
		  <view class="currcont">
			 {{wc}}
		  </view>
		  <view class="currcont">
		  	  <view v-for="(item,index) of xysq" :key="index">{{item.content}}</view>
		  </view>   
		</view>
		<!--second-->
		<view class="jtkc">
		  <view class="jtkc-one">
			 <view class="background">
				 <view class="clear"></view>
<!--yanse--><view class="one-top">
				<view class="one-year">
					<view class="year-font">2019</view>
					<view class="yuan"></view>
					<view class="yellow-font">小白到就业全套课程</view>
				</view>
				<view class="one-title">网易产品经理&nbsp;从0到1<text>成长</text>之路</view>
			</view> 
			  <view class="one-bottom">
				  <view class="daililist">
				  <view class="onedaili" v-for="(item,index) of daililist" :key="index">
                    <image :src="item.src"></image>
					<view>{{item.title}}</view>  
				  </view>
				 
				  </view>
				   <view class="onedujia">
					 <image src="../../static/images/biao.png"></image>
					 <text class="">独家研发录制,原创正版学习方案</text>
				   </view> 
			  </view>
			 </view>
		  </view>
		</view>
		<!--third--><view class="hong">
	              <view class="clear"></view>	
		        <view class="hongcont">
		      <view class="blacktitle">新人防坑指南</view>
			  <view class="mlone">
			  <view class="yellowtext">各种培训课程烟花缭乱,都是自己好 但是,真的能让我就业吗?</view>
			  <view class="blackground">一招识破:所谓的“包就业、0学费”，都是骗子！</view>
			  <view>本课程有数据支撑，就业率看得见！(详见往年课程)</view>
			   <view class="cricle">
				   <view class="cricle-out">
				 <view class="annular">
				         <view class="annular-out"></view>
				         <view class="annular-in">
				             <text>50%</text>
				         </view>
				     </view>
					 <text class="cricle-bottom">应届生入行(448人)</text>
					 </view>
					  <view class="cricle-out">
					 <view class="annular">
					         <view class="annular-out second-cicle"></view>
					         <view class="annular-in">
					             <text>29.5%</text>
					         </view>
					     </view>
						  <text class="cricle-bottom">业内转行(257人)</text>
						 </view>
						   <view class="cricle-out">
						 <view class="annular">
						         <view class="annular-out third-cicle"></view>
						         <view class="annular-in">
						             <text>20%</text>
						         </view>
						     </view>
							 <text class="cricle-bottom">培训后入行(165人)</text>
							 </view>
			   </view><!--cirle-->
			    <view class="yellowtext height-top">过度包装比比皆是,&nbsp;&nbsp;&nbsp;怎么识破?</view>
			<view class="blackground">一招识破:学习资料不值钱,网上一搜一大堆.拿多少资料都不如学到真正的技能和知识</view>
			 <view>本课程赠送的资料为本机构整理的书籍文档。不为讨好学员，不忽悠情怀，只教真本事，实现共赢目标.</view>
			 </view>
				<!--8ge-->
				<view class="eboxlist">
					<view class="ebox" v-for="(item,index) of eboxlist" :key="index"><view>{{item.title}}</view></view>
				</view>
				<!--3yue--> <view class="rz">
				  <view class="liwu">
					<image src="../../static/images/liwu.png"></image>
					<text>3 月: 参加课程赠199元产品总监课程</text>
					 <image src="../../static/images/liwu.png"></image>
				  </view>
				  <view class="baozha">
					<view class="bao">
					  <image src="../../static/images/bao.png"></image>
				<text class="zeng">赠</text>		  
					</view>  
				  </view>
				   <view class="clear"></view>
				  <view class="changping">
				   <view class="cp" v-for="(item,index) of changping" :key="index">
					 <view class="cpl">
					 <view class="djrz" v-if="item.djrz">{{item.djrz}}</view>
					 <view class="imgcont">
						<image :src="item.imgbg" class="bgimg" :class="item.djrz? ' bgimgborder':''"></image>
					  <image src="../../static/images/fang.png" class="dujia" v-if="item.imgcont"></image>
					 <view class="redcirle" v-if="item.redcirle"></view>	 
					 </view>	  
					 </view>
					 <view class="cpr">
					  <view class="redtext">{{item.redtextf}}</view>
					   <view class="redtext" v-if="item.redtexts">{{item.redtexts}}</view>
					   <view class="whitetext">{{item.whitetext}}</view>
					 </view>  
				   </view>
				  </view>
				</view>
			   </view>
		</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"curr",
		data(){
			return{
				title:"课程简介",
				name:"[2019网易产品课程]",
				jsfist:"虽然市面上优很多关于”产品经理“的课程,但它们的绝大部分都只是信息，以至于你经常遇到看完一堆“干货”但还不知道怎么用。",
				jssecond:"不同于市面上其他“拼凑经验”“碎片式”的课程,这是一门完全体系化、专业化、从零到一系统帮助你入门的课程。",
				wc:" 完成课程能胜任产品经理实习、产品策划等0~3年的产品经理的职责；或告别野路子产品经理；收获一份自己的产品Offer.",
				xysq:[
					{content:"学员社区-产品学习资料免费下载"},
					{content:"http://inneed.club"},
					{content:"学习问题可添加"},
					{content:"答疑QQ：916012040"}
				],
				daililist:[
					{src:"../../static/images/preview_04.jpg",title:"一课学院"},
					{src:"../../static/images/preview_05.jpg",title:"inNeed产品经理"},
					{src:"../../static/images/preview_07.jpg",title:"网易云课堂"},
				],
				eboxlist:[
					{title:"永久有效"},
					{title:"不限时间"},
					{title:"不限地点"},
					{title:"可回看"},
					{title:"提供课件下载"},
					{title:"社群资源下载"},
					{title:"在线答疑"},
					{title:"持续升级不再收费"},
					
				],
				changping:[
					{djrz:"网易独家认证标签",
					 imgcont:true,
					 imgbg:"../../static/images/part5_picture2.png",
					 redcirle:true,
					 redtextf:"价值199元",
					 redtexts:"018年度网易独家产品总监课程",
					 whitetext:"注：参见课程后，见课时4获取"
					},
					{
					 imgbg:"../../static/images/111_03.jpg",
					 redtextf:"38本精选产品经理电子书",
					 whitetext:"注：参见课程后，见课时4获取"
					}
					
				]
				
			}
		}
	}
	
</script>

<style lang="scss" scoped>
   .content{
	   width:100%;
	   background:#fff;
	   .clear{
		   content:"";
		   display:table;
	   }
	   .baifen{
		   width:92%;
		   margin:0 auto;
	   .curriculum{
		   .currcont{
		 margin:44upx 0;
		 font-size:32upx;
		 font-weight:500;
		 }
		 .name{
			 padding-left:5upx;
		 }
		 
	   }
	   
	    .jtkc{
			.jtkc-one{
				width:100%;
				height:320upx;
				background:url(https://s2.luckincoffeecdn.com/luckywebrm/images/index/cooperation/part5_picture2.png) center;
				.background{
					width:100%;
					height:100%;
					background:rgba(0,0,0,0.55);
					color:#fff;
				  .one-top{
					  margin:30upx 0 30upx 4%;
					 .one-year{
						 font-size:30upx;
						 display:flex;
						 background-image: linear-gradient(to right , #4b22bd, #6129fa);
						 border-radius:0 20upx 0 20upx;
						 width:46%;
						 align-items:center;
						 padding:1upx 10upx;
						 position:relative;
						 margin-bottom:20upx;
						 margin-left:5upx;
						.year-font{
							font-size:32upx;
							font-weight:bold;
							 background-image: linear-gradient(to right , #4a21bb, #642bfb);
							padding:0 5upx;
						}
						.yuan{
						width:13upx;
						height:13upx;
						border-radius:50%;
						background:#3b63ec;
						position:absolute;
						left:94upx;
						bottom:4upx
						}
						.yellow-font{
							color:#f2c039;
							 font-size:18upx;
							  margin-left:30upx;
							  font-weight:bold;
						}
					 } 
					.one-title{
						padding-left:12upx;
						text{
							color:#f1d01f;
						}
					} 
				  }
				  .one-bottom{
					margin:44upx 0 0 6%;
				    font-size:16upx;
					.daililist{
					  display:flex;
					  align-items:center;
					 color:#d8d3d3;
					 .onedaili{
						display:flex;
						align-items:center;
					   margin-left:10upx;	
						 image{
							width:34upx;
							height:34upx;
						 } 
					 }
					 }
					 .onedujia{
						display:flex;
						align-items: center;
						margin:14upx 0 0 20upx;
						font-size:22upx;
						image{
						  width:28upx;
						  height:28upx;
						  margin-right:8upx;
						}
					 }  
				  }	  
				}
			}
		}
	    .hong{
			background:#b12721;
			width:100%;
			height:100%;
			.hongcont{
				width:90%;
				margin:50upx auto 0;
                 height:1085upx;
				font-size:20upx;
				color:#fff;
			   .blacktitle{
				 font-weight:bold;
				  margin-bottom:15upx;
				  font-size:26upx;
				  color:black;
			   }
			   .mlone{
				 margin-left:6upx;  
			   .yellowtext{
				 color:#ffc708;
			     font-size:22upx;			 
			   }
			   .height-top{
				  margin-top:20upx; 
			   }
			   .blackground{
				   background:black;
				   color:#fff;
				   font-size:18upx;
				   text-decoration:underline;
				   margin:10upx 0;
				   padding-bottom:1upx; 
			   }
			   .cricle{
				  margin:20upx 0 0 10upx;
				  display:flex;
				  align-items:center;
				   .cricle-out{
					   display:flex;
					   flex-direction: column;
					   align-items: center;
					    margin-right:32upx;
					  .cricle-bottom{
						  font-size:17upx;
						  margin-top:
						  20upx;
					  }
					   .annular{
					            width:100upx;
					            height:100upx;
					            text-align: center;
					            position: relative;
					            line-height: 100upx;
					   							
					   							  .second-cicle{
					   								clip:rect(auto,65upx,auto,auto) !important;
					   							     border:7upx solid #3396fc !important; 
					   							  }
					   							  .third-cicle{
					   							  								clip:rect(auto,38upx,auto,auto) !important;   border:7upx solid #9764cd !important; 
					   							  }
					   							   .annular-out{
					   							             right:0;
					   							             top:0;
					   							             position:absolute;
					   							             bottom:0;
					   							             left:0;
					   							             border:7upx solid #f5e603;
					   							             border-radius:50%;
					   							             clip:rect(auto,100upx,auto,auto);
					   							             transform:rotate(90deg);
					   							         }
					         }
					   						    .annular::before{
					   						             content:"";
					   						             position: absolute;
					   						             top:0;
					   						             right:0;
					   						             bottom:0;
					   						             left:0;
					   						             border:7upx solid #fff;
					   						             border-radius:50%;
					   						         }
					   						         .annular::after{
					   						             content:"";
					   						             position:absolute;
					   						             top:0;
					   						             right:0;
					   						             bottom:0;
					   						             left:0;
					   						             border:7upx solid #fff;
					   						             border-radius:50%;
					   						             clip:rect(auto,50upx,auto,auto);
					   						         }
													 .annular-in{
														 span{
														  font-size:20upx;	 
														 };
													 }
				   }
				     
				   
			   }
			   }
			   /*8ge*/
			   .eboxlist{
				  width:92%;
				  margin:0 auto;
				  display:flex;
				  justify-content: space-between;
				  align-items:center;
				 color:#b12721;
				 flex-wrap:wrap;
				 .ebox{
					width:23%;
					text-align: center;
					background:#f9e909;
					height:68upx;
					line-height:68upx;
					margin-top:15upx;
					border-radius:7upx;
				  font-size:20upx;
				 font-weight:bold;
				 position:relative;
					 .smallheight{
					 	 line-height:33upx;
						  width:70%;
						  margin:0 auto; 
					 }
				 }
			   }
			   .rz{
				 width:100%;
				 background:#f9e909;
				 position:relative;
				 margin:50upx 0 20upx 0;
				 padding-bottom:2upx; 
				  .liwu{
					 display:flex;
					 align-items:center;
					 justify-content:space-between;
					 position:absolute;
					 background:#b12721;
					 color:#f9e909;
					 font-size:18upx;
					 width:450upx;
					 border-radius:25upx;
					  padding:7upx 10upx;
					 left:12%;
					 top:-28upx; 
					 image{
					  width:35upx;
					  height:35upx;
					 }
				  }
				  .baozha{
					 position:absolute;
					 right:13upx;
					 top:24upx; 
					 .bao{
					   position: relative;
					   image{
						 width:74upx;
						 height:80upx;  
					   }
						.zeng{
						  color:#fff;
						z-index:1;
						position:absolute;
					    font-size:40upx;
					    font-weight:bold;	
						left:18upx;
					    top:12upx;			  
						}
					 }  
				  }
				  .changping{
					width:81%;
					margin:50upx 0 0 50upx;
					
					.cp{
					 display:flex;
					color:#b12721;
				   font-size:17upx;
				   font-weight:bold;
				   margin-bottom:20upx;
					.cpl{
					  text-align: center;
					  margin-right:10upx;
					  .djrz{
						 margin-left:22upx; 
					  }
					  .imgcont{
						
						  position:relative;
						 .bgimg{
						
						width:168upx;
						height:108upx;	  
						 }
						 .bgimgborder{
						 border:1upx solid #fff;
						 margin-top:2upx; 
						 } 
						  .dujia{
							position:absolute;
							top:0;
							left:0;
							z-index:1;
							color:#fff;
						     width:36upx;
							 height:36upx;
						  }
						  .redcirle{
							 z-index:10;
							 width:55upx;
							 height:58upx; 
							 border-radius:50%;
							 position:absolute;
							 top:-14upx;
							 left:-18upx;
							 border:3upx solid #b12721; 
							 margin-bottom:1upx;
						  }
					  }
					}
					   .cpr{
						  margin-top:20upx; 
						 .redtext{
							color: #b12721;
							 font-size:22upx;
							 font-weight:bold;
							 }
						 .whitetext{
							color:#282009;
							font-size:1
							8upx;
							margin-top:6upx; 
						 }	 
						   
					   }
						 
					} 
				  }
				  
			   }
			}
			
		}
	   
	   
	   
	   
	   
	   
	   
	   }
   }
		
</style>
