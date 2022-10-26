import { NextApiRequest, NextApiResponse } from "next";

const ENDPOINT = "https://jsonplaceholder.typicode.com";

export interface Task {
  id: number;
  completed: boolean;
  userId: number;
  title: string;
}

export interface TaskUserPayload {
  taskId: number;
  userId: number;
}

//Simulate DB
const userTodos = async (req: NextApiRequest): Promise<Task[]> => {
  try {
    const userId = Number(req.query.userId || req.body.userId);
    const response = await fetch(`${ENDPOINT}/users/${userId}/todos`);

    return response.json();
  } catch (e) {
    console.error(e);
  }

  return [];
};

const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await userTodos(req);

  res.status(200).json(data);
};

const completeTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const taskId = Number(req.query.id?.[0]);
  const tasks = await userTodos(req);
  const task = tasks.find((task) => task.id === taskId);

  res.status(200).json({ ...task, completed: true });
};

const addTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const newTask = { ...req.body, id: Date.now(), completed: false };

  res.status(200).json(newTask);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await getTasks(req, res);
  }
  if (req.method === "PATCH") {
    await completeTask(req, res);
  }
  if (req.method === "POST") {
    await addTask(req, res);
  }
  if (req.method === "DELETE") {
    res.status(200).json({ success: true });
  }
};
