export const getAge = (birthDate: string | Date): number => {
  // Преобразуем дату рождения в объект Date, если она передана в виде строки
  const birthDateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate

  const today = new Date()
  let age = today.getFullYear() - birthDateObj.getFullYear()

  // Учет месяца и дня рождения
  const monthDifference = today.getMonth() - birthDateObj.getMonth()
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }

  return age
}