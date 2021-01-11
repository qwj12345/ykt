<template>
	<view>
		<view class="page-top">
			<!-- 有绑定小孩时  -->
			<view  class="show-top" v-if="isLogin && children.length!==0">
				<!-- 轮播图 -->
				<swiper v-if="products.length!==0" circular="true" @change="changeSwiper">
					<swiper-item v-for="(item,key) in products" :key="key" >
						<view class="title">{{item.goodsName}}</view>
						<view class="product-icon"><image :src="item.goodsImg" /></view>
						<canvas :canvas-id="item.canvasId" id="item" class="charts3"></canvas>
						<view class="cricle-process">
							<view class="cricle-process-kg">{{item.weight}}<view>kg</view></view>
							<view>{{item.text}}</view>
						</view>
					</swiper-item>
				</swiper>
				<!-- 轮播图下方的点 -->
				<view v-if="products.length!==0" class="swiper-indicator">
					<view 	v-for="(item,key) in products" :key="key" style="transition: all .2s linear;"
							:class="{'sel-indicator-item':swiperIndex === key,'indicator-item':swiperIndex !== key}">
					</view>
				</view>
				<!-- 物品重量 -->
				<view v-if="products.length!==0" class="add-weight"  @click="goPage('/pages/classWeight/classWeight')">
					<view class="add-icon" ><image src="../../static/images/litter_add.png" ></image></view><view>物品重量</view> 
				</view>
				<!-- 没有绑定时 -->
				<view v-if="products.length===0" class="hide-top">
					<image src="../../static/images/no_bing.png" ></image>
					<view class="text">您还没有绑定产品哦~</view>
					<view class="btn" @click="goPage('/pages/bags/bags')">去绑定</view>
				</view>
				<!-- 选择小孩 -->
				<view class="choose-child" @click="toggleChoose">
					<!--  -->
					<view class="child-icon"><image :src="avatarImg[showChild.sex-1]"></image></view>
					<view class="child-name">{{showChild.name}}</view>
					<view class="change-child"><image  src="../../static/images/change.png"></image></view>
					<!-- 选择框 -->
					<view class="choose-modal" v-show="showChoose">
						<view class="item" v-for="(item,key) in children" :key="key" @click.stop="chooseChild(item)">
							<view class="child-icon"><image :src="avatarImg[item.sex-1]" ></image></view>
							<view class="child-name" :style="{color:item.id===showChild.id?'#000':'#666666'}">{{item.name}}</view>
							<view class="change-child" v-if="item.id===showChild.id"><image mode="widthFix" src="../../static/images/gou.png"></image></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 没有添加小孩时 -->
			<view v-else class="hide-top">
				<image src="../../static/images/no_bing.png" ></image>
				<view class="text">您还没有添加小孩哦~</view>
				<view class="btn" @click="goPage('/pages/childInfo/childInfo')">去添加</view>
			</view>
		</view>
		
		<!-- 课程表 -->
		<view class="home-class">
			<!--  -->
			<view  class="show-class" v-if="isLogin && (amSubjects.length!==0 || pmSubjects.length!==0)">
				<!-- 日期天气 -->
				<view class="top display-between-center">
					<view class="left display-between-center">
						<view class="day">{{nowDay.day}}</view>
						<view style="display: flex;flex-direction: column;justify-content: space-between;">
							<view class="zj">{{weeks[nowDay.week]}}</view>
							<view class="date" >{{nowDay.month}}</view>
						</view>
					</view>
					<view class="right display-between-center">
						<view class="weather-info">
							今天{{weather}} , 温度{{templow}}°C ~ {{temphigh}}°C
						</view>
						<view class="weather-icon">
							<img :src="weatherImg"/>
						</view>
					</view>
				</view>
				<!-- 课程表 -->
				<view class="time-table">
					<view class="block">
						<view class="time">上午</view>
						<view class="study" v-for="(item,key) in amSubjects" :style="studyColors[key]">{{item}}</view>
						<!-- 只有上午没有课时  -->
						<view class="study" v-if="amSubjects.length===0" style="background: none;">无</view>
					</view>
					<view class="block marginTop">
						<view class="time">下午</view>
						<view class="study" v-for="(item,key) in pmSubjects" :style="studyColors[key]">{{item}}</view>
						<!-- 只有下午没有课时 -->
						<view class="study" v-if="pmSubjects.length===0" style="background: none;">无</view>
					</view>
				</view>
				<!-- 编辑按钮 -->
				<view class="edit-btn"  @click="goPage('/pages/editTable/editTable?id='+showChild.id)">
					<image src="../../static/images/edit.png" style="height: 100%;"></image>
				</view>
			</view>
			<!-- 当天没有添加任何课程时-->
			<view v-else class="hide-class">
				<image src="../../static/images/no_class.png" ></image>
				<view  class="text">您还没有添加当天课程哦~</view>
				<view  class="btn" @click="goPage('/pages/editTable/editTable?id='+showChild.id)">去添加</view>
			</view>
		</view>
		
		<!-- 菜单栏 -->
		<view class="home-menu display-between-center">
			<view class="menu-item" v-for="(item,key) in menus" :key="key" @click="goPage(item.url)">
				<view  class="menu-icon"><image :src="item.icon" style="height: 100%;"></image></view>
				<view class="menu-text">{{item.name}}</view>
			</view>
		</view>
		<!-- 提示框 -->
		<wyb-loading  title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	
		<!-- 手机号授权  -->
		<phone-modal ref="phone"></phone-modal>
		<!-- 小程序授权 -->
		<sq-modal ref="sq"></sq-modal>
	</view>
