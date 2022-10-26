import React from "react";
import styled from "styled-components";
import useTaskActions from "../hooks/useTaskActions";
import { Task } from "../pages/api/todos/[[...id]]";

interface ITodo {
  task: Task;
}

const STodo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border: 1px solid #999999;
  padding: 2rem 1rem;
  background: ${(props) => (props.theme.accent ? "#419dff" : "white")};
  color: ${(props) => (props.theme.accent ? "white" : "black")};
`;

const SButton = styled.button`
  border-radius: 1rem;
  font-weight: bold;
  border: 1px solid #dfdfdf;
  outline: none;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  background: ${(props) => (props.theme.accent ? "#ff7b7b" : "white")};
  color: ${(props) => (props.theme.accent ? "white" : "black")};
`;

const STodoActions = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: bold;
  font-size: 1rem;
`;

const SHeading = styled.h2`
  font-size: 1rem;
  max-width: 24rem;
  margin: 0;
  &:first-letter {
    text-transform: uppercase;
  }
`;

const Todo = ({ task }: ITodo) => {
  const { finishTask, removeTask } = useTaskActions();

  return (
    <STodo theme={{ accent: task.completed }}>
      <SHeading>{task.title}</SHeading>
      <STodoActions>
        {!task.completed && (
          <SButton onClick={() => finishTask(task.id)}>Complete</SButton>
        )}
        <SButton theme={{ accent: true }} onClick={() => removeTask(task.id)}>
          Remove
        </SButton>
      </STodoActions>
    </STodo>
  );
};

export default Todo;
