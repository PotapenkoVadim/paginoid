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
export var PaginoidArrow = function (_a) {
    var handleClick = _a.handleClick, arrowTitle = _a.arrowTitle, arrowsClassName = _a.arrowsClassName, disabledArrowClassName = _a.disabledArrowClassName, _b = _a.isActive, isActive = _b === void 0 ? false : _b;
    var handleKeyDown = function (event) {
        if (event.code === 'Enter')
            handleClick();
    };
    var _c = useState('paginoid_arrow'), arrowsClass = _c[0], setArrowsClass = _c[1];
    useEffect(function () {
        if (arrowsClassName)
            setArrowsClass(arrowsClassName);
    }, [arrowsClassName]);
    var _d = useState('paginoid_arrow__disable'), disabledArrowClass = _d[0], setDisabledArrowClass = _d[1];
    useEffect(function () {
        if (disabledArrowClassName)
            setDisabledArrowClass(disabledArrowClassName);
    }, [disabledArrowClassName]);
    return (_jsx("div", __assign({ tabIndex: 0, role: 'button', "data-type": 'back', className: "\n        paginoid_clickable\n        " + arrowsClass + "\n        " + (!isActive ? disabledArrowClass : '') + "\n      ", onKeyDown: handleKeyDown, onClick: handleClick }, { children: arrowTitle }), void 0));
};
