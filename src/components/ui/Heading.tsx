import styles from '@/styles/heading.module.css'

interface HeadingProps {
    title: string;
}


export function Heading({ title }: HeadingProps) {
    return (
        <div>
            <h1 className={styles.ContainerText}>{title}</h1>
        </div>
    )
}