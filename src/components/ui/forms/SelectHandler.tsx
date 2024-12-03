import Select, {OnChangeValue} from 'react-select'

import { IValueLabelModel } from "@/models/ILabelValueModel";
import {useEffect, useState} from "react";

interface ISelectHandlerProps {
  options: IValueLabelModel[]
  defaultValue: any
}

export function SelectHandler({ options, defaultValue }: ISelectHandlerProps) {
  const defaultVal = typeof defaultValue === 'string' ? { value: defaultValue, label: defaultValue } : defaultValue

  return (
    <Select
      options={options}
      placeholder="Выберете"
      defaultValue={defaultVal}
      styles={{
        control: (base) => ({
          ...base,
          height: '36px',
          minHeight: '36px',
          padding: '0 0 5px 0',
          borderRadius: '12px',
          maxWidth: '129px',
          fontSize: '15px',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
      }}
    />
  )
}
