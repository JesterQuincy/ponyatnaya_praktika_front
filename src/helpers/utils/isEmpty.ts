/** Проверяет, является ли значение пустым */
/** @param {any} value - Значение, которое нужно проверить (может быть любого типа данных, поэтому `any`) */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true // Проверка на null или undefined

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0 // Проверка для строк и массивов
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0 // Проверка для объектов
  }

  return false // Для всех других типов данных
}
