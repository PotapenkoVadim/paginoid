import React, { useEffect, useState } from 'react';

export type PageItem = {
  title: string;
  value: number;
};

export const PaginoidItem = ({
  page,
  isActive,
  itemsClassName,
  activeClassName,
  handleClick
}: {
  page: PageItem;
  handleClick: (page: number) => void;
  isActive?: boolean;
  itemsClassName?: string;
  activeClassName?: string;
}): JSX.Element => {
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.code === 'Enter') handleClick(page.value);
  };

  const [itemsClass, setItemsClass] = useState('paginoid_item');
  useEffect(() => {
    if (itemsClassName) setItemsClass(itemsClassName)
  }, [itemsClassName]);

  const [activeItemClass, setActiveItemClass] = useState('paginoid_button__active');
  useEffect(() => {
    if (activeClassName) setActiveItemClass(activeClassName)
  }, [activeClassName]);

  return (
    <div
      tabIndex={0}
      role='button'
      className={`
        ${itemsClass}
        ${isActive ? activeItemClass : ''}
        paginoid_clickable
      `}
      onKeyDown={handleKeyDown}
      onClick={() => handleClick(page.value)}>
      <span
        className={'paginoid_button'}>
        {page.title}
      </span>
    </div>
  );
}