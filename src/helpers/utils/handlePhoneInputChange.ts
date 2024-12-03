/**
 * Обрабатывает ввод в поле телефона, добавляя префикс "+7" и позволяя вводить только цифры.
 *
 * - Удаляет все нечисловые символы из введённого значения.
 * - Если префикс "+7" отсутствует, добавляет его в начало строки.
 * - Ограничивает длину значения до 12 символов в формате "+7xxxxxxxxxx".
 *
 * @param {string} value - Текущее значение ввода телефона.
 * @param {(value: string) => void} onChange - Функция для обновления значения поля ввода.
 */
export function handlePhoneInputChange(value: string, onChange: (value: string) => void) {
  // Убираем все символы, кроме цифр
  const numericValue = value.replace(/\D/g, '')

  // Если пользователь удалил +7, добавляем его обратно
  const formattedValue = numericValue.startsWith('7') ? '+' + numericValue : '+7' + numericValue

  // Ограничиваем длину до 12 символов (например, +7xxxxxxxxxx)
  const finalValue = formattedValue.slice(0, 12)

  // Обновляем значение через onChange
  onChange(finalValue)
}
