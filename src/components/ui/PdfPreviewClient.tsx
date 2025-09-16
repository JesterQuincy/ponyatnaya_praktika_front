'use client'

import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export interface PdfPreviewClientProps {
  file: string | File
  width?: number
  onClick?: () => void
}

const PdfPreviewClient: React.FC<PdfPreviewClientProps> = ({ file, width = 100, onClick }) => {
  return (
    <div className="relative overflow-hidden" style={{ width: `${width}px`, height: `${width * 1.5}px` }}>
      <Document file={file} loading="Загрузка PDF...">
        <Page pageNumber={1} width={width} />
      </Document>

      {onClick && <div className="absolute top-0 left-0 w-full h-full cursor-pointer z-10" onClick={onClick} />}
    </div>
  )
}

export default PdfPreviewClient
