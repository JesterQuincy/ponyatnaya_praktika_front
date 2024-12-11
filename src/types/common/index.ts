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

export interface IMutateResponse {
  data: number
  error: string
}

export type TPromiseNumber = Promise<{ data: number }>