</template>

<script>
	import amap from '@/common/amap-wx.js';//高德地图api
	import uCharts from '../../components/u-charts/u-charts.js';
	import {timeFormat,timeFormat1} from "../../common/common.js";
		
	let _self;
	export default {
		data() {
			return {
				invitationCode:"",//邀请码
			
				toastTitle:"",
				toastType:"ring",
				showChoose:false,
				menus:[
						{icon:require("../../static/images/menus/menu1.png"),name:"书包登记",url:"/pages/register/register"},
						{icon:require("../../static/images/menus/menu2.png"),name:"幸运抽奖",url:"/pages/lottery/lottery"},
						{icon:require("../../static/images/menus/menu3.png"),name:"赚奖学金",url:"/pages/integral/integral"},
						{icon:require("../../static/images/menus/menu4.png"),name:"我的书包",url:"/pages/bags/bags"},
						{icon:require("../../static/images/menus/menu5.png"),name:"最新消息",url:"/pages/message/message?type=0"},
						{icon:require("../../static/images/menus/menu6.png"),name:"添加关注",url:"/pages/follow/follow"},
					],
				swiperIndex:0,
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致 
				pixelRatio:1,
				list:["canvasArcbar1","canvasArcbar2"],
				studyColors:["background:rgb(199,234,251)","background:rgb(232,243,210)","background:rgb(250,204,229)","background:rgb(253,235,209)"],
				weeks:["周日","周一","周二","周三","周四","周五","周六"],
				nowDay:{month:"5月2020",day:"20",week:3},
				weather:"--",
				temphigh:"--",
				templow:"--",
				weatherImg:"http://level8cases.oss-cn-hangzhou.aliyuncs.com/weathercn02/29.png",
				children:[],
				avatarImg:[require("../../static/images/l_boy.png"),require("../../static/images/l_gril.png")],
				showChild:{},//当前小孩
				 products:[],
				 amSubjects:[],//课表信息
				 pmSubjects:[],
				 showChildId:0//为了不多次改变showChild会多次请求课表
			}
		},
		computed:{
			isLogin() {
			  return this.$store.state.login;
			},
	
		},
		watch:{
			// 当获取到token时触发某些事件
			isLogin(){
				if(this.isLogin){
					this.getStudent();	
				}
			},
			showChild: {
			  handler(newName, oldName) {
				 this.getSubject();
			  },
			  immediate: true
			}
		},

		methods: {
			// 显示授权提示弹框 
			showSQ(){
				this.$refs.sq.toggle();
			},
			// 
			goPage(url){
				if(this.isLogin){
					if(url.search('editTable')!==-1 && this.children.length===0){//还没有小孩子时无法编辑课表
						this.toastTitle = "请先添加小孩";
						this.toastType = "none";
						this.$refs.toast.showLoading();
					}else{
						uni.navigateTo({
							url
						})
					}
					
				}
				else{
					this.showSQ();
				}
			},
			// 
			toggleChoose(){
				this.showChoose ? this.showChoose = false : this.showChoose = true;
			},

			changeSwiper(e){
				this.swiperIndex = e.mp.detail.current;
			},
			// 选择孩子
			chooseChild(item){
				if(this.showChild.id !== item.id){
					this.showChildId = item.id;
					this.toggleChoose();
					this.getChildDetail();
				}
			},
			// 获取孩子列表
			getStudent(){
				this.myRequest("student/findStudent",{data:{},method:'GET',contentType:"application/json"}).then(res =>{
					if(res.data.code===200 && res.data.data.length!==0){
						this.children = res.data.data;
						this.showChildId = res.data.data[0].id;
						// this.getChildDetail();
					}
				})
			},
			// 获取儿童详情  
			getChildDetail(){
				let data = {
					id:this.showChildId,
					isWeightCalculation:true//是否显示重量
				}
				
				this.$refs.loading.showLoading() // 显示
				this.myRequest("gmt/api/gmtChild/child/gmtChildDetail",{data}).then(res =>{ 
					this.$refs.loading.hideLoading() //  101
					if(res.data.code===0){
						this.showChild = res.data.data;
						this.list = [];
						this.showChild.childBags.forEach((item,key) => {
							item.weight = (item.goodsWeight + this.showChild.weightCalculation.actualWeight).toFixed(1);
							item.canvasId = 'canvas'+key;
							let dataL = item.weight/(this.showChild.weightCalculation.maxWeight+this.showChild.weightCalculation.standardWeight);
							dataL>=1 ? item.text="已超重" : item.text="重量正常";
							
							let chartData = {
								series: [{
									data: dataL>=1 ? 1 : dataL,
									color: dataL>=1 ? 'rgb(232,56,58)' : 'rgb(255,255,255)' 
								}]
							}
							// 
							this.showArcbar('canvas'+key,chartData);
						})
						this.products = JSON.parse(JSON.stringify(this.showChild.childBags));
					}else{
						this.toastType = "error";
						this.toastTitle = "请求错误";
						this.$refs.toast.showLoading() // 显示
					}
				})
			},
			// 获取日期
			getDate(){
				this.nowDay = timeFormat1(new Date(),0);
				// 获取日期后再获取课表
				this.getSubject();
			},
			// 获取天气
			getWeather(key){
				var myAmapFun = new amap.AMapWX({key:key});//高德获取地理位置
				myAmapFun.getRegeo({
				      success: function(res){
						 let location = res[0].regeocodeData.addressComponent.streetNumber.location.split(",").reverse().join(",");
						uni.request({
						    url:`https://jisutqybmf.market.alicloudapi.com/weather/query?city='${res[0].regeocodeData.addressComponent.district}'&location="${location}"`,
						    method: "GET",
						    header: {
						        "Authorization":"APPCODE cbd4d9a3b71d4b078ab4e8cae480f29c",
								"content-type":"application/x-www-form-urlencoded; charset=UTF-8"
						    },
						    success(res){ 
						        console.log(res.data.result)
								_self.weather = res.data.result.weather;
								_self.temphigh = res.data.result.temphigh;
								_self.templow = res.data.result.templow;
								_self.weatherImg = "http://level8cases.oss-cn-hangzhou.aliyuncs.com/weathercn02/"+res.data.result.img+".png";
						    }
						})
						
				      },
				      fail: function(info){
				        //失败回调
				        console.log(info)
				      }
				    })
				// myAmapFun.getWeather({
				//   success: function(data){
				// 	//成功回调
				//   },
				//   fail: function(info){
				// 	//失败回调
				// 	console.log(info)
				//   }
				// })
			},
			// 圆环进度
			showArcbar(canvasId,chartData){
				// 修改未完成进度的在组件文件3258行   设置未完成的宽度3257行
				let canvaArcbar1=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:{show:false},
					duration:2500,
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							ringWidth:3,
							labelWidth:20,
							startAngle:0.5//整圆类型只需配置起始角度即可
						}
					}
				});
			},
			// 获取课表
			getSubject(){
				if(this.showChild.id){
					let data = {
						childId :this.showChild.id,
						weekIndex:this.nowDay.week===0? 7 : this.nowDay.week
					}
					// 
			
					this.myRequest('gmt/api/gmtChild/gmtChildClassCard/getGroupInfo',{data}).then(res => {
		
						if(res.data.code===0){
							let subject = res.data.data;
							// 获取上午课表
							this.amSubjects = [];
							this.pmSubjects = [];
							for(let i=1;i<=4;i++){
								if(subject[this.nowDay.week+'_'+i]){
									this.amSubjects.push(subject[this.nowDay.week+'_'+i].classCardName);
								}
							}
							// 获取下午课表
							 for(let i=5;i<=8;i++){
								if(subject[this.nowDay.week+'_'+i]){
									this.pmSubjects.push(subject[this.nowDay.week+'_'+i].classCardName);
								}
							 }
							 
						}else{
							this.toastType = "error";
							this.toastTitle = "课表请求错误";
							this.$refs.toast.showLoading() // 显示
						}
						
					})
				}
			}
		},
		onShareAppMessage(res) {
			//转发时携带 shareTicket才能在回调中获取到shareTickets
			uni.showShareMenu({
				withShareTicket: true
			})
		},
		onShow(){
			// if(getApp().globalData.subjectFlag===1){
			// 	getApp().globalData.subjectFlag = 0;
			// 	this.getChildDetail();
			// }
			// if(getApp().globalData.bagFlag === 1){
			// 	getApp().globalData.bagFlag = 0;
			// 	this.getChildDetail();
			// }
			// if(getApp().globalData.homeChildFlag===1){
			// 	getApp().globalData.homeChildFlag = 0;
			// 	this.getStudent();
			// }
		},
		onLoad(query) {

			console.log(123)
			_self = this;
			this.cWidth3=uni.upx2px(316); //这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(316);//这里要与样式的宽高对应  
			this.arcbarWidth=uni.upx2px(34);

			// 获取天气
			this.getWeather("fd775be10a2b2f19a552105a2747c07f");
			this.getDate();
		},
	}
