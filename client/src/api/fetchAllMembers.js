import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import { useQuery } from '@tanstack/react-query';


const fetchMembers = async (page, limit) => {
  try {
    const { data } = await httpRequest.get(ApiEndPoints.FETCH_ALL_MEMBERS, {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useAllMembersQuery = (page, limit) => useQuery({
  queryKey: ['Members', page, limit],
  queryFn: () => fetchMembers(page, limit),
});
