<template>
	<view>
		<view class="first-title">上报信息</view>
		  <view class="must-input">
			  <view class="m-input border-bottom">
				<view class="input-title">姓名</view>
				<input v-model="name" class="input" placeholder="输入拾到者姓名"/>
			  </view>
			  <view class="m-input">
				<view class="input-title">联系电话</view>
				<input v-model="phone" class="input" placeholder="请输入常用手机号"/>
			  </view>
		  </view>
		<view class="must-input padding-bottom">
			<view class="m-input">
				<view class="input-title">留言</view>
			</view>
			<textarea v-if="showText" v-model="remark" class="textarea" placeholder="请输入留言"/>
			<view class="textarea" v-if="!showText">

			  </view>
		</view>
		<!--  -->
		<view  class="bootom-l-btn" @click="report" >
			确认提交
		</view>
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" :showCancel="false" confirmText="确认"></my-modal>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgText:"",
				toastTitle:'',
				toastType:'',
				showText:true,
				name:'',
				phone:'',
				remark:'',
				uid:'',
				reportText:'<div class="reg-text">感谢您的帮助，我们已通知失主尽快已您联系，请保持手机畅通，谢谢！</div>'
			};
		},
		methods:{
			report(){
				if(this.name===''||!(/^1[3456789]\d{9}$/.test(this.phone))){
					 this.toastType = "none";
					 this.toastTitle = "请输入姓名和正确的手机号";
					 this.$refs.toast.showLoading() // 显示
				}else{
					let data = {
						goodsCode:this.uid,
						userName :this.name,
						userPhone :this.phone,
						remark:this.remark
					}
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/miniProgram/api/goods/collect/contact',{data:data}).then(res => {
						if(res.data.status === 0){
							if(res.data.verlustanzeige){//verlustanzeige是否挂失
								this.msgText = '<div class="reg-text">非常感谢您的热心帮助<br/>我们已将失主的联系方式<br/>发送给你<navigator url="/pages/message/message"  open-type="navigate" class="colorff">点击查看</navigator></div>';
							}else{
								this.msgText = '<div class="reg-text">感谢您的帮助，我们已通知失主尽快与您联系，请保持手机畅通，谢谢！</div>';
							}
						}else if(res.data.status === 10009 || res.data.status === 10010){
							this.msgText = '<div class="reg-text">填写错误<br/>请重新填写</div>';
						}
						else if(res.data.status === 10012){
							this.msgText = '<div class="reg-text">手机号不正确</div>';
						}else{
							this.msgText = '<div class="reg-text">系统出错<br/>请稍后再试</div>';
						}
						this.$refs.loading.hideLoading() // 
						this.$refs.modal.toggleModal();
					})
				}
			},
		},
		onLoad(query){
			this.uid = query.code;
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
page{
    background: #efeff4;
}
.first-title{
    color: #999;
    font-size: 28upx;
    padding: 20upx;
}
.must-input{
    background: #fff;
    padding-left: 20upx;
    font-size: 28upx;
}
.m-input{
    display: flex;
    align-items: center;
    height: 80upx;
    line-height: 80upx;
}
.border-bottom{
    border-bottom: 2upx solid #efeff4;
}
.input-title{
    width: 160upx;
}
.input{
    color: #666;
    width: calc(100vw - 200upx);
}
.input-placeholder{
    color: #999;
}
.padding-bottom{
    padding-bottom: 40upx;
}
.textarea{
    height: 200upx;
    color: #666;
}

.reg-text{
		font-size: 28upx;
		letter-spacing: 2upx;
		text-align: center;
	}
	// 
</style>
