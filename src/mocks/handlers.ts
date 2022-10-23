import { rest } from "msw";
import { TodoDeleteReq, TodoSaveReq } from "../types";

let todoList = [
  {
    id: 1,
    todo: "먹기",
  },
  {
    id: 2,
    todo: "자기",
  },
  { id: 3, todo: "싸기" },
];

let currentId = todoList.length;

export const handlers = [
  // 할일 목록
  rest.get("/todos", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoList));
  }),

  // 할일 추가
  rest.post("/todos", (req: { body: TodoSaveReq }, res, ctx) => {
    currentId += 1;
    todoList.push({ id: currentId, todo: req.body.todo });
    return res(ctx.status(201));
  }),

  rest.post("/todos/delete", (req: { body: TodoDeleteReq }, res, ctx) => {
    req.body.idList.forEach((id) => {
      todoList = todoList.filter((todo) => todo.id !== id);
    });
    return res(ctx.status(202));
  }),
];
