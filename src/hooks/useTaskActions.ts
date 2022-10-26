import { useRouter } from "next/router";
import {
  useCompleteTaskMutation,
  useRemoveTaskMutation,
} from "../store/modules/todos";

const useTaskActions = () => {
  const router = useRouter();
  const userId = Number(router.query.userId);

  const [finishTask] = useCompleteTaskMutation();
  const [removeTask] = useRemoveTaskMutation();

  return {
    finishTask: (taskId: number) => finishTask({ taskId, userId }),
    removeTask: (taskId: number) => removeTask({ taskId, userId }),
  };
};

export default useTaskActions;
