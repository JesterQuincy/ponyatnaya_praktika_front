import { BASE_HOST } from '@/api/interceptors'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { copyLink } from '@/helpers/utils/getLink'
import { Copy } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { Button } from '@/components/ui/button'

interface ICreateMaterialModalProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  link: string
}

export const ClientLinkModal: FC<ICreateMaterialModalProps> = ({ modalOpen, setModalOpen, link }) => {
  const resLink = useMemo(() => {
    if (!link) return ''
    const parts = link.split('/').filter(Boolean)
    const tokenValue = parts.at(-1) ?? ''
    const typeValue = parts.at(-2) ?? ''

    return `${BASE_HOST}/questionnaire?type=${typeValue}&token=${tokenValue}`
  }, [link])

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium text-[12px]">Персональная ссылка</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 items-start">
          <Input
            value={resLink}
            readOnly
            className="text-[12px]"
            layoutClassName="w-full"
            placeholder="Скопируйте ссылку"
            onFocus={(e) => e.currentTarget.select()}
          />

          <Button variant="link" type="button" onClick={() => copyLink(resLink)} disabled={!resLink}>
            <Copy />
          </Button>
        </div>

        <DialogFooter>
          <Button variant="grey" type="button" onClick={() => setModalOpen(false)}>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
