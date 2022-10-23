export interface TodoListType {
  id: number;
  todo: string;
}

export interface TodoSaveReq {
  todo: string;
}

export interface TodoDeleteReq {
  idList: number[];
}
