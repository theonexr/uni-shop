<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	// 导入封装的mixins
	import badgeMix from '@/mixins/tabber-badge.js'
	export default {
		// 导入当前页面使用
		mixins: [badgeMix],
		computed:{
			...mapState('m_user',['token']),
		},
		data() {
			return {
				
			};
		},
	}
</script>

<style lang="scss">

</style>
