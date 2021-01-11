<template>
	<view class="register">
	  <view class="question" >
		  <image src="/static/images/question.png"></image>
	  </view>
	  <!-- scan -->
	  <view class="scan-code">
		  <view class="scan-img">
			  <img src="/static/images/scan.png" @click="scanCode"/>
		  </view>
		  <view>扫描产品二维码</view>
	  </view> 
	  <!--输入序列号和日期 -->
	  <view class="form">
		  <input class="input" placeholder="输入产品序列号" v-model="uid"/>
		  <view class="input-time input">
			  <view class="time-title">购买日期</view>
			  <view class="sel-time" @click="selDate" :class="{'color6':currentDate!=='选择购买日期'}">{{currentDate}}</view>
		  </view>
		  <view class="form-text">*仅注册用户需填，上报拾到物不需</view>
	  </view> 
	  <!-- 下方两个按钮 -->
	  <view class="bootom-l-btn z-btn" @click="regMethod" >注册产品</view>
	  <view class="s-btn" @click="goDetail">上报拾到物</view>
	  <!-- <a class="s-btn" href="https://www.baidu.com">正品验证</a> -->
	  <!-- 日期 -->
	  <QSpicker title=" " 	mode="bottom"  
	  	type="date" 
	  	ref="QS_Picekr_date"
	  	pickerId="date_1" 
	  	:dataSet="dateSet" 
	  	showReset
	  	:autoHide="true"
	  	contentColor="#333333"
	  	:lineHeight=".05" :buttonSet="buttonSet"
	  	@confirm="confirmDate" />
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" :showCancel="false"  @confirmAction="bindSuccess" confirmText="确认"></my-modal>
		<!-- 手机号授权 -->
		<phone-modal ref="phone"></phone-modal>
		<!-- 小程序授权 -->
		<sq-modal ref="sq" @confirm="showPhone"></sq-modal>
	</view>
</template>

