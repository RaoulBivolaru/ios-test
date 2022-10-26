import { Task, TaskUserPayload } from "../../pages/api/todos/[[...id]]";
import { api } from "../api";

const SCOPE = "/todos";

export const todosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], number>({
      query: (id) => `${SCOPE}?userId=${id}`,
    }),
    completeTask: build.mutation<Task, TaskUserPayload>({
      query: ({ taskId, ...body }) => ({
        url: `${SCOPE}/${taskId}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const completedTask = dispatch(
          todosApi.util.updateQueryData("getTasks", body.userId, (draft) => {
            return draft.map((task) => {
              if (task.id === body.taskId) {
                return { ...task, completed: true };
              }
              return task;
            });
          })
        );

        queryFulfilled.catch(completedTask.undo);
      },
    }),
    removeTask: build.mutation<Task[], TaskUserPayload>({
      query: ({ taskId, ...body }) => ({
        url: `${SCOPE}/${taskId}`,
        method: "DELETE",
        body,
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const removedTask = dispatch(
          todosApi.util.updateQueryData("getTasks", body.userId, (draft) => {
            const idx = draft.findIndex((task) => task.id === body.taskId);
            draft.splice(idx, 1);
          })
        );

        queryFulfilled.catch(removedTask.undo);
      },
    }),
    addTask: build.mutation<Task, Omit<Task, "id" | "completed">>({
      query: (body) => ({
        url: SCOPE,
        method: "POST",
        body,
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        const removedTask = dispatch(
          todosApi.util.updateQueryData("getTasks", body.userId, (draft) => {
            draft.unshift(data);
          })
        );

        queryFulfilled.catch(removedTask.undo);
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTasksQuery,
  useCompleteTaskMutation,
  useAddTaskMutation,
  useRemoveTaskMutation,
} = todosApi;
