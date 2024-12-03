import { components } from 'react-select'
import Image from 'next/image'
import BottomArrow from '@/public/icon/bottomArrow.svg'
import React from 'react'

export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={BottomArrow} alt="Dropdown icon" width={8} height={8} />
    </components.DropdownIndicator>
  )
}
