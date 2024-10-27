// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'https://15f5-95-104-185-246.ngrok-free.app',
//                 changeOrigin: true,
//                 pathRewrite: { '^/api': '/api' },
//                 onProxyReq: (proxyReq, req, res) => {
//                     proxyReq.setHeader('ngrok-skip-browser-warning', '69420');
//                 },
//             },
//         },
//     },
// };