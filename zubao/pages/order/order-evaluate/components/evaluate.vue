<template>
	<view class="content">
		<view class="productout">
		<view class="product">
			<view class="product-con flex">
				<image :src="imgs.img1"></image>
				<view class="title-cont">
					<view class="title">自行车是的是的是的是的是的是的是的是的ssssssssssssssssssssssssssssssss</view>
					<view class="ffifle glaytext">sdsdsdsds</view>
				</view>	
		</view>
		<view class="eval flex">
		 <view class="all">整体评价</view>
		 <ra-te :color="color" :size="size" :activeColor="activeColor" :value="100" @changee="chang($event)" class="rate"></ra-te>
		 <view class="glaytext pjname">{{change}}</view>
		</view>
	</view>
	</view>
	<view class="inputout">
	<view class="eval-input">
	 <textarea value=""  class="textare" placeholder="宝贝满足你的期待吗?" maxlength="500" placeholder-style="color:#b9b9b9" />
	 <view class="input-bottom flex">
		 
	  <view class="input-imgout" v-for="(item,index) of imglist" :key="index" @tap="scimg($event)" :data-id="index">
		 <image :src="imgs.img2" class="delete" v-if="item.imgtrue" @tap.stop="deleimg(index)"></image> 
		<view class="input-img" >
			<view v-if="!item.imgtrue" class="imgfalse">
			 <image :src="imgs.img3"></image>
			  <view>{{item.imgtext}}</view>
			 </view>
			  <view v-if="item.imgtrue" class="imgtrue">
				<image :src="item.path"></image>
			  </view>
		</view>  
	  </view>
	  <view class="input-imgout"  @tap="scimgs()" v-if="tslength<5&&tslength!=0">
	  		<view class="input-img" >
	  			<view  class="imgfalse">
	  			 <image :src="imgs.img3"></image>
	  			  <view>{{tslength}}/5</view>
	  			 </view>
	  		</view>  
	  </view>
	  <view class="input-videoout">
		   <image :src="imgs.img2" class="delete" v-if="srctrue" @tap="delevideo"></image> 
		<view class="input-video" @tap="scvideo()">
		   <view v-if="!srctrue" class="srcfalse">
			<image :src="imgs.img4" >
			<view>添加视频</view>
			</view>
			<view v-if="srctrue">
			 <video :src="src" class="srctrue" autoplay="false"></video>	
			</view>
		</view>
		</view>    
	  </view>	   
	 </view> 
	</view>
	<view class="nmout">
	 <view class="flex nm">	  
	   <view class="flex" @tap="nmchange()">
		   <image :src="imgs.img5" v-if="!ok"></image>
		   <image :src="imgs.img6" v-if="ok"></image>
		    <text class="imgright">匿名</text> 
	   </view>
		 <view class="glaytext">{{nmtitle}}</view>
	 </view>
	 </view>
	 <view class="otherpjout">
	  <view class="otherpj">	 
	   <view>店铺评价</view>
		<view class="flex flextop">
		 <view>物流服务</view>
		 <ra-te :color="color" :size="size" :activeColor="activeColor" :value="0" @changee="chang1($event)" class="rate"></ra-te>
		 <view class="glaytext pjname">{{change1}}</view>
		</view>
			<view class="flex flextop">
			 <view>服务态度</view>
			 <ra-te :color="color" :size="size" :activeColor="activeColor" :value="0" @changee="chang2($event)" class="rate"></ra-te>
			 <view class="glaytext pjname">{{change2}}</view>
			</view>
	 </view>
	 </view>
	  <view class="fabuout">
		    <view class="fabu">发布</view>		
	  </view>
	 </view>
