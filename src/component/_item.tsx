import React from 'react';
import classNames from 'classnames/bind';
import styles from './paginoid.module.scss';
import { PaginoidItemProps } from './paginoid.types';

const cx = classNames.bind(styles);

export const PaginoidItem = ({ page, isActive, itemsClassName, activeClassName, handleClick }: PaginoidItemProps): JSX.Element => {
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.code === 'Enter') handleClick(page.value);
  };

  return (
    <div
      tabIndex={0}
      role='button'
      className={cx([itemsClassName, 'paginoid_item', 'paginoid_clickable'])}
      onKeyDown={handleKeyDown}
      onClick={() => handleClick(page.value)}>
      <span
        className={cx({
          paginoid_button: true,
          paginoid_button__active: isActive,
          [activeClassName!]: !!activeClassName && isActive,
        })}>
        {page.title}
      </span>
    </div>
  );
}
