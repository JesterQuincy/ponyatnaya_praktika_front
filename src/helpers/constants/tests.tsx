import PollActionsPanel from '@/components/poll/PollActionsPanel'
import { PollForm } from '@/components/poll/pollForm'
import TestActionsPanel from '@/components/test/TestActionsPanel'
import { TestForm } from '@/components/test/testForm'
import { AssessmentType, ComponentMapping } from '../types/tests'

// Маппинг типов на компоненты
export const componentMap: Record<AssessmentType, ComponentMapping> = {
  test: {
    Form: (props) => <TestForm {...props} />,
  },
  survey: {
    Form: (props) => <PollForm {...props} />,
  },
}
