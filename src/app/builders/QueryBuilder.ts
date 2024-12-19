import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>){
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]){
        const search = this?.query?.search;
        if(search){
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field: string) => ({
                        [field]: {$regex: search, $options: 'i'},

                    }) as FilterQuery<T>
                )
            })
        }
        return this;
    }
    
    sort(){
        const sortBy = (this.query?.sortBy as string) || 'createdAt';
        const sortOrder = (this.query?.sortOrder as string) === 'asc' ? '' : '-';
        this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
        return this;
    }

    filter(filterableFields: string[]) {
        const filters: Record<string, unknown> = {};
        filterableFields.map((field) => {
            if (this.query[field]) {
                filters[field] = this.query[field];
            }
        });
        if (this.query.filter) {
            filters["author"] = this.query.filter;
        }
    
        this.modelQuery = this.modelQuery.find(filters as FilterQuery<T>);
        return this;
    }
    
}


export default QueryBuilder;