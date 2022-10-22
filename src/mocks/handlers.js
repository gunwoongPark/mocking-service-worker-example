import { rest } from "msw";

const todoList = ["먹기", "자기", "놀기"];

export const handlers = [
  // 할일 목록
  rest.get("/todos", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoList));
  }),

  // 할일 추가
  rest.post("/todos", (req, res, ctx) => {
    todoList.push(req.body.todo);
    return res(ctx.status(201));
  }),
];
