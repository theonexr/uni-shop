<template>
	<view>
		<view class="search-box">
			<my-search  @gotoSearch="gotoSearch"></my-search>
		</view>
		<!-- 轮播 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'../../subpkg/goods_detail/goods_detail?good_id='+ item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src" mode=""></image>
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image class="floor-title" :src="item.floor_title.image_src" mode=""></image>
				<!-- 图片导航 -->
				<view class="floor-img-box" >
					<!-- 左侧图片 -->
					<navigator class="img-left-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧4小图片 -->
					<view class="img-right-box">
						<navigator class="img-right-item" :url="item2.url"  v-for="(item2,i2) in item.product_list"  :key="i2" v-if="i2!==0">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix" ></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabber-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res)
				// 请求失败
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
				uni.$showMsg('数据请求成功')
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			navClickHandler(item){
				if(item.name==="分类"){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 对数据处理
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '../../subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			gotoSearch(){
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			}

		}

	}
</script>

<style lang="scss">
	.search-box{
		// 吸顶效果
		position: sticky;
		top: 0;
		z-index: 900;
	}
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		.nav-img{	
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.floor-img-box{
		  display: flex;
		  padding-left: 10rpx;
		  .img-right-box{
			  display: flex;
			  flex-wrap: wrap;
			  justify-content: space-around;
		  }
	}
</style>
