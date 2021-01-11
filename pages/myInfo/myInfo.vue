<template>
	<view id="my-info">
	  <view class="s-title">
		<view class="icon">
		  <img  src="/static/images/address-user2.png"/>
		</view>
		<view class="title-text">
		  个人资料
		</view>
	  </view>
	  <!--  -->
	  <view class="form">
		<view class="form-item">
		  <view class="form-title">
			<text v-if="!hasEdit" class="colorRed">*</text> 姓名
		  </view>
		  <input placeholder="请输入姓名" v-model="name"  class="input" :disabled="hasEdit"/>
		</view>
		<view class="form-item">
		  <view class="form-title">
			<text v-if="!hasEdit" class="colorRed">*</text> 关系
		  </view>
		  <input placeholder="请选择关系" v-model="relase" class="input marginR10" disabled='true' @click="showDate('QS_Picekr_custom_2')"/>
		  <view  v-if="!hasEdit" class="face-right" @click="showDate('QS_Picekr_custom_2')">
			<img src="/static/images/face-right-9.png"/>
		  </view>
		</view>
		<view class="form-item">
		  <view class="form-title">
			<text v-if="!hasEdit" class="colorRed">*</text> 性别
		  </view>
		  <input placeholder="请选择性别" v-model="gender" class="input marginR10" disabled='true' @click="showDate('QS_Picekr_custom_1')"/>
		  <view  v-if="!hasEdit" class="face-right" @click="showDate('QS_Picekr_custom_1')">
			<img src="/static/images/face-right-9.png"/>
		  </view>
		</view>
		<view class="form-item">
		  <view class="form-title">
			<text v-if="!hasEdit" class="colorRed">*</text> 生日
		  </view>
		  <input placeholder="生日仅可填写一次，不支持修改"  class="input marginR10" v-model="birthday" disabled='true' @click="showDate('QS_Picekr_date')"/>
		  <view  v-if="!hasEdit" class="face-right"  @click="showDate('QS_Picekr_date')">
			<img src="/static/images/face-right-9.png"/>
		  </view>
		</view>
		<view class="form-item">
		  <view class="form-title">
			<text v-if="!hasEdit" class="colorRed">*</text> 手机号
		  </view>
		  <input placeholder="请输入手机号" v-model="phone" class="input" :disabled="hasEdit"/>
		</view>
	  </view>
	  <!--  -->
	  <view class="s-title">
		<view class="icon">
		  <img  src="/static/images/address-user.png"/>
		</view>
		<view class="title-text">
		  地址
		</view>
	  </view>
	  <!--  -->
	  <view class="form">
		<view class="form-item">
		  <view class="form-title">
			<text v-if="!hasEdit" class="colorRed">*</text> 选择地区
		  </view>
		  <input placeholder="地区信息" class="input marginR10" v-model="area" disabled='true' @click="showDate('QS_Picekr_city')"/>
		  <view v-if="!hasEdit" class="face-right" @click="showDate('QS_Picekr_city')">
			<img src="/static/images/face-right-9.png"/>
		  </view>
		</view>
		<view class="form-item-textarea">
		  <view class="form-title">
			详细地址
		  </view>
		  <textarea v-if="!showTextArea" placeholder="街道门牌信息" v-model="areaDetail" class="textarea" :disabled="hasEdit"/>
		  <view class="textarea" v-if="showTextArea">

		  </view>
		</view>
		<view class="form-item">
		  <view class="form-title">
			邮编
		  </view>
		  <input  class="input" v-model="postal" :disabled="hasEdit"/>
		</view>
	  </view>
	  <!-- 按钮 -->
	  <view class="fix-btn" >
	  	<view class="bootom-l-btn" style="margin: 0;" @click="userInfoBtn">
	  		{{btnText}}
	  	</view>
	  </view>
	  <!-- 日期 -->
	  <QSpicker	mode="bottom"  @hideQSPicker="hidePicker"
	  	type="date" 
	  	ref="QS_Picekr_date"
	  	pickerId="date_1" 
	  	:dataSet="dateSet" 
	  	showReset
	  	:autoHide="true"
	  	contentColor="#333333"
	  	:lineHeight=".05" :buttonSet="buttonSet"
	  	@confirm="confirmDate" />
	  	<!--  选择性别-->
	  <QSpicker type="custom2" ref="QS_Picekr_custom_1" pickerId="custom_1"  @hideQSPicker="hidePicker" :dataSet="customSet" :buttonSet="buttonSet"  @confirm="confirmSex($event)" />
	  <!--  选择关系-->
	  <QSpicker type="custom2" ref="QS_Picekr_custom_2" pickerId="custom_2"  @hideQSPicker="hidePicker" :dataSet="customSet2" :buttonSet="buttonSet"  @confirm="confirmRelase($event)" />
	  <!-- 选择地区 -->
	  <QSpicker type="city" ref="QS_Picekr_city" mode="bottom" pickerId="city_1"  @hideQSPicker="hidePicker" :dataSet="citySet" :buttonSet="buttonSet"   @confirm="confirmArea($event)" />
<!-- 提示框 -->
		  <wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		  <my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		 
	</view>
