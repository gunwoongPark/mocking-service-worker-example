import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  // useState
  const [todoInput, setTodoInput] = useState<string>("");

  // useEffect
  useEffect(() => {
    fetchTodoList();
  }, []);

  // function
  const fetchTodoList = useCallback(async () => {
    try {
      const res = await axios.get("/todos");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSaveTodo = useCallback(async () => {
    try {
      const res = await axios.post("/todos", {
        todo: todoInput,
      });

      console.log(res);

      fetchTodoList();
    } catch (error) {
      console.log(error);
    } finally {
      setTodoInput("");
    }
  }, [todoInput]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setTodoInput(e.target.value)}
        onBlur={(e) => setTodoInput((prevInputState) => prevInputState.trim())}
        value={todoInput}
      />
      <button onClick={() => onSaveTodo()}>submit</button>
    </>
  );
}

export default App;
