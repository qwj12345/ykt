<template>
	<view>
		<view id="info">
			<view class="item">
				<view class="title">
					<view class="icon">*</view>
					<view>姓名</view>
				</view>
				<input v-model="name" placeholder="请输入姓名" placeholder-class="placeholder"/>
			</view>
			
			<view class="item">
				<view class="title">
					<view class="icon">*</view>
					<view>性别</view>
				</view>
				<view class="sexs">
					<view class="sex marginR50" @click="changeSex"><uni-icons :type="sex===1?'circle-filled':'circle'" size="20" :color="sex===1?'#409efe':'#e0e0e0'"></uni-icons>男</view>
					<view class="sex" @click="changeSex"><uni-icons :type="sex===2?'circle-filled':'circle'" size="20" :color="sex===2?'#409efe':'#e0e0e0'"></uni-icons>女</view>
				</view>
			</view>
			
			<view class="item">
				<view class="title">
					<view class="icon">*</view>
					<view>出生日期</view>
				</view>
				<view class="block display-between-center" :style="dateText==='请选择出生日期'? 'color:#999' : 'color:#333'" @click="showDate('QS_Picekr_date',1)">
					<view>{{dateText}}</view>
					<image src="../../static/images/face-right-9.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<view class="icon">*</view>
					<view>开始日期</view>
				</view>
				<view class="block display-between-center" :style="dateText2==='请选择开始日期'? 'color:#999' : 'color:#333'" @click="showDate('QS_Picekr_date',2)">
					<view>{{dateText2}}</view>
					<image src="../../static/images/face-right-9.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<view class="icon">*</view>
					<view>结束日期</view>
				</view>
				<view class="block display-between-center" :style="dateText3==='请选择结束日期'? 'color:#999' : 'color:#333'" @click="showDate('QS_Picekr_date',3)">
					<view>{{dateText3}}</view>
					<image src="../../static/images/face-right-9.png" mode="widthFix"></image>
				</view>
			</view>
		
			
			<view class="item">
				<view class="title">
					<view class="icon">*</view>
					<view>学校</view>
				</view>
				<input v-model="school" placeholder="填写孩子就读的学校" placeholder-class="placeholder"/>
			</view>
			
			<view class="item">
				<view class="title">
					<view class="icon">*</view>
					<view>年级</view>
				</view>
				<view class="block display-between-center" :style="classText==='请选择孩子的年级'? 'color:#999' : 'color:#333'" @click="showDate('QS_Picekr_custom_1')">
					<view>{{classText}}</view>
					<image src="../../static/images/face-right-9.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="fix-btn" >
			<view class="bootom-l-btn" style="margin: 0;" @click="saveChild">
				保存
			</view>
		</view>
		<!--  -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<!-- 日期 -->
		<QSpicker  	mode="bottom"  
			type="date" 
			ref="QS_Picekr_date"
			pickerId="date_1" 
			:dataSet="dateSet" 
			showReset
			:autoHide="true"
			contentColor="#333333"
			:lineHeight=".05" :buttonSet="buttonSet"
			@confirm="confirmDate" />
			<!--  选择年级-->
		<QSpicker type="custom2" ref="QS_Picekr_custom_1" pickerId="custom_1"  :dataSet="customSet" :buttonSet="buttonSet"  @confirm="confirmClass($event)" />
	</view>
	
</template>

