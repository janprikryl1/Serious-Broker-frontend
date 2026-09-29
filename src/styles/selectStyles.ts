export const selectStyles = {
    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: 'transparent',
        border: '1px solid var(--gray-4-color)',
        borderRadius: '5px',
        padding: '7px 0 7px 8px',
        fontFamily: '"Inter", sans-serif',
        fontSize: '16px',
        color: 'var(--white-color)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minHeight: 'auto',
        lineHeight: '1.5',
        boxShadow: state.isFocused 
            ? '0 0 15px 5px color-mix(in srgb, var(--secondary-color), transparent 90%)' 
            : 'none',
        '&:hover': {
            borderColor: 'var(--secondary-color)',
            boxShadow: 'var(--golden-glow-shadow)',
        },
    }),
    valueContainer: (base: any) => ({
        ...base,
        padding: '0',
    }),
    input: (base: any) => ({
        ...base,
        color: 'var(--white-color)',
        fontFamily: '"Inter", sans-serif',
        margin: '0px',
        padding: '0px',
    }),
    placeholder: (base: any) => ({
        ...base,
        color: 'var(--gray-1-color)',
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: 'var(--tertiary-color)',
        borderRadius: '2px',
        color: 'var(--black-color)',
        zIndex: 9999,
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? 'var(--secondary-color)' : 'var(--tertiary-color)',
        color: state.isFocused ? 'var(--black-color)' : 'var(--white-color)',
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: 'var(--tertiary-color-light)',
        borderRadius: '5px',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        fontWeight: 500,
        padding: '0px',
        color: 'var(--white-color)',
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: 'var(--gray-4-color)',
        borderRadius: '5px',
        ':hover': {
            color: 'var(--white-color)',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    clearIndicator: (base: any) => ({
        ...base,
        color: 'var(--secondary-color)',
        ':hover': {
            color: 'var(--secondary-color)',
        },
    }),
};