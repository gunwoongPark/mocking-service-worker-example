import { rest } from "msw";
import { TodoSaveReq } from "../types";
import todoList from "./db";

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
];
