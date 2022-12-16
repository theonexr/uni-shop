<template>
	<view>
		<view v-for="(goods,i) in goodList" :key="i" @click="gotoDetail(goods)">
		  <my-goods :goods="goods"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj:{
					// 查询关键词
					query:'',
					// 商品分类id
					cid:'',
					// 页码值
					pagenum:1,
					// 每页显示多少条数据
					pagesize:10
				},
				// 商品列表的数据
				goodList:[],
				// 总数量，实现分页
				total:0,
				// 是否正在请求数据
				isloading:false
			};
		},
		onLoad(options) {
			// 将页面跳转时的参数转载到queryObj中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			// 获取商品数据
			this.getGoodsList()
		},
		// 触底事件
		onReachBottom() {
			// 判断是否有下一页数据
			if(this.queryObj.pagenum*this.queryObj.pagesize >this.total) return uni.$showMsg('数据加载完毕')
			// 判断是否在请求其它数据，如果是，则不发起额外请求
			if(this.isloading) return
			// 让页码自增
			this.queryObj.pagenum +=1
			// 重写获取列表
			this.getGoodsList()

		},
		// 下拉刷新事件
		onPullDownRefresh() {
			// 1.重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodList = []
			// 2.重新发起请求
			this.getGoodsList(()=>
				uni.stopPullDownRefresh()
			)
		},
		methods:{
			// 获取数据列表
			async getGoodsList(cb){
				// 开启节流阀
				this.isloading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// 请求成功后关闭节流阀
				this.isloading = false
				
				// 数据请求完毕，就立刻按需调用cb回调函数
				cb && cb()
				
				if(res.meta.status!==200) return uni.$showMsg()
				// 用扩展运算符连接
				this.goodList = [...this.goodList,...res.message.goods]
				// 获取总数
				this.total = res.message.total
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:'../../subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
