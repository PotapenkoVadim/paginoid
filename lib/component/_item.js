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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export var PaginoidItem = function (_a) {
    var page = _a.page, isActive = _a.isActive, itemsClassName = _a.itemsClassName, activeClassName = _a.activeClassName, handleClick = _a.handleClick;
    var handleKeyDown = function (event) {
        if (event.code === 'Enter')
            handleClick(page.value);
    };
    var _b = useState('paginoid_item'), itemsClass = _b[0], setItemsClass = _b[1];
    useEffect(function () {
        if (itemsClassName)
            setItemsClass(itemsClassName);
    }, [itemsClassName]);
    var _c = useState('paginoid_button__active'), activeItemClass = _c[0], setActiveItemClass = _c[1];
    useEffect(function () {
        if (activeClassName)
            setActiveItemClass(activeClassName);
    }, [activeClassName]);
    return (_jsx("div", __assign({ tabIndex: 0, role: 'button', className: "\n        " + itemsClass + "\n        " + (isActive ? activeItemClass : '') + "\n        paginoid_clickable\n      ", onKeyDown: handleKeyDown, onClick: function () { return handleClick(page.value); } }, { children: _jsx("span", __assign({ className: 'paginoid_button' }, { children: page.title }), void 0) }), void 0));
};
