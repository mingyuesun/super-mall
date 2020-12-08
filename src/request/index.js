import axios from 'axios'

export function request(config){
	// 1. 创建 axios 实例
	const instance = axios.create({
		// todo: 获取最新的接口地址
		baseURL: 'http://123.207.32.32:8000',
		timeout: 5000
	})

	// 2. axios 的拦截器
	// 2.1 请求拦截的作用
	instance.interceptors.request.use(config => {
		return config
	}, err => {
		console.log(err)
	})

	// 2.2 响应拦截
	instance.interceptors.response.use(res => {
		return res.data
	}, err => {
		console.log(err)
	})

	// 3. 发送真正的网络请求
	return instance(config)
}