type RemoveEmptyValues<T> = {
  [K in keyof T]: T[K] extends object ? RemoveEmptyValues<T[K]> : T[K]
}

export const removeEmptyValues = <T extends object>(obj: T): RemoveEmptyValues<T> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== '' && value !== null && value !== undefined) // фильтруем пустые значения
      .map(([key, value]) => [
        key,
        value && typeof value === 'object' ? removeEmptyValues(value) : value, // рекурсивный вызов для вложенных объектов
      ]),
  ) as RemoveEmptyValues<T>
}
