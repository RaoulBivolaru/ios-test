import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useAddTaskMutation } from "../store/modules/todos";

const STextarea = styled.textarea`
  width: 100%;
  border-radius: 1rem;
  font-family: sans-serif;
  padding: 1rem;
`;

const SAddTaskContainer = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

const SAddTaskCTA = styled.button`
  border-radius: 1rem;
  font-weight: bold;
  outline: none;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  background: #419dff;
`;

const AddTask = () => {
  const router = useRouter();
  const userId = Number(router.query.userId);
  const [task, setTask] = useState("");
  const [addTask] = useAddTaskMutation();

  const handleAdd = useCallback(() => {
    if (task) {
      addTask({
        userId,
        title: task,
      });
      setTask("");
    }
  }, [userId, task, addTask]);

  return (
    <SAddTaskContainer>
      <STextarea
        rows={4}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task information..."
      />
      <SAddTaskCTA onClick={handleAdd}>Add</SAddTaskCTA>
    </SAddTaskContainer>
  );
};

export default AddTask;
