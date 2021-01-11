<template>
	<view id="edit-table">
		<view class="edit-item display-between-center" @click="showSelDay">
			<view class="title">星期</view>
			<view class="sel-input">{{week}}</view>
		</view>
		<!-- 上午 -->
		<view class="cut-line"></view>
		<view class="edit-item display-between-center" v-for="(item,key) in 4" :key="key" @click="showSelClass(key)">
			<view class="title">{{classNumList[key]}}</view>
			<view class="sel-input">{{classList[key].classCardName}}</view>
		</view>
		<!-- 下午 -->
		<view class="cut-line2"></view>
		<view class="edit-item display-between-center" v-for="(item,key) in 4" :key="key" @click="showSelClass(key+4)">
			<view class="title">{{classNumList[key+4]}}</view>
			<view class="sel-input">{{classList[key+4].classCardName}}</view>
		</view>
		<!-- 按钮 -->
		<view class="fix-btn" >
			<view class="btns display-between-center">
				<view class="white-btn" @click="goWeight">添加其他课程</view>
				<view class="main-btn" @click="saveClass">保存</view>
			</view>
		</view>
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		
		<QSpicker type="custom2" ref="QS_Picekr_custom_1" pickerId="custom_1" :dataSet="customSet" :buttonSet="buttonSet"  @confirm="confirmDay($event)" />
		<QSpicker type="custom2" ref="QS_Picekr_custom_2" pickerId="custom_1" :dataSet="customSet2" :buttonSet="buttonSet"  @confirm="confirmClass($event)" />
	</view>
</template>

