import { IFilterUpdateData, IUnsetData, IUpdateData } from 'types/types';

const filterFieldsToUpdate = (data: IUpdateData): IFilterUpdateData => {
  const unset: IUnsetData = {};
  const set: IUpdateData = {};

  const keys: string[] = Object.keys(data);
  keys.forEach((key) => {
    data[key] === '' ? (unset[key] = 1) : (set[key] = data[key]);
  });

  return { set, unset };
};

export default filterFieldsToUpdate;
