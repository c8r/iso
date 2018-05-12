// filesystem utils
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import findUp from 'find-up'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

export const getFiles = async ({ dirname }) => {
  const filenames = await readdir(dirname)
  const files = filenames.map(filename => {
    const pathname = path.join(dirname, filename)
    const stats = fs.statSync(pathname)
    const ext = path.extname(filename)
    return {
      filename,
      pathname,
      ext,
      isDirectory: stats.isDirectory()
    }
  })
    .filter(file => file.isDirectory || /\.(jsx|json)$/.test(file.ext))

  return files
}

export const getFile = async ({ dirname, filename }) => {
  const code = await readFile(
    path.join(dirname, filename),
    'utf8'
  )
  return code
}

export const getConfig = async ({ dirname }) => {
  const filepath = await findUp('iso.config.js', { cwd: dirname })
  if (!filepath) {
    return null
  }

  delete require.cache[require.resolve(filepath)]

  try {
    const req = require.resolve(filepath, {
      paths: [
        ...require.resolve.paths(filepath),
        path.join(dirname, './node_modules')
      ]
    })
    const config = require(req).default || require(req)
    return {
      ...config,
      configPath: filepath
    }
  } catch (e) {
    return null
  }
}
