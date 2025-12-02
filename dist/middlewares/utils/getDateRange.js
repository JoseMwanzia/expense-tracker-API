"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDateRange = (filter) => {
    const today = new Date();
    let startDate, endDate;
    if (filter.duration == "last-week") {
        startDate = new Date(today.setDate(today.getDate() - today.getDay() - 7));
        endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    }
    else if (filter.duration == "past-month") {
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
    }
    else if (filter.duration == "three-months") {
        startDate = new Date(today.getFullYear(), today.getMonth() - 3);
        endDate = new Date(today.getFullYear(), today.getMonth());
    }
    else if (filter.startDate && filter.endDate) {
        startDate = new Date(filter.startDate);
        endDate = new Date(filter.endDate);
    }
    else {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }
    return { startDate, endDate };
};
exports.default = getDateRange;
//# sourceMappingURL=getDateRange.js.map