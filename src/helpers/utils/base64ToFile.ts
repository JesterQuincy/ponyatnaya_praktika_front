/** Функция для преобразования Base64 в File */
export function base64ToFile(base64String: string, fileName: string): File {
  // Разделяем метаданные и данные Base64
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
  const bstr = atob(arr[1]) // Декодируем Base64
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n) // Заполняем Uint8Array
  }

  // Создаем объект File
  return new File([u8arr], fileName, { type: mime })
}