</script>

<style  lang="less">
	@import url("../../common/common.less");
	@topHeight:520upx;
	page{
		background: rgb(251,251,251);
	}
	.page-top{
		background-image: url("/static/images/page_top.png");//图片没有超过40k会自动转换成base64
		background-size: cover;
		.show-top{
			height: @topHeight;
			position: relative;
			swiper{
				height:380upx;
				swiper-item{
					display: flex;
					justify-content: center;
					.title{
						position: absolute;
						left: 50%;
						transform: translate(-50%,0);
						font-size: 24upx;
						color: #fff;
						margin-top: 16upx;
						letter-spacing: 2upx;
					}
					.product-icon{
						position: absolute;
						left: 50%;
						transform: translate(-50%,0);
						width: 64upx;
						height: 64upx;
						top: 100upx;
					}
					.charts3 {
						margin-top: 50upx;
						width: 316upx;/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
						height: 316upx;
					}
					.cricle-process{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-20%);
						color: #fff;
						text-align: center;
						font-size: 22upx;
						.cricle-process-kg{
							display: flex;
							justify-content: center;
							font-size: 66upx;
							font-weight: bold;
							transform: scaleY(1.2);
							view{
								font-size: 24upx;
								align-self: flex-end;
								font-weight: 300;
								margin-bottom: 12upx;
							}
						}
					}
				}
			}
			// 轮播图下方的点
			.swiper-indicator{
			  display: flex;
			  justify-content: center;
			  .sel-indicator-item{
			    height: 10upx;
			    width: 10upx;
				 border-radius: 50%;
			    background: rgba(255, 255, 255, 1);
			    margin: 0 10upx;
			  }
			  .indicator-item{
			    height: 10upx;
			    width: 10upx;
			    border-radius: 50%;
			    background: rgba(255, 255, 255, 0.4);
			    margin: 0 10upx;
			  }
			}
			// 添加物品重量
			.add-weight{
				font-size: 20upx;
				background: #fff;
				border-radius: 24upx;
				padding: 0upx 14upx;
				position: absolute;
				bottom: 130upx;
				right: 28upx;
				letter-spacing: 1upx;
				display: flex;
				align-items: center;
				height: 44upx;
				line-height: 44upx;
				.add-icon{
					width:24upx;
					height: 24upx;
					margin-right: 6upx;
					display: flex;
					align-items: center;
				}
			}
			// 
			.choose-child{
				position: absolute;
				left: 28upx;
				top: 10upx;
				display: flex;
				align-items: center;
				.child-icon{
					width: 44upx;
					height: 44upx;
				}
				.child-name{
					font-size: 24upx;
					margin: 0 10upx;
				}
				.change-child{
					width: 54upx;
					height: 28upx;
				}
				.choose-modal{
					position: absolute;
					background: #fff;
					width: 100%;
					bottom: 0;
					left: -10upx;
					width: 110%;
					transform: translate(0,110%);
					border-radius: 30upx;
					padding: 16upx 10upx 16upx 18upx;
					box-sizing: border-box;
					z-index: 3;
					.item{
						display: flex;
						align-items: center;
						margin-bottom: 24upx;
						.child-icon{
							width: 38upx;
							height: 38upx;
						}
						.child-name{
							font-size: 22upx;
							margin: 0 20upx 0 10upx;
						}
						
						.change-child{
							width: 24upx;
						}
					}
					.item:last-child{
						margin-bottom: 0;
					}
					
				}
				.choose-modal::before{
					content: "";
					position: absolute;
					border-bottom: 10upx solid #fff;
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					top: 0;
					left: 50%;
					transform: translate(-50%,-90%);
				}
			}
		}
		.hide-top{
			position: relative;
			height: @topHeight;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #fff;
			padding-top: 80upx;
			box-sizing: border-box;
			image{
				width: 95upx;
				height: 83upx;
			}
			.text{
				font-size: 22upx;
				letter-spacing: 2upx;
				margin-top: 20upx;
			}
			.btn{
				width: 320upx;
				height: 64upx;
				border-radius: 32upx;
				text-align: center;
				line-height: 64upx;
				box-sizing: border-box;
				font-size: 24upx;
				margin-top: 40upx;
				border: 2upx solid #fff;
			}
		}
	}
	.home-class{
		position: relative;
		z-index: 2;
		width: @blockWidth;
		background: #fff;
		border-radius: 30upx;
		margin: -110upx auto 0;
		padding: 26upx 24upx 30upx;
		box-sizing: border-box;
		box-shadow: 0 24upx 38upx 0upx #e9e9e9;
		.show-class{
			.top{
				.left{
					.day{
						font-size: 80upx;
						transform: scaleY(1.05);
						margin-right: 4upx;
					}
					.zj{
						font-size: 30upx;
					}
					.date{
						font-size: 25upx;
						color: #888;
					}
				}
				.right{
					.weather-info{
						font-size: 18upx;
						padding: 0upx 16upx;
						border: 2upx solid rgb(96,193,228);
						border-radius: 30upx;
						height: 48upx;
						line-height: 48upx;
						color: #666;
						margin-right: 16upx;
					}
					.weather-icon{
						width: 80upx;
						height: 80upx;
					}
				}
			}
			.time-table{
				margin-top: 40upx;
				.marginTop{
					margin-top: 32upx;
				}
				.block{
					display: flex;
					.time{
						color: #333;
						font-size: 18upx;
						width: 18upx;
						line-height: 30upx;
					}
					.study{
						padding: 0 32upx;
						height: 60upx;
						line-height: 60upx;
						font-size: 24upx;
						background: rgb(199,234,251);
						border-radius: 30upx;
						letter-spacing: 2upx;
						margin-left: 20upx;
					}
				}
			}
			.edit-btn{
				position: absolute;
				right: 24upx;
				bottom: 24upx;
				width: 64upx;
				height: 64upx;
				padding: 0 !important;
				background: none !important;
				
			}	
			.edit-btn::after{
				border: none !important;
			}
		}
		// 
		.hide-class{
			height: 280upx;
			font-size: 22upx;
			color: @mainColor;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			image{
				width: 110upx;
				height: 84upx;
			}
			.text{
				font-size: 22upx;
				letter-spacing: 2upx;
				margin-top: 20upx;
				color: #999;
			}
			.btn{
				width: 320upx;
				height: 64upx;
				border-radius: 32upx;
				text-align: center;
				line-height: 64upx;
				box-sizing: border-box;
				font-size: 24upx;
				margin-top: 30upx;
				border: 2upx solid @mainColor;
			}
		}

	}
		
	.home-menu{
		width: 540upx;
		margin: 40upx auto;
		flex-wrap: wrap;
		.menu-item{
			padding: 15upx;
			width: 140upx;
			font-size: 22upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			margin-bottom: 6upx;
			.menu-icon{
				width: 100%;
				height: 112upx;
			}
			.menu-text{
				margin-top: -8upx;
			}
		}
	}
</style>