</template>
<script>
import RaTe from "../../../../components/uni-ui/uni-rate/uni-rate.vue"	
	 export default{
		 components:{
			RaTe 
		 },
		 data(){
			 return{
				 imgs:{
					 img1:require("../../../../static/login/part5_picture2.png"),
					 img2:require("../../../../static/order/order-evaluate/false.png"),
					 img3:require("../../../../static/order/order-evaluate/img.png"),
					 img4:require("../../../../static/order/order-evaluate/video.png"),
					 img5:require("../../../../static/login/cirle.png"),
					 img6:require("../../../../static/login/ok.png") 
				 },
				 color:'#f2f2f2',
				 activeColor:"#eb828f",
				 size:"30",
				 ss:"",
				 pjlist:[
					 {name:"差"},
					 {name:"一般"},
					 {name:"好"},
					 {name:"很好"},
					 {name:"非常好"},
				 ],
				evalcontent:"",
				imglist:[
					{
					 path:'',
					 imgtrue:false,
					 imgtext:"添加照片"	  
					}
				],
				imglists:"",
				tslength:0,
				ok:true,
				nmtitle:"你写的评价会以匿名的形式展现",
				src:"",
				srctrue:false,
				change:"非常好",
				change1:"",
				change2:"",
			 }
		 },
		 watch:{
			 
		 },
		 methods:{
			 chang($event){
			  var  e=$event;
			  var  a=this.watchvalue(e);
			  this.change=a;
	  
			},
			 chang1($event){
				 var  e=$event;
				 var  a=this.watchvalue(e);
				 this.change1=a;
			 },
			 chang2($event){
				 var  e=$event;
				 var  a=this.watchvalue(e);
				 this.change2=a;
			 },
			 watchvalue(e){
				 var title="";	 
				if(e==1){
									title="非常差" 
				}else if(e==2){
									 title="很差"
									 }else if(e==3){
									 title="一般"
									 }else if(e==4){
									 title="很好"
									 }else if(e==5){
									 title="非常好"
									 }
				   return title;
			 },
			deleimg(index){
				
				this.imglist.splice(index,1);
				var length=this.imglist.length;
				this.tslength=length;
				if(length==0){
				this.imglist.splice(0,1);
					var starobj={
					 path:'',
					 imgtrue:false,
					 imgtext:"添加照片"
					};
				 this.imglist.push(starobj);	
				}
				},
			delevideo(){
				this.src="";
				this.srctrue=false;
			},	
			 
			 scimgs(){
				 var that=this;
				 console.log(that.tslength);
				 uni.chooseImage({
				 	count:5-that.tslength,
					sizeType:"compressed",
					success:function(res){
					 var ts=res.tempFiles;
					  	for(var i=0; i<ts.length;i++){
					  		ts[i].imgtrue=true;
					  	}
					  that.imglist.push(...ts);	
					  that.tslength=that.imglist.length;
					},
					
				 })
			 },
			 scimg($event){       
			 				 var that=this;
						   if(that.tslength!=0){
							   var i=$event.currentTarget.dataset.id;
							   var url=that.imglist[i].path;
							   var urlarry=[];
							   urlarry.push(url);
							        uni.previewImage({
										urls:urlarry,
									})
						   }else{
			 				 uni.chooseImage({
			 				 	count:5,
			 					sizeType:"compressed",
			 					success:function(res){
			 				    /*that.imgtrue=true;*/		
							    var ts=res.tempFiles;
								that.tslength=res.tempFiles.length;	
								for(var i=0; i<ts.length;i++){
									ts[i].imgtrue=true;
								}	
								that.imglist.push(...ts);
								that.imglist.splice(0,1);
			 					}
			 				 })
							 }
			 },
			 scvideo(){
				    var that=this;
					 if(!that.srctrue){
				           uni.chooseVideo({
				                           count: 1,
				                           sourceType: ['camera', 'album'],
				                           success: function (res) {
											   that.srctrue=true;
				                               that.src = res.tempFilePath; 
				                           }
				                       });
									   }
			 },
			 nmchange(){
				 this.ok=!this.ok;
			  	 if(this.ok==true){
					 this.nmtitle="你写的评价会以匿名的形式展现"
				 }else{
					this.ok==false;
					this.nmtitle="公开的评价会展示在个人页面"
				 }
			 },
			 
		 }
		 
		}
	 
</script>

<style lang="scss" scoped>
	.content{
			width:100%;
		    font-size:30upx;
		    background:#f2f2f2;
		    color:#3e3e3e;
			position:relative;
			.srctrue{
			  width:100% !important;
			  height:160upx !important;	  
			}
			.flex{
			  display:flex;
			  align-items:center;	  
			}
			.pjname{
			  margin-top:5upx;	
			}
			.rate{
			  margin:0 20upx 0 20upx;	
			}
			.glaytext{
				color:#b9b9b9;
			}
			.productout{
			  border-bottom:2upx solid #f2f2f2;  
			 .product{
				padding-top:50upx;
				width:94%;
				  margin:0 auto;
			    .product-con{
				  justify-content: space-between;
				image{
				  width:90upx;
				 height:90upx;
					   
				}
				.title-cont{
				  width:84%;
				  view{
				   overflow: hidden;
				   text-overflow: ellipsis;
					 white-space: nowrap;
				  }	  
				}
			   .title{
				  margin-bottom:8upx; 
			   }		  
				}
		       .eval{
				  margin:50upx 0 20upx 0; 
				
				  .all{
					 font-weight:bold;
					 font-size:32upx; 
				  }
				     
			   }       		
			 }
			 }
				 .productout,.inputout,.nmout,.otherpjout{
					width:100%;
					background:#fff; 
				 } 
				   .eval-input{
				   	 width:94%;
					 margin:0 auto;
					 padding:20upx 0;
					 border-bottom:2upx solid #f2f2f2; 
				   	 .textare{
				       height:170upx;
					  width:100%; 
				   				 }
					.input-bottom{
					    width:100%;
						flex-wrap:wrap; 	
					  .input-imgout,.input-videoout{
						  width:21%;
						  height:160upx;
						  margin-top:20upx; 
						 position:relative;
						 margin-right:4%;
						.delete{
						  position:absolute;
						 width:32upx;
						 height:32upx;
						 right:-16upx;
						 top:-12upx;
						 z-index:1;
						} 
					   .input-img,.input-video{
						    position:absolute;
							font-size:20upx;
							color:#8a8a8a;
							text-align:center;
							width:100%;
							height:160upx;
							border:4upx dotted #f2f2f2;
							.imgfalse,.srcfalse{
						  	image{
							  width:50upx;
							  height:50upx;
							  margin-top:40upx;		
							}
							}
						   .imgtrue{
							   image{
							   width:100%;
							   height:160upx;
							   }
							   
						   }	
					   }	  
					  }	
					}		 
			 }
			 .nm{
				margin:0 auto;
				 width:94%;
				padding:20upx 0;
			    justify-content: space-between;
				font-size:24upx;
			     image{
				   width:50upx;
				   height:50upx;
				   margin-right:14upx;			   
				 }	
			 }
			 .otherpj{
			   font-size:26upx;
			   width:94%;
			   margin:20upx auto 0;
			  padding-top:30upx;
			   .flextop{
				  margin-top:20upx; 
			   }
			 }
			 .fabuout{
			  position:fixed;
			  bottom:0;
			  left:0;
		      width:100%;
			 .fabu{
				  margin-top:20upx;
				  height:100upx;
				  line-height:100upx;
				  text-align:center;
				  color:#fff;
				  background:#ea838f;		  
				  font-size:28upx;	   
			  }
			 }
			}	 
</style>
