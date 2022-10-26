import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useGetTasksQuery } from "../store/modules/todos";
import Todo from "./Todo";

const STodos = styled.section`
  margin-top: 2rem;
  height: 100%;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  min-width: 40rem;
`;

const Todos = () => {
  const router = useRouter();
  const userId = Number(router.query.userId);
  const { data } = useGetTasksQuery(userId);

  return (
    <STodos>
      {data?.map((task) => (
        <Todo task={task} key={task.id} />
      ))}
    </STodos>
  );
};

export default Todos;
