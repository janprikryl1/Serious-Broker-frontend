export const selectStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: '#f8f9fa',
        border: 'none',
        boxShadow: 'none',
        minHeight: '55px',
        borderRadius: '2px',
        color: 'black',
        fontSize: '0.95rem',
        paddingLeft: '2px',
    }),
    valueContainer: (base: any) => ({
        ...base,
        padding: '0 6px',
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#22201d',
        borderRadius: '8px',
        color: '#fff',
        zIndex: 5,
    }),
    option: (base: any, state:any) => ({
        ...base,
        backgroundColor: state.isFocused ? '#333029' : '#22201d',
        color: '#fff',
        cursor: 'pointer',
    }),
    multiValue: (base:any) => ({
        ...base,
        backgroundColor: '#2f2c28',
        borderRadius: '4px',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: '#fff',
        fontWeight: 500,
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: '#aaa',
        ':hover': {
            backgroundColor: '#444038',
            color: '#fff',
        },
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: '#aaa',
        ':hover': {
            color: '#fff',
        },
    }),
    clearIndicator: (base:any) => ({
        ...base,
        color: '#aaa',
        ':hover': {
            color: '#fff',
        },
    }),
    input: (base:any) => ({
        ...base,
        color: '#fff',
    }),
    placeholder: (base:any) => ({
        ...base,
        color: '#aaa',
    }),
};