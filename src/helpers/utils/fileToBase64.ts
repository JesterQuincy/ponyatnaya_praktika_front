/** Функция для преобразования файла в Base64 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string) // Base64 строка
    reader.onerror = (error) => reject(error)
  })
}
