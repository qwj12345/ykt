<template>
	<view>
		<!--  -->
		<e-modal :visible.sync="visible">
		  <view class="modal-content">
			  <view v-html="msgText"></view>
		  </view>
		  <view class="modal-btns" >
			  <view v-if="showCancel" class="cancel" @click="toggleModal">取消</view>
			  <view class="confirm" @click="confirm" :style="{width:showCancel?'50%':'100%'}">{{confirmText}}</view>
		  </view>
		</e-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible:false,
			};
		},
		props:{
			msgText:String,
			showCancel:{
				type: Boolean,
				default:true
			},
			confirmText:{
				type:String,
				default:"确认兑换"
			}
		},
		methods:{
			toggleModal(){
				this.visible ? this.visible = false : this.visible = true;
			},
			confirm(){
				this.visible = false;
				this.$emit('confirmAction');
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
	}
</style>
