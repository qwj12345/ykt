<template>
	<view id="time-table">
		<view class="time-table">
			<!-- 左边序号 -->
			<view class="number">
				<view class="number-item"></view>
				<view class="number-item" v-for="(item,key) in numberList" :key="key">{{item}}</view>
			</view>
			<!-- 表格内容 -->
			<view class="table" v-for="(item,key) in list" :key="key">
				<view class="table-item">{{weeks[key]}}</view>
				<!-- :class="key===4&&index===7?'borderRadius30 table-item':'table-item'"为了右下角最后一个有边框显示 -->
				<view  v-for="(value,index) in item" :key="index" class="table-item" :class="{'borderRN':key===4,'borderBN':index===7}">
					<!-- 需要把undefined转为空显示 -->
					{{timetable[(key+1)+"_"+(index+1)].classCardName?timetable[(key+1)+"_"+(index+1)].classCardName:""}}
				</view>
			</view>
		</view>
		<!--  -->
		<view class="tag">*前四节为上午，后四节为下午</view>
		<!-- 按钮 -->
		<view class="fix-btn" >
			<navigator :url="'/pages/editTable/editTable?id='+id" open-type="navigate"  class="bootom-l-btn" style="margin: 0;">
				编辑课表
			</navigator>
		</view>
		<!-- 提示框 -->
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	import {myRequest} from "../../common/common.js"
	export default {
		data() {
			return {
				weeks:["周一","周二","周三","周四","周五"],
				numberList:[1,2,3,4,5,6,7,8],
				list:[[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8]],
				timetable:[],
				toastTitle:"出错啦",
				toastType:"error",
				id:""
			}
		},
		onShow() {
			let data = {
				childId :this.id
			}
			myRequest('gmt/api/gmtChild/gmtChildClassCard/getGroupInfo',{data}).then(res => {
				if(res.data.code===0){
					this.timetable = res.data.data;
					console.log(this.timetable)
				}else{
					this.toastType = "error";
					this.toastTitle = "请求错误";
					this.$refs.toast.showLoading() // 显示
				}
				
			})
		},
		onLoad(query) {
			this.id = query.id;
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	.border{
		border-right: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
		text-align: center;
	}
	.borderRN{
		border-right: none !important;
	}
	.borderBN{
		border-bottom: none !important;
	}
	page{
		background: rgb(251,251,251);
	}
	#time-table{
		padding: 16upx 20upx;
		.tag{
			font-size: 22upx;
			color: #bbb;
			margin-top: 18upx;
		}
		.time-table{
			border-radius: 30upx;
			overflow: hidden;
			display: flex;
			color: #333;
			font-size: 24upx;
			box-shadow: 0 12upx 24upx 0upx #ebebeb;
			.number{
				display: flex;
				flex-direction: column;
				view{
					width: 70upx;
					.border();
					background-color: rgb(237,239,244);
					height: 90upx;
					text-align: center;
					line-height: 90upx;
					box-sizing: border-box;
				}
				view:first-child {
					height: 70upx;
					line-height: 70upx;
				}
			}
			.table{
				display: flex;
				flex-direction: column;
				.table-item{
					.border();
					width: 128upx;
					height: 90upx;
					line-height: 90upx;
					box-sizing: border-box;
					background: #fff;
				}
				.table-item:first-child {
					height: 70upx;
					line-height: 70upx;
					background-color: rgb(237,239,244);
				}
			}

		}
	}
</style>
