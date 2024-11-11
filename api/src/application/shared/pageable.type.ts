export interface Pageable<T> {
    meta: {
        page: number;
        totalPages: number;
        limit: number;
        total: number;
    },
    data: T[];
}