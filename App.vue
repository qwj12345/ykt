<script>
import {myRequest,getToken,loginUser} from "./common/common.js"
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		loginUser()
	// 	uni.login({
	// 	      success (res) {
	// 	        if (res.code) {
	// 				getApp().globalData.login = 1;
	// 				uni.getUserInfo({
	// 						success: function(e) {//用户已授权
	// 							getApp().globalData.login = 1;
	// 							  // -----------------判断是否绑定手机号------------------
	
	// 							  // ------------------------------
	// 						},
	// 						fail(err){ //用户未授权
	// 						  getApp().globalData.login = 0;
	// 						  getApp().globalData.hasAgree = false;
	// 						}
	// 				})
							
	// 			}
	// 		}
	// 	})
		
		    
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">

</style>
