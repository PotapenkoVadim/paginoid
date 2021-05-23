import React, { useState, useEffect } from 'react';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bind = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(this && this[arg] || arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(this, arg));
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(this && this[key] || key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var styles = {"paginoid":"paginoid-module_paginoid__2XBa4","paginoid_arrow":"paginoid-module_paginoid_arrow__1seUc","paginoid_arrow__disable":"paginoid-module_paginoid_arrow__disable__1QK6N","paginoid_clickable":"paginoid-module_paginoid_clickable__1Pthk","paginoid_list":"paginoid-module_paginoid_list__3FPaX","paginoid_item":"paginoid-module_paginoid_item__3GvBe","paginoid_button":"paginoid-module_paginoid_button__3R7Uj","paginoid_button__active":"paginoid-module_paginoid_button__active__h6ybP"};

const cx$2 = bind.bind(styles);
const PaginoidItem = ({ page, isActive, itemsClassName, activeClassName, handleClick }) => {
    const handleKeyDown = (event) => {
        if (event.code === 'Enter')
            handleClick(page.value);
    };
    return (React.createElement("div", { tabIndex: 0, role: 'button', className: cx$2([itemsClassName, 'paginoid_item', 'paginoid_clickable']), onKeyDown: handleKeyDown, onClick: () => handleClick(page.value) },
        React.createElement("span", { className: cx$2({
                paginoid_button: true,
                paginoid_button__active: isActive,
                [activeClassName]: !!activeClassName && isActive,
            }) }, page.title)));
};

const cx$1 = bind.bind(styles);
const PaginoidArrow = ({ handleClick, arrowTitle, arrowsClassName, disabledArrowClassName, isActive = false }) => {
    const handleKeyDown = (event) => {
        if (event.code === 'Enter')
            handleClick();
    };
    return (React.createElement("div", { tabIndex: 0, role: 'button', "data-type": 'back', className: cx$1({
            paginoid_arrow: true,
            paginoid_clickable: true,
            paginoid_arrow__disable: !isActive,
            [arrowsClassName]: !!arrowsClassName,
            [disabledArrowClassName]: !!disabledArrowClassName && !isActive
        }), onKeyDown: handleKeyDown, onClick: handleClick }, arrowTitle));
};

const cx = bind.bind(styles);
function Paginoid({ total, perPage, currentPage, handleChange, prevButtonTitle = 'Left', nextButtonTitle = 'Right', containerClassName, arrowsClassName, itemsClassName, activeItemClassName, disabledArrowClassName }) {
    const [pagesCount, setPagesCount] = useState(0);
    const [activeArrows, setActiveArrows] = useState({ left: false, right: false });
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
            const range = (size, startAt = 1) => [...Array(size).keys()].map(i => i + startAt);
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
    const [pages, setPages] = useState(createPagesArray(currentPage, pagesCount));
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
    useEffect(() => {
        setPages(createPagesArray(currentPage, pagesCount));
        setActiveArrows({ left: currentPage > 1, right: currentPage < pagesCount });
    }, [currentPage, pagesCount]);
    useEffect(() => setPagesCount(Math.ceil(total / perPage)), []);
    return (React.createElement(React.Fragment, null, pages.length ? (React.createElement("div", { className: cx(['paginoid', containerClassName]) },
        React.createElement(PaginoidArrow, { disabledArrowClassName: disabledArrowClassName, arrowsClassName: arrowsClassName, isActive: activeArrows.left, arrowTitle: prevButtonTitle, handleClick: () => goToPage(currentPage - 1) }),
        React.createElement("ul", { className: cx('paginoid_list') }, pages.map((item) => (React.createElement("li", { key: item.value },
            React.createElement(PaginoidItem, { activeClassName: activeItemClassName, itemsClassName: itemsClassName, page: item, isActive: item.value === currentPage, handleClick: goToPage }))))),
        React.createElement(PaginoidArrow, { disabledArrowClassName: disabledArrowClassName, arrowsClassName: arrowsClassName, isActive: activeArrows.right, arrowTitle: nextButtonTitle, handleClick: () => goToPage(currentPage + 1) }))) : null));
}

export { Paginoid };
//# sourceMappingURL=index.es.js.map
