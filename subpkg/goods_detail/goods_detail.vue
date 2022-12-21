<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image @click="preview(i)" :src="item.pics_big" mode=""></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">{{goods_info.goods_price}}</view>
			<!-- 信息主体 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递，免运费--{{cart.length}}</view>
		</view>
		<!-- 商品详情信息，使用rich-text组件渲染HTML标签 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品导航 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		watch:{
			total:{
			handler(newVal){
				const findResult = this.options.find((x)=>x.text==='购物车')
				if(findResult){
					findResult.info = newVal
				}
			}	,
			// 申明侦听,直接调用
			immediate:true
			}
		},
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart',['total'])
		},
		data() {
			return {
				// 商品信息对象
				goods_info: {},
				// 左侧按钮配置对象
				options: [{
					icon: 'shop',
					text: '商店'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 右侧按钮配置对象
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				}, {
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]

			};
		},
		onLoad(options) {
			// 获取商品id
			const goods_id = options.goods_id
			// 调用请求商品详情的数据
			this.getGoodsDetail(goods_id)
		},
		methods: {
			// 将m_cart中addTocart方法映射的页面
			...mapMutations('m_cart', ['addToCart']),
			// 请求商品数据
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()

				// 使用replace()方法，为img标签添加行内的style,兼容IOS,将webp转换为jpg
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')

				this.goods_info = res.message
			},
			// 实现轮播图预览效果
			preview(i) {
				// 调用uni.previewImage()方法预览图片
				uni.previewImage({
					// 预览默认展示的索引
					current: 1,
					// 所有url地址的数组
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			// 导航左侧点击事件处理
			onClick(e) {
				if (e.content.text === '购物车') {
					// 切换到购物车页面
					uni.switchTab({
						url: '../../pages/cart/cart'
					})
				}
			},
			// 右侧按钮事件处理
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					// 组织商品信息
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					// 调用addToCart方法
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 50px;
	}

	swiper {
		height: 700px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #C00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
