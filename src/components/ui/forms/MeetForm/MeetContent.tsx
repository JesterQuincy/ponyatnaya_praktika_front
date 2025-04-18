'use client'

import Image from 'next/image'
import ImageIcon from '@/public/icon/imageWhite.svg'
import { Button } from '../../buttons/Button'
import { Button as SaveButton } from '@/components/ui/button'
import { meetData } from '../mocks/meetsList'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IMeetingSchema, meetingSchema } from '@/models/meetSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from '@/helpers/utils/isEmpty'
import { useUpdateMeeting } from '@/api/hooks/meet/useUpdateMeeting'
import { FormPrompt } from '@/components/form-prompt'
import { Dispatch, SetStateAction, useState } from 'react'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { useGetProjMethods } from '@/api/hooks/methods/useGetProjMethods'
import { Spinner } from '@/components/Spinner'
import { Pencil, Trash2 } from 'lucide-react'
import { TModalType } from '@/components/ui/forms/MeetForm/MeetForm'

interface IMeetFormProps {
  content: IMeetingDetails
  modalOpen: Dispatch<SetStateAction<TModalType>>
}

export function MeetContent({ content, modalOpen }: IMeetFormProps) {
  const [showAll, setShowAll] = useState(false)

  const {
    data: methods,
    isPending: isGetProjMethodsPending,
    isLoading: isGetProjMethodsLoading,
    isRefetching: isGetProjMethodsRefetching,
  } = useGetProjMethods(content.id)
  const { mutateAsync: updateMeet, isPending: isUpdateMeetPending } = useUpdateMeeting()

  const visibleMetodics = showAll ? methods?.data : methods?.data?.slice(0, 5)

  const {
    clientSessionRequest,
    therapistStateAtSessionStart,
    mainTopicsDiscussedDuringSession,
    clientKeyPhrasesInsights,
    clientMainEmotions,
    therapistMainEmotionsExpressed,
    techniquesAndMethodsUsed,
    clientMainObstaclesMethods,
    note,
  } = removeEmptyValues(content)

  const form = useForm<IMeetingSchema>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      clientSessionRequest,
      therapistStateAtSessionStart,
      mainTopicsDiscussedDuringSession,
      clientKeyPhrasesInsights,
      clientMainEmotions,
      therapistMainEmotionsExpressed,
      techniquesAndMethodsUsed,
      clientMainObstaclesMethods,
      note,
    },
  })

  const handleFormSubmit = async (data: IMeetingSchema) => {
    try {
      await updateMeet({ id: content.id, ...data })

      form.reset(data)
    } catch {}
  }

  const isLoadingMethod = isGetProjMethodsPending || isGetProjMethodsLoading || isGetProjMethodsRefetching

  return (
    <Form {...form}>
      <FormPrompt hasUnsavedChanges={!isEmpty(form.formState.dirtyFields)} />
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex gap-[15px] mt-[13px]">
        <div className="bg-[#F1F1F1] w-[60%] px-[16px] py-[25px] rounded-tr-[4px] rounded-[4px] flex flex-col gap-[25px] relative">
          <SaveButton
            disabled={form.formState.isSubmitting || isUpdateMeetPending || isEmpty(form.formState.dirtyFields)}
            type="submit"
            variant="grey"
            className="self-end">
            Сохранить
          </SaveButton>
          {meetData.map((meet) => (
            <FormField
              key={meet.name}
              name={meet.name}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold font-montserrat">{meet.label}</span>
                  <FormControl>
                    <textarea
                      {...field}
                      className="border border-[#D9D9D9] mt-[5px] rounded-[6px] w-full min-h-[46px] p-[6px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="bg-[#F1F1F1] w-[40%] rounded-[4px] py-[29px] px-[11px] h-fit">
          <div>
            <span className="font-bold text-[20px]">Проективные методики</span>
            {isLoadingMethod && <Spinner />}
            {!isLoadingMethod && !!methods?.data?.length && (
              <>
                <div className="flex flex-col gap-[10px] mt-[10px]">
                  {visibleMetodics?.map((item) => (
                    <div key={item.id} className="bg-white rounded-[6px] p-[5px] flex items-center gap-[10px]">
                      <span className="bg-[#6E6E6E] text-white text-[12px] p-[2px] rounded-[3px] text-center min-w-[75px]">
                        {item.dateCreateMethod}
                      </span>
                      <span
                        className="text-[15px] w-full hover:underline cursor-pointer"
                        onClick={() => {
                          modalOpen({ type: 'view', id: item.id })
                        }}>
                        {item.typeMethod.nameMethod}
                      </span>
                      <div className="ml-auto flex gap-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            modalOpen({ type: 'edit', id: item.id })
                          }}
                          type="button">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            modalOpen({ type: 'delete', id: item.id })
                          }}
                          type="button">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-[9px]">
                  {!showAll && methods?.data?.length > 5 && (
                    <Button
                      onClick={() => {
                        setShowAll(true)
                      }}
                      type={'button'}
                      className="border border-[#D9D9D9] px-[10px] py-[5px] rounded-[6px]">
                      Ещё
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="mt-[13px]">
            <Button
              onClick={() => {
                modalOpen({ type: 'create' })
              }}
              type={'button'}
              className="bg-[#5A5A5A] text-white px-[10px] py-[5px] rounded-[6px] flex items-center">
              <Image src={ImageIcon} alt="CorrectFile" className="mr-2" />
              <span>Добавить методику</span>
            </Button>
          </div>
          <div className="mt-[27px]">
            <span className="font-bold text-[20px]">Дополнительная заметка</span>
            <FormField
              control={form.control}
              name={'note'}
              render={({ field }) => (
                <FormItem className="mt-[5px]">
                  <textarea
                    {...field}
                    className="border border-[#D9D9D9] rounded-[6px] w-[90%] min-h-[110px] p-[6px]"
                  />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
