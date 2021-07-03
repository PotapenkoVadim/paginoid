import React, { useEffect, useState, ReactNode } from 'react';

export const PaginoidArrow = ({
  handleClick,
  arrowTitle,
  arrowsClassName,
  disabledArrowClassName,
  isActive = false
}: {
  handleClick: () => void;
  arrowTitle?: ReactNode;
  isActive?: boolean;
  arrowsClassName?: string;
  disabledArrowClassName?: string;
}): JSX.Element => {
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.code === 'Enter') handleClick();
  };

  const [arrowsClass, setArrowsClass] = useState('paginoid_arrow');
  useEffect(() => {
    if (arrowsClassName) setArrowsClass(arrowsClassName)
  }, [arrowsClassName]);

  const [disabledArrowClass, setDisabledArrowClass] = useState('paginoid_arrow__disable');
  useEffect(() => {
    if (disabledArrowClassName) setDisabledArrowClass(disabledArrowClassName)
  }, [disabledArrowClassName]);

  return (
    <div
      tabIndex={0}
      role='button'
      data-type='back'
      className={`
        paginoid_clickable
        ${arrowsClass}
        ${!isActive ? disabledArrowClass : ''}
      `}
      onKeyDown={handleKeyDown}
      onClick={handleClick}>
      {arrowTitle}
    </div>
  );
};