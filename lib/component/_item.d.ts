/// <reference types="react" />
export declare type PageItem = {
    title: string;
    value: number;
};
export declare const PaginoidItem: ({ page, isActive, itemsClassName, activeClassName, handleClick }: {
    page: PageItem;
    handleClick: (page: number) => void;
    isActive?: boolean | undefined;
    itemsClassName?: string | undefined;
    activeClassName?: string | undefined;
}) => JSX.Element;
