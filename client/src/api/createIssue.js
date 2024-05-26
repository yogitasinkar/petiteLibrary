import { notification } from "../components/Notification";
import { useMutation } from '@tanstack/react-query';
import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import {queryClient} from '../utils/queryClient'

const createIssue = async (payload) => {
  console.log({payload})
  try {
    const { data } = await httpRequest.post(ApiEndPoints.CREATE_ISSUE, {...payload});
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useCreateIssue = () => {
  return useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Issues'] });
      notification.success("Book Issued Successfully");
    },
  });
};
