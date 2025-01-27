'use client'

import React, { useMemo, useState } from 'react'
import { Heading } from '@/components/ui/Heading'
import { TestCard } from '@/components/test-card'
import { FormProvider, useForm } from 'react-hook-form'
import { Filters } from '@/components/layout/tests-page/Filters'
import { CreateMaterialModal } from '@/components/layout/tests-page/CreateMaterialModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { createMaterialSchema, ICreateMaterial } from '@/models/createMaterialSchema'
import { useQuestionnaires } from '@/api/hooks/therapistQuestionnaires/useQuestionnaires'
import { Button } from '@/components/ui/buttons/Button'
import { Spinner } from '@/components/Spinner'

export interface ISort {
  type?: 'desc' | 'asc'
  date?: 'desc' | 'asc'
}

const pageSize = 7

const TestsPage = () => {
  const [sort, setSort] = useState<ISort>()
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError } = useQuestionnaires({
    offset: currentPage - 1,
    limit: pageSize,
    orderIsTest: sort?.type,
    orderDate: sort?.date,
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

  const pageCount = useMemo(() => {
    if (!data) return 1
    return Math.ceil(data.total / pageSize)
  }, [data])

  if (isError) return <div>Error loading data</div>

  return (
    <div className="w-full h-full pb-8">
      <Heading title="Опросники и тесты" />
      <div className="flex items-center mt-[31px] mb-[8px]">
        <Filters sort={sort} setSort={setSort} />
        <FormProvider {...createMaterialForm}>
          <CreateMaterialModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </FormProvider>
      </div>
      <div className="w-full bg-[#F1F1F1] rounded-[5px] py-[12px] px-[16px] flex flex-col gap-y-[12px] mb-8 min-h-[55vh]">
        {isLoading && <Spinner />}
        {data?.data.map((el) => (
          <TestCard key={el.id} test={el.test} title={el.title} dateCreated={el.dateCreated} id={el.id} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50">
          &lt;
        </button>
        {[...Array(pageCount)].map((_, index) => {
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
          disabled={currentPage === pageCount || (data && data.data.length < pageSize) || isLoading}
          className="px-3 py-1 border rounded disabled:opacity-50">
          &gt;
        </button>
      </div>
    </div>
  )
}

export default TestsPage
