import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { TodoListType } from "./types";
import styled from "styled-components";

function App() {
  // useState
  const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");
  const [checkedTodoIdList, setCheckedTodoIdList] = useState<number[]>([]);

  // useEffect
  useEffect(() => {
    fetchTodoList();
  }, []);

  // function
  // fetch todo list
  const fetchTodoList = useCallback(async () => {
    try {
      const res = await axios.get("/todos");

      console.log(res);

      setTodoList(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // save todo
  const onSaveTodo = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post("/todos", {
        todo: todoInput,
      });

      fetchTodoList();
    } catch (error) {
      console.log(error);
    } finally {
      setTodoInput("");
    }
  }, [todoInput, fetchTodoList]);

  // delete todo
  const onDeleteTodo = useCallback(() => {
    if (!checkedTodoIdList.length) {
      alert("삭제할 할 일을 선택해주세요.");
      return;
    }
  }, [checkedTodoIdList.length]);

  useEffect(() => {
    console.log(checkedTodoIdList);
  }, [checkedTodoIdList]);

  const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      console.log("check on !!");
    } else {
      console.log("check off !!");
    }
  }, []);

  return (
    <Pub.Container>
      <ul>
        {todoList.map((todo, index) => (
          <div className="todo-container">
            <li key={`todo-list-item-${index}-${todo.id}`}>{todo.todo}</li>
            <input type="checkbox" onChange={(e) => onChangeCheckbox(e)} />
          </div>
        ))}
      </ul>
      <div>
        <input
          type="text"
          onChange={(e) => setTodoInput(e.target.value)}
          onBlur={() => setTodoInput((prevInputState) => prevInputState.trim())}
          value={todoInput}
        />
        <button onClick={() => onSaveTodo()}>save</button>
      </div>
      <button onClick={() => onDeleteTodo()}>delete</button>
    </Pub.Container>
  );
}

export default App;

const Pub = {
  Container: styled.div`
    .todo-container {
      display: flex;
      align-items: center;
    }
  `,
};
