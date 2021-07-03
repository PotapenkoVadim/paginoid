export var range = function (size, startAt) {
    if (startAt === void 0) { startAt = 1; }
    return Array.apply(null, Array(size)).map(function (_, i) { return i + startAt; });
};
