import { notification } from "../components/Notification";
import { useMutation } from '@tanstack/react-query';
import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import {queryClient} from '../utils/queryClient'

const createBook = async (payload) => {
  try {
    const { data } = await httpRequest.post(ApiEndPoints.CREATE_BOOK, {...payload});
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useCreateBook = () => {
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Books'] });
      notification.success("Book Added Successfully");
    },
  });
};
