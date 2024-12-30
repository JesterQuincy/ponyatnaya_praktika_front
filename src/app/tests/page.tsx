'use client'

import React, { useState } from 'react'
import { Heading } from '@/components/ui/Heading'
import { TestCard } from '@/components/test-card'

import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Filters } from '@/components/layout/tests-page/Filters'
import { Panel } from '@/components/layout/tests-page/Panel'
import { CreateMaterialModal } from '@/components/layout/tests-page/CreateMaterialModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { ITestsFilter } from '@/models/testsFilterSchema'
import { createMaterialSchema, ICreateMaterial } from '@/models/createMaterialSchema'
import { useQuestionnaires } from '@/api/hooks/therapistQuestionnaires/useQuestionnaires'
import { Button } from '@/components/ui/buttons/Button'

export interface ISort {
  type: string
  date: string
}

const TestsPage = () => {
  const [sort, setSort] = useState<ISort>({ type: '', date: '' })
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Получаем данные с сервера (пагинация по 7 элементов)
  const { data, isLoading, isError } = useQuestionnaires((currentPage - 1) * 7)

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className="w-full h-full pb-8">
      <Heading title="Опросники и тесты" />
      <Filters sort={sort} setSort={setSort} />
      <div className="flex gap-x-[20px] items-start justify-between">
        <div className="w-2/3 bg-[#F1F1F1] rounded-[5px] py-[12px] px-[16px] flex flex-col gap-y-[12px] mb-8 min-h-[55vh]">
          {data?.map((el) => <TestCard key={el.id} test={el.test} title={el.title} dateCreated={el.dateCreated} />)}
        </div>
        <div className="flex flex-col items-start gap-y-[20px] w-1/3">
          <FormProvider {...form}>
            <Panel onSubmit={handlePanelSubmit} />
          </FormProvider>
          <FormProvider {...createMaterialForm}>
            <CreateMaterialModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </FormProvider>
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50">
          &lt;
        </button>
        {[...Array(5)].map((_, index) => {
          const page = index + 1
          return (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-orange text-white' : ''}`}>
              {page}
            </Button>
          )
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={data && data?.length < 7}
          className="px-3 py-1 border rounded disabled:opacity-50">
          &gt;
        </button>
      </div>
    </div>
  )
}

export default TestsPage
