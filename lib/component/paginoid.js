var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { PaginoidItem } from './_item';
import { PaginoidArrow } from './_arrow';
import { range } from '../utils';
import './style.css';
export function Paginoid(_a) {
    var total = _a.total, perPage = _a.perPage, currentPage = _a.currentPage, handleChange = _a.handleChange, _b = _a.prevButtonTitle, prevButtonTitle = _b === void 0 ? 'Left' : _b, _c = _a.nextButtonTitle, nextButtonTitle = _c === void 0 ? 'Right' : _c, containerClassName = _a.containerClassName, arrowsClassName = _a.arrowsClassName, itemsClassName = _a.itemsClassName, activeItemClassName = _a.activeItemClassName, disabledArrowClassName = _a.disabledArrowClassName;
    var _d = useState(0), pagesCount = _d[0], setPagesCount = _d[1];
    var _e = useState({ left: false, right: false }), activeArrows = _e[0], setActiveArrows = _e[1];
    var createPageItem = function (isContainsValue, value) {
        return isContainsValue ? { title: String(value), value: value } : { title: String('...'), value: value };
    };
    var createPagesArray = function (currentPage, pagesCount) {
        var firstPage = 1;
        var paginationSlotsCount = 7;
        var pages = [];
        var penultPage = pagesCount - 1;
        if (pagesCount <= paginationSlotsCount) {
            for (var i = firstPage; i <= pagesCount; i++) {
                pages.push(createPageItem(true, i));
            }
        }
        else {
            var returnActionDependsPositionCurrentPage_1 = function (action) {
                var isFirtsPages = currentPage < paginationSlotsCount - 2;
                var isLastPages = currentPage >= penultPage - 2;
                switch (true) {
                    case isFirtsPages: return action.start;
                    case isLastPages: return action.end;
                    default: return action.center;
                }
            };
            var generatedPages = range(pagesCount + 1)
                .map(function (item, index) { return returnActionDependsPositionCurrentPage_1({
                start: createPageItem(index < paginationSlotsCount - 2, item),
                end: createPageItem(index > penultPage - 5, item),
                center: createPageItem(!(index > currentPage || index < currentPage - 2), item)
            }); })
                .filter(function (_, index) { return returnActionDependsPositionCurrentPage_1({
                start: index < paginationSlotsCount - 1 && index > 0,
                end: index > penultPage - 6 && index < penultPage,
                center: !(index > currentPage + 1 || index < currentPage - 3)
            }); });
            pages.push(createPageItem(true, firstPage));
            pages.push.apply(pages, generatedPages);
            pages.push(createPageItem(true, pagesCount));
        }
        return pages;
    };
    var pagesArray = createPagesArray(currentPage, pagesCount);
    var _f = useState(pagesArray), pages = _f[0], setPages = _f[1];
    var goToPage = function (page) {
        var validatePage = 0;
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
    useEffect(function () {
        setPages(createPagesArray(currentPage, pagesCount));
        setActiveArrows({ left: currentPage > 1, right: currentPage < pagesCount });
    }, [currentPage, pagesCount]);
    useEffect(function () { return setPagesCount(Math.ceil(total / perPage)); }, [total, perPage]);
    var _g = useState(''), containerClass = _g[0], setContainerClass = _g[1];
    useEffect(function () {
        if (containerClassName)
            setContainerClass(containerClassName);
    }, [containerClassName]);
    return (_jsx(_Fragment, { children: pages.length ? (_jsxs("div", __assign({ className: "paginoid " + containerClass }, { children: [_jsx(PaginoidArrow, { disabledArrowClassName: disabledArrowClassName, arrowsClassName: arrowsClassName, isActive: activeArrows.left, arrowTitle: prevButtonTitle, handleClick: function () { return goToPage(currentPage - 1); } }, void 0), _jsx("ul", __assign({ className: 'paginoid_list' }, { children: pages.map(function (item) { return (_jsx("li", { children: _jsx(PaginoidItem, { activeClassName: activeItemClassName, itemsClassName: itemsClassName, page: item, isActive: item.value === currentPage, handleClick: goToPage }, void 0) }, item.value)); }) }), void 0), _jsx(PaginoidArrow, { disabledArrowClassName: disabledArrowClassName, arrowsClassName: arrowsClassName, isActive: activeArrows.right, arrowTitle: nextButtonTitle, handleClick: function () { return goToPage(currentPage + 1); } }, void 0)] }), void 0)) : null }, void 0));
}
