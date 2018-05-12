const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MiniHTMLWebpackPlugin = require('mini-html-webpack-plugin')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { ServerStyleSheet } = require('styled-components')
const log = require('electron-log')

const babel = {
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react',
  ].map(require.resolve)
}

const babelLoader = require.resolve('babel-loader')

const template = ({
  js,
  publicPath,
  html = 'Hello',
  css = '',
  title = 'Iso Demo',
}) => `<!DOCTYPE html>
<head>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;margin:0}</style>
${css}
<title>${title}</title>
</head>
<div id='root'>${html}</div>
${MiniHTMLWebpackPlugin.generateJSReferences(js, publicPath)}
`

const buildHTML = async (opts = {}, baseConfig) => {
  const config = Object.assign({}, baseConfig, {
    mode: 'development',
    output: {
      path: opts.outDir,
      filename: 'App.js',
      libraryExport: 'default',
      libraryTarget: 'umd'
    },
    target: 'electron-main',
    plugins: [
      new webpack.DefinePlugin({
        CONFIG: JSON.stringify(opts.configPath),
        FILENAME: JSON.stringify(
          path.join(opts.dirname, opts.filename)
        )
      })
    ]
  })
  const compiler = webpack(config)

  const styledComponents = opts.store && opts.store.styledComponents

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        log.error(err)
        reject(err)
        return
      }
      const sheet = new ServerStyleSheet()
      const appPath = path.join(opts.outDir, './App.js')
      const App = require(appPath)
      const html = renderToString(
        sheet.collectStyles(
          React.createElement(App, opts)
        )
      )
      const css = styledComponents ? sheet.getStyleTags().replace(/\n/g, '').trim() : ''
      removeFile(appPath)
      resolve({
        html,
        css
      })
    })
  })
}

const removeFile = filename => {
  fs.unlink(filename, err => {
    if (err) log.error(err)
  })
}

// todo
// const getWebfontLink =

module.exports = async opts => {
  const userConfig = require(opts.configPath) || {}

  const config = {
    entry: path.join(__dirname, './ExportApp.js'),
    output: {
      path: opts.outDir,
      filename: 'bundle.js'
    },
    resolve: {
      modules: [
        opts.dirname,
        path.join(opts.dirname, 'node_modules'),
        path.join(__dirname, '../node_modules'),
        'node_modules',
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: babelLoader,
            options: babel
          }
        },
        {
          test: /\.js$/,
          exclude: path.resolve(__dirname, '../node_modules'),
          include: path.resolve(__dirname),
          use: {
            loader: babelLoader,
            options: babel
          }
        },
        {
          test: /\.jsx$/,
          use: [
            {
              loader: babelLoader,
              options: babel
            },
            {
              loader: require.resolve(
                path.join(__dirname, './scope-loader')
              ),
              options: {
                config: opts.configPath,
                components: userConfig.components
              }
            },
            require.resolve(
              path.join(__dirname, './jsx-loader')
            )
          ]
        }
      ]
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        },
        CONFIG: JSON.stringify(opts.configPath),
        FILENAME: JSON.stringify(
          path.join(opts.dirname, opts.filename)
        )
      }),
    ]
  }

  const { html, css } = await buildHTML(opts, config)

  const bundleConfig = Object.assign({}, config, {
    mode: 'production',
    output: {
      path: opts.outDir,
      filename: 'bundle.js'
    }
  })

  bundleConfig.plugins.push(
    new MiniHTMLWebpackPlugin({
      context: Object.assign({}, opts, {
        html,
        css
      }),
      template
    })
  )

  const compiler = webpack(bundleConfig)

  return new Promise((resolve, reject) => {
    compiler.run(async (err, stats) => {
      if (err) reject(err)
      resolve(stats)
    })
  })
}

