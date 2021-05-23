import React from 'react';
import { ArrowProps } from './paginoid.types';
import './style.css';

export const PaginoidArrow = ({
  handleClick,
  arrowTitle,
  arrowsClassName,
  disabledArrowClassName,
  isActive = false
}: ArrowProps): JSX.Element => {
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.code === 'Enter') handleClick();
  };

  return (
    <div
      tabIndex={0}
      role='button'
      data-type='back'
      className={`
        paginoid_arrow
        paginoid_clickable
        ${!isActive && 'paginoid_arrow__disable'}
        ${arrowsClassName}
        ${!isActive && disabledArrowClassName}
      `}
      onKeyDown={handleKeyDown}
      onClick={handleClick}>
      {arrowTitle}
    </div>
  );
};