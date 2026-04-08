export type TableColumn<T> = {
    key: string;
    header?: string;
    headerRender?: () => React.ReactNode;
    classNameRow?: string;
    classNameHeader?: string;
    render: (row: T) => React.ReactNode;
    value?: string | ((row: T) => React.ReactNode);
};
