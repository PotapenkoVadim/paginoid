# Paginoid
[![npm version](https://badge.fury.io/js/paginoid.svg)](https://www.npmjs.com/package/paginoid) [![](https://data.jsdelivr.com/v1/package/npm/paginoid/badge)](https://www.jsdelivr.com/package/npm/paginoid)

![](/paginoid.PNG)

A ReactJS dumb component to render a pagination.
  - a small function
  - implemented in `typescript`
  - ***no dependencies***
***


## Installation
```bash
    #npm
    $ npm install paginoid
    
    #yarn
    $ yarn add paginoid
```
***

## Usage

```js
import React from 'react';
import Paginoid from 'paginoid';

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

        prevButtonTitle={<span>{'<'}</span>}
        nextButtonTitle={<span>{'>'}</span>}

        containerClassName={'pagination'}
        arrowsClassName={'pagination_arrows'}
        itemsClassName={'pagination_item'}
        activeItemClassName={'pagination_item__active'}
        disabledArrowClassName={'pagination_arrows__disable'}
      />
    </div>
  );
};

```

***

## Params
  * **currentPage: number`(required)`;**
  * **total: number`(required)` *- total items*;**
  * **perPage: number`(required)` *- items per page*;**
  * **handleChange: (currentPage: number) => void`(required)`;**
  * prevButtonTitle?: ReactNode;
  * nextButtonTitle?: ReactNode;
  * containerClassName?: string;
  * arrowsClassName?: string;
  * itemsClassName?: string;
  * activeItemClassName?: string;
  * disabledArrowClassName?: string;