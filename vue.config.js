module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/commom',
				'components': '@/components',
				'request': '@/request',
				'views': '@/views'
			}
		}
	}
}