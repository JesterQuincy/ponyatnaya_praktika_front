import PollActionsPanel from '@/components/poll/PollActionsPanel'
import { PollForm } from '@/components/poll/pollForm'
import TestActionsPanel from '@/components/test/PollActionsPanel'
import { TestForm } from '@/components/test/pollForm'
import { AssessmentType, ComponentMapping } from '../types/tests'

// Маппинг типов на компоненты
export const componentMap: Record<AssessmentType, ComponentMapping> = {
  test: {
    Form: TestForm,
    ActionsPanel: TestActionsPanel,
  },
  survey: {
    Form: PollForm,
    ActionsPanel: PollActionsPanel,
  },
  form: {
    Form: () => <p>Форма не реализована</p>,
    ActionsPanel: () => <p>Панель действий не реализована</p>,
  },
}
