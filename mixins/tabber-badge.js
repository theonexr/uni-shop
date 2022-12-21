import {
	mapGetters
} from 'vuex'

// 导出一个mixin对象
export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch:{
		// 监听total
		total(){
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		// 设置购物车徽标，调用uni.setTabBarBadge
		setBadge() {
			uni.setTabBarBadge({
				index: 2, //索引
				text: this.total + '' //text必须为字符串
			})
		}
	}
}
