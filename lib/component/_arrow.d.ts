import { ReactNode } from 'react';
export declare const PaginoidArrow: ({ handleClick, arrowTitle, arrowsClassName, disabledArrowClassName, isActive }: {
    handleClick: () => void;
    arrowTitle?: ReactNode;
    isActive?: boolean | undefined;
    arrowsClassName?: string | undefined;
    disabledArrowClassName?: string | undefined;
}) => JSX.Element;
