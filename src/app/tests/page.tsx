'use client'

import React, { useState } from 'react'
import { Calendar } from '@/app/calendar/Calendar'
import { Heading } from '@/components/ui/Heading'
import { Wrapper } from '@/components/wrapper'
import { ITestCardProps, TestCard } from '@/components/test-card'
import { cardData, initialSortValue } from '@/app/tests/constants'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Filters } from '@/components/layout/tests-page/Filters'
import { Panel } from '@/components/layout/tests-page/Panel'
import { CreateMaterialModal } from '@/components/layout/tests-page/CreateMaterialModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { ITestsFilter } from '@/models/testsFilterSchema'
import { createMaterialSchema, ICreateMaterial } from '@/models/createMaterialSchema'

export interface IValueLabelModel {
  value: string
  label: string
}

export interface ISort {
  type: IValueLabelModel
  date: IValueLabelModel
}

const TestsPage = () => {
  const [sort, setSort] = useState<ISort>(initialSortValue)
  const [modalOpen, setModalOpen] = useState(false)

  const handlePanelSubmit = (values: ITestsFilter) => {
    console.log(values)
  }

  const handleCreateSubmit = (values: ICreateMaterial) => {
    console.log(values)
    toast.success('Тест успешно создан!')
    setTimeout(() => {
      setModalOpen(false)
    }, 1000)
  }

  const form = useForm<ITestsFilter>({
    defaultValues: {
      search: '',
      type: 'Опросник',
    },
  })

  const createMaterialForm = useForm<ICreateMaterial>({
    resolver: zodResolver(createMaterialSchema),
    defaultValues: {
      name: '',
      type: '',
    },
  })

  return (
    <>
      <Heading title="Опросники и тесты" />
      <Filters sort={sort} setSort={setSort} />
      <div className="flex gap-x-[20px] items-start">
        <div className="main_content bg-[#F1F1F1] rounded-[5px] py-[12px] px-[16px] flex flex-col gap-y-[12px]">
          {cardData.map((el) => (
            <TestCard key={el.id} type={el.type as ITestCardProps['type']} title={el.title} date={el.date} />
          ))}
        </div>
        <div className="flex flex-col items-start gap-y-[20px] w-full max-w-[364px]">
          <FormProvider {...form}>
            <Panel onSubmit={handlePanelSubmit} />
          </FormProvider>
          <FormProvider {...createMaterialForm}>
            <CreateMaterialModal onSubmit={handleCreateSubmit} modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default TestsPage
