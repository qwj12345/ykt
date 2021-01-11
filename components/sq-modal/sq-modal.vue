<template>
	<view>
		<e-modal :visible.sync="visible">
		  <view class="modal-content">
			  <view style="text-align: center;line-height: 50rpx;">微信登录需要获取您的用户信息，请前往授权</view>
		  </view>
		  <view class="modal-btns" >
			  <view class="cancel" @click="toggle">取消</view>
			  <button open-type="getUserInfo" @getuserinfo="getUserInfo" class="confirm">授权</button>
		  </view>
		</e-modal>
		<!--  -->
		<my-toast :title="toastTitle" :loadingType="toastType" ref="toast" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<wyb-loading title="加载中" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	import {loginUser} from "../../common/common.js";
	export default {
		data() {
			return {
				toastTitle:"出错啦",
				toastType:"error",
				visible:false
			};
		},
		methods:{
			// 弹出授权框
			toggle(){
				this.visible ? this.visible = false : this.visible = true;
			},
			getUserInfo(e){
				this.$refs.loading.showLoading();
				if (e.mp.detail.rawData){
					this.toggle();
					loginUser().then(res => {
						this.$refs.loading.hideLoading();
						if(res.data.code === 200){
							this.toastTitle = "授权成功"
							this.toastType = "ring";
							this.$refs.toast.showLoading();
						}else{
							this.toastTitle = "授权失败"
							this.toastType = "error";
							this.$refs.toast.showLoading();
						}
					});
					
					this.$emit('confirm')
				  } else {  
					console.log('用户按了拒绝按钮')
				  }
			}
		}
	}
</script>

<style lang="less">
@btnH:80upx;
	.modal-content{
		padding: 32upx 40upx;
	}
	.modal-btns{
		display: flex;
		font-size: 28upx;
		letter-spacing: 2upx;
		border-top: 2upx solid #efefef;
		.cancel{
			color: #bbb;
			width: 50%;
			box-sizing: border-box;
			height: @btnH;
			line-height: @btnH;
			border-right: 2upx solid #efefef;
			text-align: center;
		}
		.confirm{
			width: 50%;
			box-sizing: border-box;
			height: @btnH;
			line-height: @btnH;
			color: rgb(244,157,26);
			text-align: center;
		}
		button{
			background: none !important;
			font-size: 28upx;
		}
		button::after {
			border: none !important;
		}
	}
</style>
