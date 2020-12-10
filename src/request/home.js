import { request } from './index'

// 获取首页推荐(轮播图)数据
export function getHomeMultidata(){
  return request({
		// url: '/home/multidata'
		url: '/Home/getHomeREC'
	})
}

export function getHomeGoods(params){
	return request({
		url: '/home/getHomeShowGoods',
		params
	})
}