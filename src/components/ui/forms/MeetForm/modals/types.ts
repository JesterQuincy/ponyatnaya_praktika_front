export interface IState {
  method: string | number
  newMethod: string
  images: { file: File; url: string }[] // Объединенные изображения и их URL
}
