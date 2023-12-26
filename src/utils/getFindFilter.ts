import { IFilter, IFindFilterProps, IFindFilterValues } from '../types/types';

const getFindFilter = ({
  owner,
  query,
}: IFindFilterProps): IFindFilterValues => {
  const { page = 1, limit = 10, favorite } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const findFilter: IFilter = { owner };

  if (favorite === 'false' || favorite === 'true') {
    findFilter.favorite = favorite;
  }

  return { skip, limit: Number(limit), findFilter };
};

export default getFindFilter;
