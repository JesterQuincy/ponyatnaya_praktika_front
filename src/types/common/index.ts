export enum EClientType {
  ADULT = 'Взрослый',
  CHILD = 'Ребенок',
  COUPLE = 'Пара',
}

/** Возвращает все ключи вложенных объектов */
export type NestedKeys<T> = T extends object
  ? { [K in keyof T]: K extends string | number ? `${K}` | `${K}.${NestedKeys<T[K]>}` : never }[keyof T]
  : never

/** Позволяет делать опциональные вложенные объекты */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
