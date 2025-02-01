import styles from '@/styles/heading.module.css'

interface HeadingProps {
  title: string | undefined
}

export function Heading({ title }: HeadingProps) {
  return (
    <div>
      <h1 className="text-4xl font-ebgaramond font-bold">{title}</h1>
    </div>
  )
}
