import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import styled from "styled-components";
import { TodoListType } from "../types";

function Todo(props: {
  todo: TodoListType;
  setCheckedTodoIdList: Dispatch<SetStateAction<number[]>>;
}) {
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

  return (
    <Pub.Container>
      <li>{props.todo.todo}</li>
      <input
        type="checkbox"
        onChange={(e) => onChangeCheckbox(e, props.todo.id)}
      />
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
