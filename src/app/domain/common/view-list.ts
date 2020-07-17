export interface ViewList<T> {
  data: T[];
  extra: ViewListExtra;
}

export interface ViewListExtra {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export function defaultViewList<T>(): ViewList<T> {
  return {
    data: [],
    extra: {
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalElements: 0,
      isFirst: false,
      isLast: false,
    },
  };
}
