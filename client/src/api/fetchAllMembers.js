import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import { useQuery } from '@tanstack/react-query';


const fetchMembers = async (page, limit, searchName, searchPhone) => {
  try {
    const { data } = await httpRequest.get(ApiEndPoints.FETCH_ALL_MEMBERS, {
      params: {
        page,
        limit,
        name: searchName,
        phone: searchPhone,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useAllMembersQuery = (page, limit, searchName, searchPhone) => useQuery({
  queryKey: ['Members', page, limit, searchName, searchPhone],
  queryFn: () => fetchMembers(page, limit, searchName, searchPhone),
});


const fetchSearchedMembers = async (searchName) => {
  try {
    const { data } = await httpRequest.get(ApiEndPoints.FETCH_SEARCHED_MEMBERS, {
      params: {
        name: searchName,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useSearchedMembersQuery = (searchName, enabled) => useQuery({
  queryKey: ['SearchedMembers', searchName],
  queryFn: () => fetchSearchedMembers(searchName),
  enabled
});