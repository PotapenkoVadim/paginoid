import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './paginoid.module.scss';
import { range } from 'lodash';
import { PaginoidProps, PageItem } from './paginoid.types';
import { PaginoidItem } from './_item';
import { PaginoidArrow } from './_arrow';

const cx = classNames.bind(styles);

export default function Paginoid({
  total,
  perPage,
  currentPage,
  handleChange,
  prevButtonTitle = 'Left',
  nextButtonTitle = 'Right',
  containerClassName,
  arrowsClassName,
  itemsClassName,
  activeItemClassName,
  disabledArrowClassName
}: PaginoidProps): JSX.Element {
  const [pagesCount, setPagesCount] = useState(0);
  const [activeArrows, setActiveArrows] = useState({ left: false, right: false });

  const createPageItem = (isContainsValue: boolean, value: number): PageItem => {
    return isContainsValue ? { title: String(value), value: value } : { title: String('...'), value: value };
  };

  const createPagesArray = (currentPage: number, pagesCount: number): Array<PageItem> => {
    const firstPage = 1;
    const paginationSlotsCount = 7;
    const pages = [];
    const penultPage = pagesCount - 1;

    if (pagesCount <= paginationSlotsCount) {
      for (let i = firstPage; i <= pagesCount; i++) {
        pages.push(createPageItem(true, i));
      }
    } else {
      const returnActionDependsPositionCurrentPage = (action: any) => {
        const isFirtsPages = currentPage < paginationSlotsCount - 2;
        const isLastPages = currentPage >= penultPage - 2;

        switch (true) {
          case isFirtsPages: return action.start;
          case isLastPages: return action.end;
          default: return action.center;
        }
      };

      const generatedPages = range(1, pagesCount + 1)
        .map((item, index) => returnActionDependsPositionCurrentPage({
          start: createPageItem(index < paginationSlotsCount - 2, item),
          end: createPageItem(index > penultPage - 5, item),
          center: createPageItem(!(index > currentPage || index < currentPage - 2), item)
        }))
        .filter((_, index) => returnActionDependsPositionCurrentPage({
          start: index < paginationSlotsCount - 1 && index > 0,
          end: index > penultPage - 6 && index < penultPage,
          center: !(index > currentPage + 1 || index < currentPage - 3)
        }));

      pages.push(createPageItem(true, firstPage));
      pages.push(...generatedPages);
      pages.push(createPageItem(true, pagesCount));
    }

    return pages;
  };

  const [pages, setPages] = useState(createPagesArray(currentPage, pagesCount));

  const goToPage = (page: number): void => {
    let validatePage = 0;
    switch (true) {
      case page < 1:
        validatePage = 1;
        break;

      case page > pagesCount:
        validatePage = pagesCount;
        break;

      default: validatePage = page;
    }

    setActiveArrows({ left: page > 1, right: page < pagesCount });
    handleChange(validatePage);
  };

  useEffect(() => {
    setPages(createPagesArray(currentPage, pagesCount));
    setActiveArrows({ left: currentPage > 1, right: currentPage < pagesCount });
  }, [currentPage, pagesCount]);

  useEffect(() => setPagesCount(Math.ceil(total / perPage)), []);

  return (
    <>
      { pages.length ? (
        <div className={cx(['paginoid', containerClassName])}>
          <PaginoidArrow
            disabledArrowClassName={disabledArrowClassName}
            arrowsClassName={arrowsClassName}
            isActive={activeArrows.left}
            arrowTitle={prevButtonTitle}
            handleClick={() => goToPage(currentPage - 1)} />

          <ul className={cx('paginoid_list')}>
            {pages.map((item) => (
              <li key={item.value}>
                <PaginoidItem
                  activeClassName={activeItemClassName}
                  itemsClassName={itemsClassName}
                  page={item}
                  isActive={item.value === currentPage}
                  handleClick={goToPage} />
              </li>
            ))}
          </ul>

          <PaginoidArrow
            disabledArrowClassName={disabledArrowClassName}
            arrowsClassName={arrowsClassName}
            isActive={activeArrows.right}
            arrowTitle={nextButtonTitle}
            handleClick={() => goToPage(currentPage + 1)} />
        </div>
      ) : null}
    </>
  );
}
