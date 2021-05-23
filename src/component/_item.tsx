import React from 'react';
import { PaginoidItemProps } from './paginoid.types';
import './style.css';

export const PaginoidItem = ({ page, isActive, itemsClassName, activeClassName, handleClick }: PaginoidItemProps): JSX.Element => {
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.code === 'Enter') handleClick(page.value);
  };

  return (
    <div
      tabIndex={0}
      role='button'
      className={`${itemsClassName} paginoid_item paginoid_clickable`}
      onKeyDown={handleKeyDown}
      onClick={() => handleClick(page.value)}>
      <span
        className={`
          paginoid_button
          ${isActive && 'paginoid_button__active'}
          ${activeClassName}
        `}>
        {page.title}
      </span>
    </div>
  );
}
