<template>
	<view>
		<e-modal :visible.sync="visible">
			<view class="modal">
				<!-- 左上角图标 -->
				<image class="left-icon" src="../../static/images/modal_phone_icon.png"></image>
				<!-- logo -->
				<image class="logo" src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/logo-75c44dd7-7e75-4120-9d3c-7261dfa31cb4.png"></image>
				<!--  -->
				<view class="title">登录完成即注册成功</view>
				<view class="left-content">
					<view class="text">请仔细阅读以下协议</view>
					<view class="text">如不同意相关协议内容，您可停止登录</view>
					<view class="check" @click="checkRadio">
						<radio color="rgb(244,157,26)" :checked="check" />
						<view>我已阅读并同意<text style="color: rgb(244,157,26);text-decoration: underline;" @click.stop="goDetail"> 《GMT隐私条款》</text></view>
					</view>
				</view>
				<!--  -->
				<button  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btn"   @click="agree">
					微信手机号快速登录
				</button>
				<view class="b-btn" @click="toggleModal">
					暂不授权>>
				</view>
			</view>
		</e-modal>
		<!--  -->
		<my-toast :title="toastTitle" :loadingType="toastType" ref="toast" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<wyb-loading title="加载中" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	import {getToken} from "../../common/common.js"
	export default {
		data() {
			return {
				toastTitle:"出错啦",
				toastType:"error",
				visible:false,
				check:true
			};
		},
		methods:{
			// 授权手机号后
			getPhoneNumber (e) {
				let that = this;
			  if(e.mp.detail.errMsg === 'getPhoneNumber:ok'){
				// 注册用户
				uni.login({
					success (res) {
						if (res.code) {
							let data = {
								encryptedData: e.mp.detail.encryptedData,
								iv: e.mp.detail.iv,
								code:res.code,
							}
							that.$refs.loading.showLoading();
							that.myRequest('miniProgram/api/gmt/crm/user/login',{data}).then(res => {
								uni.getUserInfo({
										success: function(e) {//用户已授权
											  // -----------------判断是否绑定手机号------------------
											  getToken(e.encryptedData,e.iv).then(res => {
												  that.$refs.loading.hideLoading();
												  if(res.data.status === 0){
													  that.toastTitle = "授权成功"
													  that.toastType = "ring";
													  that.$refs.toast.showLoading();
													  that.toggleModal();
											
													  // 获取用户信息
													  that.myRequest('miniProgram/api/user/info').then(res => {
													  	if(res.data.status===0){
													  		that.$store.dispatch('changePersonAction',res.data.data);
													  	}
													  })		
												  }else{
													that.toastTitle = "授权失败"
													that.toastType = "error";
													that.$refs.toast.showLoading();
												  }
											  })
											  // ------------------------------
										}
								})
							})
						}
					}
				})
			  }
			},
			checkRadio(){
				this.check ? this.check = false : this.check = true;
			},
			toggleModal(){
				this.visible ? this.visible = false : this.visible = true;
			},
			goDetail(){
				uni.navigateTo({
					url:'/pages/rules/rules?type=YS' 
				})
			},
			agree(){
				console.log(123)
				if(!this.check){
					this.toastTitle = "请同意条款"
					this.toastType = "none";
					this.$refs.toast.showLoading();
				}
			}
		}
		
	}
</script>

<style scoped lang="less">
.modal{
	width: 600upx;
	border-radius: 16upx;
	background: linear-gradient(to bottom,rgb(253,236,211),rgb(255,255,255));
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	z-index: 20;
	display: flex;
	flex-direction: column;
	align-items: center;
	.left-icon{
		position: absolute;
		left: -4upx;
		top: -2upx;
		width: 180upx;
		height: 180upx;
	}
	.logo{
		width: 180upx;
		height: 180upx;
		margin-top: 80upx;
	}
	.title{
		margin-top: 30upx;
		font-size: 36upx;
		letter-spacing: 4upx;
		font-weight: bold;
	}
	.left-content{
		width: 520upx;
		margin: 140upx auto 50upx;
		.text{
			font-size: 22upx;
			color: #999;
			letter-spacing: 2upx;
		}
		.check{
			display: flex;
			align-items: center;
			font-size: 26upx;
			letter-spacing: 2upx;
			margin-top: 16upx;
			radio{
				transform: scale(0.7);
				margin-left: -8upx;
			}
		}
	}
	.btn{
		width: 380upx;
		background: linear-gradient(left,rgb(255,169,41),rgb(255,131,31));
		box-sizing: border-box;
		height: 88upx;
		border-radius: 48upx;
		color: rgba(255,255,255,0.8);
		font-size: 28upx;
		letter-spacing: 2upx;
		text-align: center;
		line-height: 88upx;
		box-shadow: 0 2upx 12upx 0upx rgb(255,155,31);
	}
	.b-btn{
		margin-top: 30upx;
		color: #b5b5b5;
		font-size: 24upx;
		letter-spacing: 2upx;
		margin-bottom: 52upx;
	}
}
</style>
