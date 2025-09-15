'use client'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import dynamic from 'next/dynamic'
import { PdfPreviewClientProps } from './PdfPreviewClient'

const PdfPreviewDynamic = dynamic<PdfPreviewClientProps>(() => import('./PdfPreviewClient'), { ssr: false })

const PdfPreview: React.FC<PdfPreviewClientProps> = (props) => {
  return <PdfPreviewDynamic {...props} />
}

export default PdfPreview
