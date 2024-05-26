import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import { useQuery } from '@tanstack/react-query';


const fetchIssues = async (page, limit) => {
  try {
    const { data } = await httpRequest.get(ApiEndPoints.FETCH_ALL_ISSUES, {
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

export const useAllIssuesQuery = (page, limit) => useQuery({
  queryKey: ['Issues', page, limit],
  queryFn: () => fetchIssues(page, limit),
});
