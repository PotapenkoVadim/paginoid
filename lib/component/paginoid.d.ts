import { ReactNode } from 'react';
import './style.css';
export declare type PaginoidProps = {
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
};
export declare function Paginoid({ total, perPage, currentPage, handleChange, prevButtonTitle, nextButtonTitle, containerClassName, arrowsClassName, itemsClassName, activeItemClassName, disabledArrowClassName }: PaginoidProps): JSX.Element;