</template>
<script src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/area-88ce82d6-c71e-4a10-8f42-1564925c98f7.js"></script>
<script>
	import QSpicker from '@/components/QuShe-picker/QuShe-picker.vue';
	export default {
		data() {
			return {
			  toastTitle:"出错啦",
			  toastType:"error",
			  showTextArea:false,
			  name:'',
			  relase:'',
			  phone:'',
			  gender:'',
			  area:'',
			  areaDetail:'',
			  postal:'',
			  hasEdit:false,
			  birthday:'',
			  btnText:'编辑',
			  firstEditBir:false,
			  msgText:'',
			  // 
			  citySet: {
			  	defaultValue: [0, 0, 0]
			  },
			  dateSet: {
			  	startYear:new Date().getFullYear() - 40,
			  	dateMode: 3,
			  	dateFormatArray: ['/', '/', ' ', ':', ':']
			  },
			  customSet:{
			  	itemArray: [
			  		[{
			  			"name": "男", //name变量名需与下方steps.steps_1_value相同
			  			"value": 1 //可添加多项自定义想要的数据
			  		}, {
			  			"name": "女",
			  			"value": 2
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
			  			"name": "父亲", //name变量名需与下方steps.steps_1_value相同
			  			"value": 1 //可添加多项自定义想要的数据
			  		}, {
			  			"name": "母亲",
			  			"value": 2
			  		}],	
			  	],
			  	defaultValue: [0, 0], //初始数据
			  	steps: {
			  		step_1_value: "name"
			  	}
			  },
			  buttonSet:{
			  	confirmColor:"rgb(244,157,26)"
			  },
			};
		},
		components: {
			QSpicker,
		},
		methods:{
			// 隐藏
			hidePicker(){
				this.showTextArea = false;
			},
			// picker显示
			showDate(e){
				// 不是第一次保存时不能再修改出生日期
				if(!this.firstEditBir && e==="QS_Picekr_date" && !this.hasEdit){
					this.toastType = "none";
					this.toastTitle = "您的生日只能编辑一次";
					this.$refs.toast.showLoading() // 显示
				}else{
					if(!this.hasEdit){
						this.$refs[e].show();
						this.showTextArea = true;
					}
				}
			},
			// 选择日期
			confirmDate(e){
				this.birthday = e.data;
			},
			// 性别
			confirmSex(e){
				// console.log(e.data[0].name)
				this.gender = e.data[0].name;
			},
			// 关系
			confirmRelase(e){
				this.relase = e.data[0].name;
			},
			// 地区
			confirmArea(e){
				this.area = e.data.label;
			},
			userInfoBtn(){
			  if(this.hasEdit){
				this.hasEdit = false;
				this.btnText = '确认提交';
			  }else{         
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					this.toastType = "none";
					this.toastTitle = "请输入正确手机号";
					this.$refs.toast.showLoading() // 显示
				}else{
				  let data = {
					name:this.name,
					userBirthday:this.birthday,
					relation:this.relase==='父亲'?1:2,
					sex:this.gender==='男'?1:0,
					userPhone:this.phone,
					userAddress:this.area,
					userAddressInfo:this.areaDetail,
					zipCode:this.postal
				  }
				  this.$refs.loading.showLoading() // 显示
				  this.myRequest('miniProgram/api/user/info/update',{data:data}).then(res => {
					  this.$refs.loading.hideLoading() 
					if(res.data.status === 0){
					  this.$store.dispatch("changeIntegralAction",res.data.data.gmtIntegralNum);
					  this.hasEdit = true;
					  this.firstEditBir = false;
					  this.btnText = '编辑';
					  this.toastType = "ring";
					  this.toastTitle = "修改成功";
					  this.$refs.toast.showLoading() // 显示
					}else if(res.data.status === 10010){
						this.toastType = "none";
						this.toastTitle = "请输入完整";
						this.$refs.toast.showLoading() // 显示
					}else{
						this.toastType = "none";
						this.toastTitle = "系统出错，请稍后再试";
						this.$refs.toast.showLoading() // 显示
					}
				  })
				}
		
			  }
			}
		},
		  onLoad(){
			this.myRequest('/miniProgram/api/user/info').then(res => {
			  let userInfo = res.data.data;
			  if(userInfo.sex === 1) {
				this.gender = '男';
			  }else if(userInfo.sex === 2){
				this.gender = '女';
			  }else{
				this.gender = '未知';
			  }
			  if(userInfo.relation === 1) {
			  	this.relase = '父亲';
			  }else if(userInfo.sex === 2){
			  	this.relase = '母亲';
			  }else{
			  	this.relase = '';
			  }
			  this.phone = userInfo.userPhone;
			  if(userInfo.name === '')
			  {
				this.firstEditBir = true;
				this.hasEdit = false;
				this.btnText = '确认提交';
			  } else{
				this.hasEdit = true;
				this.btnText = '编辑';
				this.name = userInfo.name;
				this.postal = userInfo.zipCode;
				this.birthday = userInfo.userBirthday;
				this.area = userInfo.userAddress;
				this.areaDetail = userInfo.userAddressInfo;
			  }
			})
		  }
	}
</script>

<style lang="less">
@import url("../../common/common.less");
#my-info{
	.s-title{
	  padding: 46upx 34upx 20upx;
	  display: flex;
	}
	.icon{
	  width: 18px;
	  height: 18px;
	  margin-right: 4px;
	}
	.title-text{
	  font-size: 28upx;
	  color: #888;
	}
	.form{
	  background: #fff;
	}
	.form-item{
	  padding: 22upx 36upx;
	  border-bottom: 2upx solid #efeff4;
	  display: flex;
	  font-size: 28upx;
	  align-items: center;
	}
	.form-item-textarea{
	  padding: 22upx 36upx;
	  border-bottom: 2upx solid #efeff4;
	  display: flex;
	  font-size: 28upx;
	}
	.form-title{
	  width: 160upx;
	}
	.input{
	  width: calc(100% - 220upx);
	}
	.marginR10{
	  margin-right: 28upx;
	}
	.face-right{
	  width: 16px;
	  height: 16px;
	}
	.textarea{
	  padding: 4upx 0 0 0;
	  width: calc(100% - 220upx);
	  height: 100upx;
	}
	.colorRed{
		color: red;
	}
}
</style>
