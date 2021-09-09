const fs = require('fs')
const pkg = require('../package.json')
const esbuild = require('esbuild')

const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
]

module.exports = {
  getCacheKey() {
    // Forces to ignore Jest cache
    return Math.random().toString()
  },

  process(content, filename) {
    esbuild.buildSync({
      target: 'node12',
      platform: 'node',
      jsxFactory: 'h',
      jsxFragment: 'h',
      bundle: true,
      outfile: 'out-jest.js',
      sourcemap: 'inline',
      loader: {
        '.js': 'jsx',
        '.css': 'text'
      },
      entryPoints: [filename],
      external
    })
    let js = fs.readFileSync(file, 'utf-8')
    fs.unlinkSync(file)
    return js
  }
}
