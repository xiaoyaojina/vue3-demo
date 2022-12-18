import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    define: {
      'process.env': {},
    },
    base: './', //打包路径
    plugins: [
      vue(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // 配置scss
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
    // 代理
    server: {
      host: '0.0.0.0', // 服务器主机名
      port: 6464, // 端口号
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      // https: false,
      // 反向代理配置，
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_WEB_URL, // 代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace('/^api/', ''),
        },
      },
    },
    // 生产环境打包配置
    // 去除 console debugger
    build: {
      sourcemap: false,
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      chunkSizeWarningLimit: 1000, // 加大限制块的大小
      terserOptions: {
        compress: {
          // eslint-disable-next-line camelcase
          drop_console: true,
          // eslint-disable-next-line camelcase
          drop_debugger: true,
        },
      },
    },
  })
