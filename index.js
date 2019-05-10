const path = require('path')
const upath = require('upath')
const relative = require('relative')

const getRelativePath = (filePath) => {
  if (!/^\.(\.)?\//.test(filePath)) {
    filePath = `./${filePath}`
  }
  return filePath
}

const chunksHandle = (chunks, compilation) => {
  const entryChunk = chunks.pop()

  entryChunk.files.forEach(filePath => {
    const assetFile = compilation.assets[filePath]
    const extname = path.extname(filePath)
    let content = assetFile.source()

    chunks.reverse().forEach(chunk => {
      chunk.files.forEach(subFile => {
        if (path.extname(subFile) === extname && assetFile) {
          let relativePath = upath.normalize(relative(filePath, subFile))

          // 百度小程序 js 引用不支持绝对路径，改为相对路径
          if (extname === '.js') {
            relativePath = getRelativePath(relativePath)
          }

          if (/^(\.wxss)|(\.ttss)|(\.acss)|(\.css)$/.test(extname)) {
            relativePath = getRelativePath(relativePath)
            content = `@import "${relativePath}";\n${content}`
          } else if (!(/^\.map$/.test(extname))) {
            content = `require("${relativePath}");\n${content}`
          }
        }
      })
      assetFile.source = () => content
    })
  })
}

const emitHandle = (compilation, callback) => {
  if(compilation.entrypoints instanceof Map) {
    compilation.entrypoints.forEach(({chunks}) => chunksHandle(chunks, compilation))
  }else {
    Object.keys(compilation.entrypoints).forEach(key => {
      const { chunks } = compilation.entrypoints[key]
      chunksHandle(chunks, compilation)
    })
  }

  callback()
}

function MpvuePlugin() {}
MpvuePlugin.prototype.apply = compiler => compiler.plugin('emit', emitHandle)

module.exports = MpvuePlugin
