"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    sort() {
        var _a, _b;
        const sortBy = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || 'createdAt';
        const sortOrder = ((_b = this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === 'asc' ? '' : '-';
        this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
        return this;
    }
    filter(filterableFields) {
        const filters = {};
        filterableFields.map((field) => {
            if (this.query[field]) {
                filters[field] = this.query[field];
            }
        });
        if (this.query.filter) {
            filters['author'] = this.query.filter;
        }
        this.modelQuery = this.modelQuery.find(filters);
        return this;
    }
}
exports.default = QueryBuilder;
