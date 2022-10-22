import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { TodoListType } from "./types";

function App() {
  // useState
  const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");

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

  return (
    <>
      <ul>
        {todoList.map((todo, index) => (
          <li key={`todo-list-item-${index}-${todo.id}`}>{todo.todo}</li>
        ))}
      </ul>
      <input
        type="text"
        onChange={(e) => setTodoInput(e.target.value)}
        onBlur={() => setTodoInput((prevInputState) => prevInputState.trim())}
        value={todoInput}
      />
      <button onClick={() => onSaveTodo()}>submit</button>
    </>
  );
}

export default App;
