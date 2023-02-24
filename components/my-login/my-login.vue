<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<!-- @getuserinfo,获取用户的基本信息 -->
		<button type="primary"  class="btn-login" open-type="getUserInfo" getUserInfo="getUserInfo">一键登录</button>
		<!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			// 获取微信用户的基本信息
			getUserInfo(e){
				// console.log(e)
				// 判断是否获取用户信息成功
				// if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.showMsg('您取消了登录授权！')
				// // 获取用户信息成功，e.detail.errMsg就是用户的基本信息
				// console.log(e)
				uni.login({
				    provider: 'weixin',
				    success: function (loginRes) {
				        // 登录成功
				        uni.getUserInfo({
				            provider: 'weixin',
				            success: function(info) {
				                // 获取用户信息成功, info.authResult保存用户信息
				            }
				        })
				    },
				    fail: function (err) {
				        // 登录授权失败  
				        // err.code是错误码
						console.log(err)
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	&::after{
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>