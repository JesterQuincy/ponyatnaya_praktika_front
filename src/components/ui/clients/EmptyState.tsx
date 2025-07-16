import { FC } from 'react'

interface IEmptyStateProps {
  title?: string
  subtitle?: string
}

export const EmptyState: FC<IEmptyStateProps> = ({
  title = 'Ничего не найдено',
  subtitle = 'Попробуйте изменить фильтры или сбросить параметры поиска',
}) => {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-2">{subtitle}</p>
    </div>
  )
}
