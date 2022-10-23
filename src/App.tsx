import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { TodoListType } from "./types";
import Todo from "./components/Todo";

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
  const onDeleteTodo = useCallback(async () => {
    try {
      if (!checkedTodoIdList.length) {
        alert("삭제할 할 일을 선택해주세요.");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post("/todos/delete", {
        idList: checkedTodoIdList,
      });

      fetchTodoList();
    } catch (error) {
      console.log(error);
    }
  }, [checkedTodoIdList, fetchTodoList]);

  return (
    <>
      <ul>
        {todoList.map((todo, index) => (
          <Todo
            key={`todo-list-item-${todo.id}-${index}`}
            todo={todo}
            setCheckedTodoIdList={setCheckedTodoIdList}
            fetchTodoList={fetchTodoList}
          />
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
    </>
  );
}

export default App;
