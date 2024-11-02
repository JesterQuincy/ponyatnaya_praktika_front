import Select, {OnChangeValue} from "react-select";

import { IValueLabelModel } from "@/models/ILabelValueModel";
import {useEffect, useState} from "react";

interface ISelectHandlerProps {
    options: IValueLabelModel[],
    defaultValue: any,
}

export function SelectHandler({ options, defaultValue }: ISelectHandlerProps) {

    const defaultVal = { value: defaultValue, label: defaultValue };

    const [value, setValue] = useState(defaultVal);

    useEffect(() => {
        setValue(defaultVal)
    }, [defaultValue]);

    const handleValueChange = (e: OnChangeValue<unknown, false>) => {
        // @ts-ignore
        setValue(e);
    }

    return (
        <Select
            options={options}
            placeholder='Выберете'
            value={value}
            onChange={(e) => {handleValueChange(e)}}
            styles={{
                control: (base) => ({
                    ...base,
                    height: '36px',
                    minHeight: '36px',
                    padding: '0 0 5px 0',
                    borderRadius: '12px',
                    maxWidth: '129px',
                    fontSize: '15px'
                }),
                indicatorSeparator: () => ({display: "none"}),
            }}
        />
    );
}