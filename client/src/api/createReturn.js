import { notification } from "../components/Notification";
import { useMutation } from '@tanstack/react-query';
import { ApiEndPoints } from '../constants';
import  httpRequest  from '../utils/httpRequest';
import {queryClient} from '../utils/queryClient'
import { interpolateEndpoint } from "../utils/helper";

const createReturn = async (payload) => {
  console.log(payload)
  try {
    const endpoint = interpolateEndpoint(ApiEndPoints.CREATE_RETURN, {id: payload.id});
    const { data } = await httpRequest.put(endpoint, { returnDate: payload.returnDate});
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useCreateReturn = () => {
  return useMutation({
    mutationFn: createReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Issues'] });
      notification.success("Book Returned Successfully");
    },
  });
};
