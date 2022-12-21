<template>
	
		<view class="cart-container" v-if="cart.length!==0">
			<!-- 收货地址组件 -->
			<my-address></my-address>
			<!-- 购物车商品列表的标题区域 -->
			<view class="cart-title">
				<!-- 左侧图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 描述文字 -->
				<text class="cart-title-text">购物车</text>
			</view>
			<!-- 商品列表区域 -->
			<!-- uni-swipe-action最外层包裹容器，滑动删除效果 -->
			<uni-swipe-action>
				<block v-for="(goods,i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swiperClickActionHandler(goods)">
						<my-goods :goods="goods" :showRadio="true" :showNum="true" @num-change="NumberChangeHandler"
							@radio-change="radioChangeHandler"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<my-settle></my-settle>
		</view>
		<view class="empty-cart" v-else>
			<image src="../../static/461c60e9ec8ed310613e0c118e244609.jpeg" class="empty-img" mode=""></image>
			<text class="tip-text">这里啥也没有</text>
		</view>

</template>

<script>
	// 导入封装的mixins
	import badgeMix from '@/mixins/tabber-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		// 导入当前页面使用
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'delGoodsById']),
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			NumberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			swiperClickActionHandler(goods) {
				// console.log(goods.goods_id)
				this.delGoodsById(goods)
			}
		}

	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
	.empty-cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		.empty-img{
			width: 90px;
			height: 90px;
		}
	}
</style>
