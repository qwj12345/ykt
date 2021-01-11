<template>
	<view class="wyb-loading-box" @tap.stop.prevent @touchmove.stop.prevent>
		<wyb-popup 
		 ref="popup"
		 type="center"
		 :width="width"
		 :height="height"
		 :radius="radius"
		 :z-index="zIndex"
		 :center-anim="animation"
		 :bg-color="bgColor"
		 :duration="duration"
		 :mask-click-close="false"
		 :mask-alpha="maskAlpha"
		 :slide-multi="0.15"
		 @show="onPopupShow"
		 @hide="onPopupHide">
			
			<view :class="type === 'square' ? 'wyb-loading-content' : 'wyb-loading-content-h'">
				<view v-if="loadingType !== 'none'" :class="type === 'square' ? 'wyb-loading-anim' : 'wyb-loading-anim-h'">
					<view v-if="loadingType === 'ring'" class="right" :style="{
						 width: type === 'square' ? '80rpx' : '50rpx',
						 height: type === 'square' ? '80rpx' : '50rpx'}" >
					</view>
					<view v-if="loadingType === 'error'" class="error" :style="{
						 width: type === 'square' ? '80rpx' : '50rpx',
						 height: type === 'square' ? '80rpx' : '50rpx'}">
					</view>
				</view>
				<view :class="type === 'square' ? 'wyb-loading-title' : 'wyb-loading-title-h'" :style="{
					paddingLeft: type === 'rectangle' && loadingType === 'scale-line' ? '20rpx' : (type === 'rectangle' ? '40rpx' : '0'),
					color: ftColor,
					justifyContent:loadingType === 'none' ? 'center' : 'left',
					paddingLeft:loadingType === 'none' ? '0' : '20px'}">
					{{title}}
				</view>
			</view>
			
		</wyb-popup>
	</view>
</template>

<script>
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	export default {
		components: {
			wybPopup
		},
		computed: {
			loadingColor() {
				let color = this.ftColor.slice()
				let rgbList = this.hexToRgb(color)
				let top = 'rgba(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ', 0.3)'
				let bottom = 'rgba(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ', 0.3)'
				let right = 'rgba(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ', 0.3)'
				let left = 'rgb(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ')'
				return {
					top,
					bottom,
					right,
					left
				}
			},
			width() {
				if (this.type === 'square') {
					return '300'
				} else if (this.type === 'rectangle') {
					return '500'
				}
			},
			height() {
				if (this.type === 'square') {
					return '300'
				} else if (this.type === 'rectangle') {
					return '150'
				}
			}
		},
		props: {
			title: {
				type: String,
				default: '请稍后'
			},
			type: {
				type: String,
				default: 'square'
			},
			radius: {
				type: [String, Number],
				default: '8'
			},
			zIndex: {
				type: [String, Number],
				default: '10076'
			},
			maskAlpha: {
				type: Number,
				default: 0.2
			},
			animation: {
				type: String,
				default: 'fade'
			},
			bgColor: {
				type: String,
				default: '#494949'
			},
			ftColor: {
				type: String,
				default: '#fff'
			},
			duration: {
				type: Number,
				default: 250
			},
			loadingType: {
				type: String,
				default: 'ring'
			},
			hideDelay: {
				type: Number,
				default: 1500
			}
		},
		methods: {
			showLoading() {
				this.$refs.popup.show()
				setTimeout(() => {
					this.$refs.popup.hide()
				}, 1500)
			},
			hideLoading() {
				setTimeout(() => {
					this.$refs.popup.hide()
				}, this.hideDelay)
			},
			onPopupShow() {
				this.$emit('show')
			},
			onPopupHide() {
				this.$emit('hide')
			},
			hexToRgb(color) {
				if (color.length === 4) {
					let arr = color.split('')
					color = '#' + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3]
				}
				let color16List = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)]
				let r = parseInt(color16List[0], 16)
				let g = parseInt(color16List[1], 16)
				let b = parseInt(color16List[2], 16)
				return [r, g, b]
			}
		}
	}
</script>

<style>	
	@import './loader.css';
	.right{
		background-image: url(./toast_gou.png);
		background-size: contain;
	}
	.error{
		background-image: url(./toast_err.png);
		background-size: contain;
	}
	.wyb-loading-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.wyb-loading-anim {
		flex: 1.55;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}
	
	.wyb-loading-title {
		padding-top: 30rpx;
		flex: 1;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		font-size: 35rpx;
	}
	
	.wyb-loading-content-h {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	.wyb-loading-anim-h {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
	
	.wyb-loading-title-h {
		padding-left: 40rpx;
		box-sizing: border-box;
		flex: 1.55;
		display: flex;
		justify-content: flex-start;
		font-size: 35rpx;
	}
</style>
