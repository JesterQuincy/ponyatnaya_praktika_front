import { IMeetingSchema } from '@/models/meetSchema'

export const meetData: { name: keyof IMeetingSchema; label: string }[] = [
  {
    name: 'clientSessionRequest',
    label: 'Запрос на сессию со стороны клиента',
  },
  {
    name: 'therapistStateAtSessionStart',
    label: 'Состояние терапевта в начале сессии',
  },
  {
    name: 'mainTopicsDiscussedDuringSession',
    label: 'Основные темы, затронутые в ходе сеанса',
  },
  {
    name: 'clientKeyPhrasesInsights',
    label: 'Значимые фразы, инсайты клиента',
  },
  {
    name: 'clientMainEmotions',
    label: 'Основные эмоции клиента',
  },
  {
    name: 'therapistMainEmotionsExpressed',
    label: 'Основные проявленные эмоции терапевта',
  },
  {
    name: 'techniquesAndMethodsUsed',
    label: 'Применяемые техники и методы',
  },
  {
    name: 'clientMainObstaclesMethods',
    label: 'Основные препятствия и способы сопротивления процессу со стороны клиента',
  },
]
