import React from 'react'
import { Button } from '../ui/buttons/Button'
import { Textarea } from '../ui/textarea'

const TestActionsPanel = () => {
  return (
    <div className="flex flex-col gap-2 max-h-[500px]">
      <Button className="py-1.5 px-5 bg-taupe text-white rounded-[6px] w-[50%]">Сохранить</Button>

      <div className="mt-7">
        <h1 className="text-xl font-semibold">Заметка к материалу</h1>
        <Textarea className="border-gray rounded-[6px] max-h-[25vh] h-[15vh]" placeholder={`Введите заметку`} />
      </div>
    </div>
  )
}

export default TestActionsPanel
