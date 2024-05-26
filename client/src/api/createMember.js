import { notification } from "../components/Notification";
import { useMutation } from '@tanstack/react-query';
import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import {queryClient} from '../utils/queryClient'

const createMember = async (payload) => {
  try {
    const { data } = await httpRequest.post(ApiEndPoints.CREATE_MEMBER, {...payload});
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useCreateMember = () => {
  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MEMBERS'] });
      notification.success("Member Added Successfully");
    },
  });
};
