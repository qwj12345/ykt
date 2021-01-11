<template>
	<view>
		<web-view v-if="showWeb" :src="url" style="height: 100vh;"></web-view>
		  <view v-if="!showWeb" v-html="articleHtml">
			  {{articleHtml}}
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				url:'',
				showWeb:true,
				articleHtml:''
			};
		},
		onShareAppMessage(res) {
			//转发时携带 shareTicket才能在回调中获取到shareTickets
			uni.showShareMenu({
				withShareTicket: true
			}) 
	
			let path = '';
			if(this.url === undefined || this.url === ''){
				path = '/pages/articledetail/main?article='+encodeURIComponent(this.articleHtml);
			}else{
				path = '/pages/articledetail/main?url='+encodeURIComponent(this.url);
			}
			// 
			let data = {
				id:this.id
			}
			// 转发任务
			this.myRequest('/miniProgram/api/notification/forwarding',{data:data}).then(res => {
				this.$store.dispatch("changeIntegralAction",res.data.totalIntegral);
			})
			return {
				path: path // 路径，传递参数到指定页面。
			}
	
		},
		onLoad(query) {
			this.url = decodeURIComponent(query.url);
			this.id = query.id;
	
			if(this.url === undefined || this.url === '' || this.url === 'undefined'){
				this.showWeb = false;
				this.articleHtml = decodeURIComponent(query.article);
			}else{
				this.showWeb = true;
			}
			let data = {
				id:query.id
			}
			// 是否阅读
			this.myRequest('/miniProgram/api/notification/reading',{data:data}).then(res => {
			})
		}
	}
</script>

<style lang="less">

</style>
