const Dotenv = require("dotenv-webpack");
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withCss(withSass({
	webpack: (config, { isServer }) => {
		config.plugins.push(new Dotenv({ silent: true }));
		if (!isServer) {
			config.node = {
				fs: 'empty'
			}
		}
		config.module.rules.push({
			test: /\.(png|jpe?g|gif|jp2|webp|svg)$/,
			loader: 'file-loader',
			options: {
				name: 'static/images/[name].[ext]'
			}
		})

		return config
	},
	env: {
		TWITCH_ACCESS_TOKEN_URL: process.env.TWITCH_ACCESS_TOKEN_URL,
		TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
		TWITCH_SECRET_ID: process.env.TWITCH_SECRET_ID,
		IGDB_COVER_URL: process.env.IGDB_COVER_URL,
	},
}));





