export enum EClientType {
  ADULT = 'Взрослый',
  CHILD = 'Ребенок',
  COUPLE = 'Пара',
}

/** Возвращает все ключи вложенных объектов */
export type NestedKeys<T> = T extends object
  ? { [K in keyof T]: K extends string | number ? `${K}` | `${K}.${NestedKeys<T[K]>}` : never }[keyof T]
  : never

/** Уточняем тип, чтобы исключить undefined */
export type NonNullableNestedKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? T[K] extends object
          ? NonNullable<T[K]> extends never
            ? never
            : `${K}.${NonNullableNestedKeys<NonNullable<T[K]>>}` | `${K}`
          : `${K}`
        : never
    }[keyof T]
  : never

/** Позволяет делать опциональные вложенные объекты */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type TPromiseNumber = Promise<{ data: number }>

export type TResponseTypeBuilder<T> = {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export type TRequestTypeBuilder<T> = {
  params: {
    /** Количество элементов на странице */
    limit: number
    /** Номер страницы */
    offset: number
  }
  /** Тело запроса (возможно search-параметры) */
  queryBody?: T
}
