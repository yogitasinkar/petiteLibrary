import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import { useQuery } from '@tanstack/react-query';


const fetchBooks = async (page, limit, searchName, searchAuthor, searchPublisher, filterIssued) => {
  try {
    const { data } = await httpRequest.get(ApiEndPoints.FETCH_ALL_BOOKS, {
      params: {
        page,
        limit,
        name: searchName,
        author: searchAuthor,
        publisher: searchPublisher,
        filterIssued: filterIssued ? filterIssued.toString() : undefined,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useAllBooksQuery = (page, limit, searchName, searchAuthor, searchPublisher, filterIssued) => useQuery({
  queryKey: ['Books', page, limit, searchName, searchAuthor, searchPublisher],
  queryFn: () => fetchBooks(page, limit, searchName, searchAuthor, searchPublisher, filterIssued),
});


const fetchSearchedBooks = async (searchName) => {
  try {
    const { data } = await httpRequest.get(ApiEndPoints.FETCH_SEARCHED_BOOKS, {
      params: {
        name: searchName,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useSearchedBooksQuery = (searchName, enabled) => useQuery({
  queryKey: ['SearchedBooks', searchName],
  queryFn: () => fetchSearchedBooks(searchName),
  enabled
});
