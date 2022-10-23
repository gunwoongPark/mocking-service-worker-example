import axios from "axios";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { TodoListType } from "../types";

function Todo(props: {
  todo: TodoListType;
  setCheckedTodoIdList: Dispatch<SetStateAction<number[]>>;
  fetchTodoList: () => void;
}) {
  // useState
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);

  const [modifyInput, setModifyInput] = useState<string>("");

  // useEffect
  useEffect(() => {
    if (isModifyMode) {
      setModifyInput(props.todo.todo);
    }
  }, [isModifyMode]);

  // function
  const onChangeCheckbox = useCallback(
    (e: ChangeEvent<HTMLInputElement>, clickedId: number) => {
      if (e.target.checked) {
        props.setCheckedTodoIdList((prevCheckedList) => [
          ...prevCheckedList,
          clickedId,
        ]);
      } else {
        props.setCheckedTodoIdList((prevCheckedList) =>
          prevCheckedList.filter((checkedTodoId) => checkedTodoId !== clickedId)
        );
      }
    },
    [props]
  );

  const onClickModify = useCallback(async () => {
    try {
      if (!modifyInput) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post("/todos/modify", {
        id: props.todo.id,
        todo: modifyInput,
      });

      props.fetchTodoList();
    } catch (error) {
      console.log(error);
    } finally {
      setIsModifyMode(false);
    }
  }, [modifyInput, props]);

  return (
    <Pub.Container>
      {isModifyMode ? (
        <input
          value={modifyInput}
          onChange={(e) => setModifyInput(e.target.value)}
        />
      ) : (
        <li>{props.todo.todo}</li>
      )}

      <input
        type="checkbox"
        onChange={(e) => onChangeCheckbox(e, props.todo.id)}
      />
      {isModifyMode ? (
        <>
          <button onClick={() => setIsModifyMode(false)}>cancel</button>
          <button onClick={() => onClickModify()}>save</button>
        </>
      ) : (
        <button onClick={() => setIsModifyMode(true)}>modify</button>
      )}
    </Pub.Container>
  );
}

export default Todo;

const Pub = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
};
