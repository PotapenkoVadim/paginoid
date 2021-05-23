import React from 'react';
import classNames from 'classnames/bind';
import styles from './paginoid.module.scss';
import { ArrowProps } from './paginoid.types';

const cx = classNames.bind(styles);

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
      className={cx({
        paginoid_arrow: true,
        paginoid_clickable: true,
        paginoid_arrow__disable: !isActive,
        [arrowsClassName!]: !!arrowsClassName,
        [disabledArrowClassName!]: !!disabledArrowClassName && !isActive
      })}
      onKeyDown={handleKeyDown}
      onClick={handleClick}>
      {arrowTitle}
    </div>
  );
};