# webpack-mpvue-plugin

> mpvue 资源路径解析插件

## 使用示例：

```js
const MpvuePlugin = require('webpack-mpvue-asset-plugin')
// webpack config
{
  entry: [],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  plugins: [
    new MpvuePlugin()
  ]
};
```

bug 或者交流建议等请反馈到 [mpvue/issues](https://github.com/Meituan-Dianping/mpvue/issues)。

本仓库是 fork 自 [webpack-mpvue-asset-plugin](https://github.com/mpvue/webpack-mpvue-asset-plugin) 修改而来，主要更新到支持 webpack4。

bug 或者交流建议等请反馈到 [mpvue/issues](https://github.com/Meituan-Dianping/mpvue/issues)。

## 安装

```bash
npm install webpack4-mpvue-asset-plugin --save-dev
```