<script>
	import QSpicker from '@/components/QuShe-picker/QuShe-picker.vue';
	export default {
		data() {
			return {
				id:"",
				dateSet: {
					startYear:new Date().getFullYear() - 15,
					dateMode: 3,
					dateFormatArray: ['/', '/', ' ', ':', ':']
				},
				customSet:{
					itemArray: [
						[{
							"name": "一年级", //name变量名需与下方steps.steps_1_value相同
							"value": 1 //可添加多项自定义想要的数据
						}, {
							"name": "二年级",
							"value": 2
						}, {
							"name": "三年级",
							"value": 3
						}, {
							"name": "四年级",
							"value": 4
						}, {
							"name": "五年级",
							"value": 5
						}, {
							"name": "六年级",
							"value": 6
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
				dateText:"请选择出生日期",
				dateText2:"请选择开始日期",
				dateText3:"请选择结束日期",
				classText:"请选择孩子的年级",
				sex:1,
				name:"",
				height:"",
				dateType:"",
				school:"",
				grade:"",
				toastTitle:"出错啦",
				toastType:"ring"
			};
		},
		components: {
			QSpicker
		},
		methods:{
			// 选择性别
			changeSex(){
				this.sex === 1 ? this.sex = 2 : this.sex = 1;
			},
			
			// picker显示
			showDate(e,type){
				
				this.dateType = type;
			
			    this.$refs[e].show();
			},
			// 选择日期
			confirmDate(e){
				console.log(this.dateType)
				switch(this.dateType){
					case 1:
						this.dateText = e.data;
						break;
					case 2:
						this.dateText2 = e.data;
						break;
					case 3:
						this.dateText3 = e.data;
						break;
				}
			},
			// 年级
			confirmClass(e){
				// console.log(e.data[0].name)
				this.classText = e.data[0].name;
				this.grade = e.data[0].value;
			},
			
			// 保存
			saveChild(){
				if(this.grade!=="" &&this.name!==""&&this.grade!==""&&this.school!==""&&this.dateText!=="请选择出生日期"&&this.dateText3!=="请选择结束日期"){
					this.$refs.loading.showLoading(); // 显示
					let data = {
					  "openId":uni.getStorageSync('openId'),
					  "grade": this.grade,
					  "name": this.name,
					  "school": this.school,
					  "sex": this.sex,
					  "userBirthday": this.dateText,
					  "startTime":this.dateText2,
					  "endTime":this.dateText3,
					}
					// 如果有id的话就是修改
					this.id ? data.id=this.id :data = data;
					console.log(12312,data)
					this.myRequest("student/addStudent",{data,contentType:"application/json"}).then(res =>{
						console.log(res)
						this.$refs.loading.hideLoading(); // 显示
						if(res.data.code===200){
							getApp().globalData.childFlag = 1;//做个标记 让孩子列表页刷新
							getApp().globalData.homeChildFlag = 1;//做个标记 让孩子列表页刷新
							this.toastType = "ring";
							this.toastTitle = "保存成功";
							this.$refs.toast.showLoading() // 显示
							setTimeout(()=>{
								uni.switchTab({
									url:"../children/children"
								})
							},1500)
							
						}else{
							this.toastType = "error";
							this.toastTitle = "保存失败";
							this.$refs.toast.showLoading() // 显示
						}
					})
				}else{
					this.toastType = "error";
					this.toastTitle = "请填写完整";
					this.$refs.toast.showLoading() // 显示
				}
			},
			// 获取儿童信息
			getInfo(){
				let data = {
					id:this.id
				}
				this.myRequest("student/findStudentDetail",{data,method:'GET'}).then(res =>{ 
					if(res.data.code===200){
						let result = res.data.data;
						this.grade = result.grade;
						this.classText = this.customSet.itemArray[0][result.grade-1].name;
					
						this.name = result.name;
					
						this.dateText = result.userBirthday;
						this.dateText2 = result.startTime;
						this.dateText3 = result.endTime;
						this.sex = parseInt(result.sex);
						this.school = result.school;
					}else{
						this.toastType = "error";
						this.toastTitle = "请求错误";
						this.$refs.toast.showLoading() // 显示
					}
				})
			}
		},
		onShow() {
			// uni.setNavigationBarTitle({
			// 　　title:"哈哈"
			// })
		},
		onLoad(query){
			this.id = query.id;
			if(this.id){
				this.getInfo()
			}
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
page{
	background: rgb(251,251,251);
}
.item-block{
	padding-bottom: 10upx;
	border-bottom: 1px solid #eaeaea;
	font-size: 28upx;
	letter-spacing: 2upx;
	padding-left: 4upx;
}
#info{
	padding: 42upx 30upx 180upx;
	.item{
		margin-bottom: 30upx;
		.title{
			display: flex;
			align-items: center;
			font-size: 28upx;
			letter-spacing: 2upx;
			font-weight: bold;
			margin-bottom: 20upx;
			.icon{
				color: red;
			}
		}
		input{
			border: none;
			background: none;
			.item-block();
			color: #333;
			position: relative;
		}
		.height{
			padding-right: 50upx;
		}
		.height::after{
			content: "cm";
			position: absolute;
			right: 0;
			bottom: 15upx;
		}
		.weight{
			padding-right: 50upx;
		}
		.weight::after{
			content: "kg";
			position: absolute;
			right: 0;
			bottom: 15upx;
		}
		.placeholder{
			color: #999;
		}
		.block{
			.item-block();
			padding-bottom: 12upx;
			color: #999;
			margin-top: 22upx;
			image{
				width: 36upx;
			}
		}
		.sexs{
			.item-block();
			color: #333;
			display: flex;
			align-items: center;
			.sex{
				display: flex;
				align-items: center;
				.uni-icons{
					margin-right: 22upx;
				}
			}
			.marginR50{
				margin-right: 50upx;
				
			}
		}
	}
}
</style>