<script>
	import QSpicker from '@/components/QuShe-picker/QuShe-picker.vue';
	import {myRequest2} from "../../common/common.js"
	export default {
		data() {
			return {
				toastTitle:"出错啦",
				toastType:"error",
				id:undefined,
				week:"星期一",
				weekNum:1,//星期几 （传给后台）
				classNum:0,//第几节课
				classNumList:["第一节","第二节","第三节","第四节","第五节","第六节","第七节","第八节",],
				classList:[{classIndex:1,classCardId:-1,classCardName:""},
							{classIndex:2,classCardId:-1,classCardName:""},
							{classIndex:3,classCardId:-1,classCardName:""},
							{classIndex:4,classCardId:-1,classCardName:""},
							{classIndex:5,classCardId:-1,classCardName:""},
							{classIndex:6,classCardId:-1,classCardName:""},
							{classIndex:7,classCardId:-1,classCardName:""},
							{classIndex:8,classCardId:-1,classCardName:""},
							],
				buttonSet:{
					confirmColor:"rgb(244,157,26)"
				},
				customSet:{
					itemArray: [
						[{
							"name": "星期一", //name变量名需与下方steps.steps_1_value相同
							"value": "1" //可添加多项自定义想要的数据
						}, {
							"name": "星期二",
							"value": "2"
						}, {
							"name": "星期三",
							"value": "3"
						}, {
							"name": "星期四",
							"value": "4"
						}, {
							"name": "星期五",
							"value": "5"
						}],
							
					],
					defaultValue: [0, 0], //初始数据
					steps: {
						step_1_value: "name"
					}
				},
				customSet2:{
					itemArray: [
						[{
							"name": "语文", //name变量名需与下方steps.steps_1_value相同
							"value": "1" //可添加多项自定义想要的数据
						}, {
							"name": "数学",
							"value": "2"
						}, {
							"name": "英语",
							"value": "3"
						}, {
							"name": "体育",
							"value": "4"
						}, {
							"name": "美术",
							"value": "5"
						}],
							
					],
					defaultValue: [0, 0], //初始数据
					steps: {
						step_1_value: "name"
					}
				},
			};
		},
		components: {
			QSpicker
		},
		methods:{
			// 显示选择周几的选择框
			showSelDay(){
				this.$refs["QS_Picekr_custom_1"].show();
			},
			// 显示选择课程的选择框
			showSelClass(type){
				this.$refs["QS_Picekr_custom_2"].show();
				this.classNum = type;
			},
			// 选择周几
			confirmDay(e){
				this.week = e.data[0].name;
				this.weekNum = e.data[0].value;
				this.getWeekClass();
			},
			// 选择什么课
			confirmClass(e){
				this.$set(this.classList,this.classNum,{classCardName:e.data[0].name,classCardId:e.data[0].id,classIndex:this.classNum+1})//需要课程id和classIndex第几节课
				// this.classList[this.classNum] = {classCardName:e.data[0].name,classCardId:e.data[0].value,classIndex:this.classNum+1}
			},
			// 去编辑科目重量
			goWeight(){
				uni.navigateTo({
					url:"../classWeight/classWeight"
				})
			},
			// 保存
			saveClass(){
				let classList = this.classList.filter(item => item.classCardName !== "无"&&item.classCardName !== "")
				console.log(classList)
				let data = classList
				let otherParams = `&childId=${this.id}&weekIndex=${this.weekNum}`//需要拼接在地址后面的参数
				
				this.$refs.loading.showLoading() // 显示
				myRequest2("gmt/api/gmtChild/gmtChildClassCard/saveOrUpdate",{data:data,contentType:"application/json",otherParams:otherParams}).then(res => {
					this.$refs.loading.hideLoading() // 显示
					if(res.data.code===0){
						this.toastType = "ring";	
						this.toastTitle = "保存成功";
						this.$refs.toast.showLoading() // 显示
						getApp().globalData.subjectFlag = 1;//做个标记 让首页课程表刷新
						setTimeout(res => {
							uni.navigateBack();
						},1500)
					}else{
						this.toastType = "error";
						this.toastTitle = "请求错误";
						this.$refs.toast.showLoading() // 显示
					}
				})
			},
			// 获取科目  
			getClassCard(){
				let data = {
					showSystemDefault :true
				}
				this.myRequest("gmt/api/gmtChild/gmtClassCard/selectData",{data}).then(res => {
					if(res.data.code===0){
						// 不能直接用this.customSet2.itemArray[0] = res.data.data;修改
						res.data.data.push({name:"无",id:-1})
						this.$set(this.customSet2,"itemArray",[res.data.data])//获取系统有什么科目
					}
				})
			},
			// 获取周几这个孩子已经设置的科目
			getWeekClass(){
				let data = {
					childId :this.id,
					weekIndex:this.weekNum
				}
				//
				 this.classList = [{classIndex:1,classCardId:-1,classCardName:""},
							{classIndex:2,classCardId:-1,classCardName:""},
							{classIndex:3,classCardId:-1,classCardName:""},
							{classIndex:4,classCardId:-1,classCardName:""},
							{classIndex:5,classCardId:-1,classCardName:""},
							{classIndex:6,classCardId:-1,classCardName:""},
							{classIndex:7,classCardId:-1,classCardName:""},
							{classIndex:8,classCardId:-1,classCardName:""},
							];
				// 
				this.$refs.loading.showLoading() // 显示
				this.myRequest('gmt/api/gmtChild/gmtChildClassCard/getGroupInfo',{data}).then(res => {
					this.$refs.loading.hideLoading() // 
					if(res.data.code===0){
						let classes = res.data.data;
						this.classList.forEach((item,key) => {
							for(var i in classes) { //遍历获取到的已存科目
								if(item.classIndex === classes[i].classIndex){  //获取第几节课的内容
									if(!classes[i].classCardName){     //防止classname为null
										classes[i].classCardName="";
									} 
									this.$set(this.classList,key,classes[i])//需要课程id和classIndex第几节课
								}
							}
						})
 
					}else{
						this.toastType = "error";
						this.toastTitle = "请求错误";
						this.$refs.toast.showLoading() // 显示
					}
					
				})
			}
		},
		onShow() {
			this.getClassCard();
			this.getWeekClass();
		},
		onLoad(query){
			this.id  = query.id;
			this.getWeekClass();
			
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	page{
		background: #fff;
	}

	#edit-table{
		padding: 20upx 76upx;
		.cut-line{
			position: relative;
			border-bottom: 2upx dashed #999;
			margin-bottom: 30upx;
			margin-left: 120upx;
		}
		.cut-line::before{
			content: "上午";
			position: absolute;
			top: 50%;
			left: -60upx;
			transform: translate(0,-50%);
			font-size: 24upx;
			color: #999;
		}
		.cut-line2{
			position: relative;
			border-bottom: 2upx dashed #999;
			margin-bottom: 30upx;
			margin-left: 120upx;
		}
		.cut-line2::before{
			content: "下午";
			position: absolute;
			top: 50%;
			left: -60upx;
			transform: translate(0,-50%);
			font-size: 24upx;
			color: #999;
		}
		.edit-item{
			font-size: 28upx;
			margin-bottom: 30upx;
			.title{
				width: 96upx;
				text-align: right;
				letter-spacing: 2upx;
				font-weight: bold;
			}
			.sel-input{
				position: relative;
				width: 488upx;
				height: 74upx;
				box-sizing: border-box;
				border:2upx solid #ebebeb;
				border-radius: 36upx;
				line-height: 74upx;
				padding: 0 50upx 0 30upx;
				color: #666;
			}
			.sel-input::after{
				content: "";
				position: absolute;
				top: 50%;
				transform: translate(0,-50%);
				right: 26upx;
				background: url(../../static/images/face-right-9.png);
				width: 32upx;
				height: 32upx;
				background-size: cover;
				
			}
		}
		
	}
	.btns{
		width: 650upx;
		margin: 0 auto;
		.white-btn{
			width: 310upx;
			height: 96upx;
			line-height: 96upx;
			text-align: center;
			border: 1px solid @mainColor;
			border-radius: 48upx;
			box-sizing: border-box;
			font-size: 32upx;
			letter-spacing: 2upx;
			color: @mainColor;
		}
		.main-btn{
			width: 310upx;
			height: 96upx;
			line-height: 96upx;
			text-align: center;
			border-radius: 48upx;
			box-sizing: border-box;
			font-size: 32upx;
			letter-spacing: 2upx;
			color: #fff;
			background: linear-gradient(left,rgb(255,169,41),rgb(255,131,31));
			box-shadow: 0 3upx 16upx 0upx rgb(255,155,31);
		}
	}

</style>
