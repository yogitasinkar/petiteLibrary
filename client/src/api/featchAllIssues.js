import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const responseTransformer = (data) => {
  const newIssuesData = data.map((issue)=> {
    return {
      _id:issue._id,
      book: issue.book.name,
      member: issue.member.name,
      issueDate: dayjs(issue.issueDate).local().format('DD-MM-YYYY'),  
      dueDate: dayjs(issue.dueDate).local().format('DD-MM-YYYY'),
      returnDate: issue.returnDate ? dayjs(issue.returnDate).local().format('DD-MM-YYYY') : null,
    }
  }) 

  return {
    issues: newIssuesData
  }
}

const fetchIssues = async (page, limit) => {
  try {
    const { data } = await httpRequest.get(ApiEndPoints.FETCH_ALL_ISSUES, {
      params: {
        page,
        limit,
      },
    });
    return responseTransformer(data);
  } catch (err) {
    throw new Error(err);
  }
};

export const useAllIssuesQuery = (page, limit) => useQuery({
  queryKey: ['Issues', page, limit],
  queryFn: () => fetchIssues(page, limit),
});
