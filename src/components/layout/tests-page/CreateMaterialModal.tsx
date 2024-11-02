import React, { Dispatch, FC, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FilePlus2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Select from 'react-select'
import { DropdownIndicator } from '@/components/drop-down-indicator'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useFormContext } from 'react-hook-form'
import { ICreateMaterial } from '@/models/createMaterialSchema'

interface ICreateMaterialModalProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  onSubmit: (data: ICreateMaterial) => void
}

export const CreateMaterialModal: FC<ICreateMaterialModalProps> = ({ modalOpen, setModalOpen, onSubmit }) => {
  const createMaterialForm = useFormContext<ICreateMaterial>()

  const { formState } = createMaterialForm

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(prev) => {
        setModalOpen(prev)
        createMaterialForm.reset()
      }}>
      <DialogTrigger asChild>
        <Button variant="grey">
          <FilePlus2 />
          Создать материал
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[15px]">
        <DialogHeader className="font-bold text-[32px] font-ebgaramond">Создать материал</DialogHeader>
        <Form {...createMaterialForm}>
          <form onSubmit={createMaterialForm.handleSubmit(onSubmit)}>
            <div>
              <span className="font-medium text-[12px]">Тип материала</span>
              <FormField
                control={createMaterialForm.control}
                name="type"
                render={({ field }) => (
                  <Select
                    {...field}
                    className="text-[12px]"
                    placeholder="Выберите тип"
                    styles={{
                      indicatorSeparator: () => ({ display: 'none' }),
                    }}
                    components={{ DropdownIndicator }}
                  />
                )}
              />
            </div>
            <div>
              <span className="font-medium text-[12px]">Название</span>
              <FormField
                control={createMaterialForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="text-[12px]" placeholder="Название материала" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="h-[1px] bg-[#CACACA] mt-[24px] mb-[12px]" />
            <DialogFooter>
              <div className="flex gap-x-[12px]">
                <Button
                  onClick={() => {
                    setModalOpen(false)
                  }}>
                  Отмена
                </Button>
                <Button
                  disabled={formState.isSubmitting || !formState.isValid || formState.isValidating}
                  type="submit"
                  variant="orange">
                  Готово
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
