export interface IError extends Error {
  status: number;
}

export interface IUpdateData {
  [key: string]: string | boolean | number;
}

export interface IUnsetData {
  [key: string]: number;
}

export interface IFilterUpdateData {
  unset: { [key: string]: number };
  set: IUpdateData;
}