<script>
	import QSpicker from '@/components/QuShe-picker/QuShe-picker.vue';
	import {myRequest} from "../../common/common.js"
	export default {
		data() {
			return {
				bindFlag:false,//为了判断是否绑定成功然后跳转到产品列表页
				msgText:"",
				uid:"",
				toastTitle:"出错啦",
				toastType:"error",
				buttonSet:{
					confirmColor:"rgb(244,157,26)"
				},
				dateSet: {
					startYear:new Date().getFullYear() - 15,
					endYear:new Date().getFullYear(),
					dateMode: 3,
					dateFormatArray: ['/', '/', ' ', ':', ':']
				},
				currentDate:"选择购买日期"
			};
		},
		components: {
			QSpicker
		},
		computed:{
			isLogin() {
			  return this.$store.state.login;
			},
		},
		methods:{
			// 
			goH5(){
				uni.navigateTo({
					url:'../h5/h5'
				})
			},
			// 授权框显示
			showPhone(){
				this.$refs.phone.toggleModal();
			},
			// 绑定成功后跳转
			bindSuccess(){
				if(this.bindFlag){
					uni.navigateTo({
						url:"/pages/bags/bags"
					})
				}
			},
			// 扫描二维码的方法 
			scanCode(){
				let that = this;
				uni.scanCode({
					success (res) {
						console.log(res)
						if(res.path!==undefined){
							that.toastType = "ring";
							that.toastTitle = "扫码成功";
							that.$refs.toast.showLoading() // 显示
							that.uid = res.path.split('=')[1];//截取产品序列号
						} else{ 
							that.toastType = "none";
							that.toastTitle = "请扫描带序列号二维码";
							that.$refs.toast.showLoading() // 显示
						}
					},
					fail(err){
						that.toastType = "error";
						that.toastTitle = "扫码失败";
						that.$refs.toast.showLoading() // 显示
						console.log('err',err)
					}
				})
			},
			// 注册
			regMethod(){
				if(this.isLogin){
					if(this.uid ==='' || this.currentDate === '选择购买日期'){
						this.toastType = "none";
						this.toastTitle = "请输入序列号和日期";
						this.$refs.toast.showLoading() // 显示
					}else{
						let data = {
							goodsCode:this.uid,
							goodsAddTime:this.currentDate
						}
						this.bindFlag = false;
						this.$refs.loading.showLoading() // 显示
						this.myRequest('/miniProgram/api/goods/binding',{data:data}).then(res => {
							if(res.data.status === 0){
								this.msgText = '<div class="reg-text3">产品注册成功，奖学金已到账<br/>恭喜您获得保修资格</div>';
							    this.$store.dispatch("changeIntegralAction",res.data.data);
								this.bindFlag = true;
							}else if(res.data.status === 1){
                                this.msgText = '<div class="reg-text3">商品已绑定<br/>请勿重复绑定</div>';
                            }else if(res.data.status === 10009){
                                this.msgText = '<div class="reg-text3">序列号不正确</div>';
                            }else{
                                this.msgText = '<div class="reg-text3">绑定失败</div>';
                            }
							this.$refs.loading.hideLoading() // 
							this.$refs.modal.toggleModal();
						})
					}
				}else{
					this.$refs.sq.toggle();
				}
			},
			// 前往上报
			goDetail(){
				if(this.isLogin){
					if(this.uid ===''){
						this.toastType = "none";
						this.toastTitle = "请输入序列号";
						this.$refs.toast.showLoading() // 显示
					}else{
						let data = {
							goodsCode:this.uid,
						}
						this.bindFlag = false;
						this.$refs.loading.showLoading() // 显示
						this.myRequest('/miniProgram/api/goods/collect',{data:data}).then(res => {
							this.$refs.loading.hideLoading() 
							if(res.data.status === 0){
								uni.navigateTo({
									url:'/pages/reportDetail/reportDetail?code='+this.uid
								})
							}else if(res.data.status === 10009){
								this.msgText = '<div class="reg-text3">不存在该序列号！</div>';
								this.$refs.modal.toggleModal();
							}
							else if(res.data.status === 10013){
								this.msgText = '<div class="reg-text3">请勿上报自己产品！</div>';
								this.$refs.modal.toggleModal();
							}
							else if(res.data.status === 10011){
								this.msgText = '<div class="reg-text3">该产品未绑定小程序<br/>请通过其他途径联系失主</div>';
								this.$refs.modal.toggleModal();
							}else{
								this.msgText = '<div class="reg-text3">系统出错<br/>请稍后再试</div>';
								this.$refs.modal.toggleModal();
							}
							
							
						})
					}
				}else{
					this.$refs.sq.toggle();
				}
			},
			// 显示日期选择框
			selDate(){
				this.$refs["QS_Picekr_date"].show();
			},
			// 选择日期
			confirmDate(e){
				this.currentDate = e.data;
			},
		},
		onLoad(query){
			this.uid = query.scene;
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	page{
		background: #fff;
	}
	.register{
		padding: 40upx 10vw 60upx;
		.question{
			position: fixed;
			top: 24upx;
			right: 40upx;
			width: 38upx;
			height: 38upx;
		}

		.scan-code{
			width: 280upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 30upx;
			color: @mainColor;
			letter-spacing: 2upx;
			margin: 0 auto;
			margin-bottom: 50px;
		}
		.scan-img{
			width: 150px;
			height: 150px;
		}
		
		.input{
			margin-top: 32upx;
			height: 84upx;
			padding: 0 36upx;
			border: 2upx solid rgb(231,231,231);
			border-radius: 42upx;
			color: #666;
			font-size: 24upx;
			box-sizing: border-box;
		}
		.input-time{
			display: flex;
			align-items: center;
		}
		.time-title{
			color: #000;
			letter-spacing: 2upx;
			padding-right: 26upx;
			text-align: center;
			height: 20px;
			line-height: 20px;
			border-right: 1px solid rgb(229,229,229);
		}
		.sel-time{
			padding-left: 20upx;
			color: #b2b2b2;
			width: calc(100% - 180upx);
		}
		.color6{
			color: #666;
		}
		.form-text{
			margin-top: 8px;
			padding-left: 10px;
			font-size: 10px;
			color: #b2b2b2;
		}
		.input-placeholder{
			color: #b2b2b2;
		}
		.z-btn{
			margin-bottom: 40upx;
			margin-top: 100upx;
		}
		.s-btn{
			box-sizing: border-box;
			border: 2upx solid @mainColor;
			color: @mainColor;
			height: 96upx;
			line-height: 96upx;
			text-align: center;
			border-radius: 48upx;
		}
	}
	.reg-text3{
		font-size: 28upx;
		letter-spacing: 2upx;
		text-align: center;
	}
</style>
