import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const reactPdfEntry = require.resolve('react-pdf')
const workerPath = require.resolve('pdfjs-dist/build/pdf.worker.min.mjs', {
  paths: [path.dirname(reactPdfEntry)],
})

const dst = path.resolve('public/pdf.worker.min.mjs')
fs.mkdirSync(path.dirname(dst), { recursive: true })
fs.copyFileSync(workerPath, dst)

console.log('Copied pdf.worker from:', workerPath)
