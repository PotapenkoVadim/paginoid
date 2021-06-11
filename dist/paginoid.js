'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".paginoid{display:inline-flex;justify-content:space-between;align-items:center;gap:15px}.paginoid_arrow{cursor:pointer;padding:10px}.paginoid_arrow__disable{cursor:default;pointer-events:none;color:#d3d3d3}.paginoid_clickable:active,.paginoid_clickable:focus{outline:none;user-select:none}.paginoid_list{display:flex;justify-content:space-around;gap:2px;list-style-type:none;margin:0;padding:0}.paginoid_item{user-select:none}.paginoid_button{padding:5px 12px;cursor:pointer}.paginoid_button__active{font-weight:700}";
styleInject(css_248z);

const PaginoidItem = ({ page, isActive, itemsClassName, activeClassName, handleClick }) => {
    const handleKeyDown = (event) => {
        if (event.code === 'Enter')
            handleClick(page.value);
    };
    const [itemsClass, setItemsClass] = React.useState('paginoid_item');
    React.useEffect(() => {
        if (itemsClassName)
            setItemsClass(itemsClassName);
    }, [itemsClassName]);
    const [activeItemClass, setActiveItemClass] = React.useState('paginoid_button__active');
    React.useEffect(() => {
        if (activeClassName)
            setActiveItemClass(activeClassName);
    }, [activeClassName]);
    return (React__default['default'].createElement("div", { tabIndex: 0, role: 'button', className: `${itemsClass} paginoid_clickable`, onKeyDown: handleKeyDown, onClick: () => handleClick(page.value) },
        React__default['default'].createElement("span", { className: `
          paginoid_button
          ${isActive ? activeItemClass : ''}
        ` }, page.title)));
};

const PaginoidArrow = ({ handleClick, arrowTitle, arrowsClassName, disabledArrowClassName, isActive = false }) => {
    const handleKeyDown = (event) => {
        if (event.code === 'Enter')
            handleClick();
    };
    const [arrowsClass, setArrowsClass] = React.useState('paginoid_arrow');
    React.useEffect(() => {
        if (arrowsClassName)
            setArrowsClass(arrowsClassName);
    }, [arrowsClassName]);
    const [disabledArrowClass, setDisabledArrowClass] = React.useState('paginoid_arrow__disable');
    React.useEffect(() => {
        if (disabledArrowClassName)
            setDisabledArrowClass(disabledArrowClassName);
    }, [disabledArrowClassName]);
    return (React__default['default'].createElement("div", { tabIndex: 0, role: 'button', "data-type": 'back', className: `
        paginoid_clickable
        ${arrowsClass}
        ${!isActive ? disabledArrowClass : ''}
      `, onKeyDown: handleKeyDown, onClick: handleClick }, arrowTitle));
};

const range = (size, startAt = 1) => [...Array(size).keys()].map(i => i + startAt);

function Paginoid({ total, perPage, currentPage, handleChange, prevButtonTitle = 'Left', nextButtonTitle = 'Right', containerClassName, arrowsClassName, itemsClassName, activeItemClassName, disabledArrowClassName }) {
    const [pagesCount, setPagesCount] = React.useState(0);
    const [activeArrows, setActiveArrows] = React.useState({ left: false, right: false });
    const createPageItem = (isContainsValue, value) => {
        return isContainsValue ? { title: String(value), value: value } : { title: String('...'), value: value };
    };
    const createPagesArray = (currentPage, pagesCount) => {
        const firstPage = 1;
        const paginationSlotsCount = 7;
        const pages = [];
        const penultPage = pagesCount - 1;
        if (pagesCount <= paginationSlotsCount) {
            for (let i = firstPage; i <= pagesCount; i++) {
                pages.push(createPageItem(true, i));
            }
        }
        else {
            const returnActionDependsPositionCurrentPage = (action) => {
                const isFirtsPages = currentPage < paginationSlotsCount - 2;
                const isLastPages = currentPage >= penultPage - 2;
                switch (true) {
                    case isFirtsPages: return action.start;
                    case isLastPages: return action.end;
                    default: return action.center;
                }
            };
            const generatedPages = range(pagesCount + 1)
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
    const [pages, setPages] = React.useState(createPagesArray(currentPage, pagesCount));
    const goToPage = (page) => {
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
    React.useEffect(() => {
        setPages(createPagesArray(currentPage, pagesCount));
        setActiveArrows({ left: currentPage > 1, right: currentPage < pagesCount });
    }, [currentPage, pagesCount]);
    React.useEffect(() => setPagesCount(Math.ceil(total / perPage)), [total, perPage]);
    const [containerClass, setContainerClass] = React.useState('');
    React.useEffect(() => {
        if (containerClassName)
            setContainerClass(containerClassName);
    }, [containerClassName]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, pages.length ? (React__default['default'].createElement("div", { className: `paginoid ${containerClass}` },
        React__default['default'].createElement(PaginoidArrow, { disabledArrowClassName: disabledArrowClassName, arrowsClassName: arrowsClassName, isActive: activeArrows.left, arrowTitle: prevButtonTitle, handleClick: () => goToPage(currentPage - 1) }),
        React__default['default'].createElement("ul", { className: 'paginoid_list' }, pages.map((item) => (React__default['default'].createElement("li", { key: item.value },
            React__default['default'].createElement(PaginoidItem, { activeClassName: activeItemClassName, itemsClassName: itemsClassName, page: item, isActive: item.value === currentPage, handleClick: goToPage }))))),
        React__default['default'].createElement(PaginoidArrow, { disabledArrowClassName: disabledArrowClassName, arrowsClassName: arrowsClassName, isActive: activeArrows.right, arrowTitle: nextButtonTitle, handleClick: () => goToPage(currentPage + 1) }))) : null));
}

exports.default = Paginoid;