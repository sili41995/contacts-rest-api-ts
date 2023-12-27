import {
  IFilterUpdateData,
  INewContact,
  IUnsetData,
  IUpdateData,
} from '../types/types';

const filterFieldsToUpdate = (data: INewContact): IFilterUpdateData => {
  const unset: IUnsetData = {};
  const set: IUpdateData = {};

  const keys: (keyof INewContact)[] = Object.keys(
    data
  ) as (keyof INewContact)[];
  keys.forEach((key) => {
    data[key] === '' ? (unset[key] = 1) : (set[key] = data[key] as string);
  });

  return { set, unset };
};

export default filterFieldsToUpdate;
