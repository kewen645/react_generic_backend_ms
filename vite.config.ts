import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import createStyleImportPlugin, { AntdResolve } from 'vite-plugin-style-import'
import path from 'path'

// antd按需引入，都需要安装less， 新版本还需要 npm i -D consola
export default defineConfig({
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	plugins: [
		react(),
		createStyleImportPlugin({
			resolves: [AntdResolve()],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import styleImport, { AntdResolve } from 'vite-plugin-style-import'
// import path from 'path'
// 需要安装less, vite-plugin-style-import版本为1.4.1

// // https://vitejs.dev/config/
// export default defineConfig({
// 	css: {
// 		preprocessorOptions: {
// 			less: {
// 				javascriptEnabled: true,
// 			},
// 		},
// 	},
// 	plugins: [
// 		react(),
// 		styleImport({
// 			resolves: [AntdResolve()],
// 		}),
// 	],
// 	resolve: {
// 		alias: {
// 			'@': path.resolve(__dirname, './src'),
// 		},
// 	},
// })
