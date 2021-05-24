import { ReactNode } from "react";
export interface PaginoidProps {
    currentPage: number;
    total: number;
    perPage: number;
    handleChange: (currentPage: number) => void;
    prevButtonTitle?: ReactNode;
    nextButtonTitle?: ReactNode;
    containerClassName?: string;
    arrowsClassName?: string;
    itemsClassName?: string;
    activeItemClassName?: string;
    disabledArrowClassName?: string;
}
export interface PaginoidItemProps {
    page: PageItem;
    handleClick: (page: number) => void;
    isActive?: boolean;
    itemsClassName?: string;
    activeClassName?: string;
}
export interface PageItem {
    title: string;
    value: number;
}
export interface ArrowProps {
    handleClick: () => void;
    arrowTitle?: ReactNode;
    isActive?: boolean;
    arrowsClassName?: string;
    disabledArrowClassName?: string;
}
