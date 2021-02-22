<script>
import {myRequest,getToken,loginUser} from "./common/common.js"
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		loginUser()
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">

</style>
