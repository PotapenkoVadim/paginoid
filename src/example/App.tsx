import React, { useState } from 'react';
import Paginiod from '../component/paginoid';
import './style.scss';

export const App = (): JSX.Element => {
  const [curentPage, setCurrentPage] = useState(1);
  const handleChange = (page: number) => setCurrentPage(page);

  return (
    <div className='app'>
      <Paginiod
        currentPage={curentPage}
        total={150}
        perPage={3}
        handleChange={handleChange}

      // prevButtonTitle={<span>{'<'}</span>}
      // nextButtonTitle={<span>{'>'}</span>}

      // containerClassName={'pagination'}
      // arrowsClassName={'pagination_arrows'}
      // itemsClassName={'pagination_item'}
      // activeItemClassName={'pagination_item__active'}
      // disabledArrowClassName={'pagination_arrows__disable'}
      />
    </div>
  );
};