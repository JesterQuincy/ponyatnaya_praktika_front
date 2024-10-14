import Select from "react-select";

import { IValueLabelModel } from "@/models/ILabelValueModel";

interface ISelectHandlerProps {
    options: IValueLabelModel[]
}

export function SelectHandler({ options }: ISelectHandlerProps) {

    return (
        <Select
            options={options}
            placeholder='Выберете'
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