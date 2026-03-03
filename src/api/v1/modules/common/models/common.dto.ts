export interface ICreateDto {
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    employeeId?: string;
    status?: string;
    from?: string;
    to?: string;
}

export interface PaginatedData<T> {
    data: T[];
    pagination: PaginationMeta;
}