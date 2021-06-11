/// <reference types="react" />
import { PaginoidProps } from '../interface/paginoid';
import './style.css';
export default function Paginoid({ total, perPage, currentPage, handleChange, prevButtonTitle, nextButtonTitle, containerClassName, arrowsClassName, itemsClassName, activeItemClassName, disabledArrowClassName }: PaginoidProps): JSX.Element;
