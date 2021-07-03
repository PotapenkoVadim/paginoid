import React from 'react';
import { Story } from "@storybook/react";

import { Paginoid, PaginoidProps } from '../component/paginoid';
import rightArrow from './assets/right-arrow.svg';
import leftArrow from './assets/left-arrow.svg';

export default {
  component: Paginoid,
  title: 'Paginoid',
};

// Default Tempalte
const DefaultTemplate: Story<PaginoidProps> = (args: PaginoidProps): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleChange = (page: number) => setCurrentPage(page);

  return <Paginoid {...args} currentPage={currentPage} handleChange={handleChange} />;
}

export const Default = DefaultTemplate.bind({});
Default.args = {
  total: 150,
  perPage: 3
};

// Custom Arrows Template
const CustomArrow = ({ typeArrow }: { typeArrow: string }): JSX.Element => (
  <span>
    <img src={typeArrow} alt='arrow' />
  </span>
);

const CustomArrowsTemplate: Story<PaginoidProps> = (args: PaginoidProps): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleChange = (page: number) => setCurrentPage(page);

  return <Paginoid
    {...args}

    prevButtonTitle={<CustomArrow typeArrow={leftArrow} />}
    nextButtonTitle={<CustomArrow typeArrow={rightArrow} />}

    currentPage={currentPage}
    handleChange={handleChange} />;
}

export const CustomArrows = CustomArrowsTemplate.bind({});
CustomArrows.args = {
  total: 150,
  perPage: 3
};

// Custom Styles Template
const CustomStylesTemplate: Story<PaginoidProps> = (args: PaginoidProps): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleChange = (page: number) => setCurrentPage(page);

  return <Paginoid
    {...args}

    prevButtonTitle={<CustomArrow typeArrow={leftArrow} />}
    nextButtonTitle={<CustomArrow typeArrow={rightArrow} />}

    currentPage={currentPage}
    handleChange={handleChange} />;
}

export const CustomStyles = CustomArrowsTemplate.bind({});
CustomStyles.args = {
  total: 150,
  perPage: 3,
  containerClassName: 'c-pagination',
  arrowsClassName: 'c-pagination_arrows',
  itemsClassName: 'c-pagination_item',
  activeItemClassName: 'c-pagination_item__active',
  disabledArrowClassName: 'c-pagination_arrows__disable'
};