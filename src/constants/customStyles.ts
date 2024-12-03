export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '20px',
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '30px',
    boxShadow: state.isFocused ? '0 0 0 2px #2563eb' : '',
    '&:hover': {
      borderColor: '#9ca3af',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#6b7280',
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#111827',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#111827',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#6b7280',
    '&:hover': {
      color: '#4b5563',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    marginTop: '4px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e5e7eb' : '#fff',
    color: state.isSelected ? '#fff' : '#111827',
    '&:active': {
      backgroundColor: '#2563eb',
      color: '#fff',
    },
  }),
}

export const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '6px',
    borderColor: '#d1d5db',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '30px',
    width: '440px',
    boxShadow: state.isFocused ? '0 0 0 2px #2563eb' : '',
    '&:hover': {
      borderColor: '#9ca3af',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#6b7280',
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#111827',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#111827',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#6b7280',
    '&:hover': {
      color: '#4b5563',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    marginTop: '4px',
    width: '440px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e5e7eb' : '#fff',
    color: state.isSelected ? '#fff' : '#111827',
    '&:active': {
      backgroundColor: '#2563eb',
      color: '#fff',
    },
  }),
}
