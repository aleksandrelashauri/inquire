import {
  GET_DATA_SUCCESS,
  ADD_DATA_SUCCESS,
  DELETE_TODO_SUCCESS,
  CLEAR_DATA_SUCCESS,
  EDIT_DATA_SUCCESS,
} from "../Constants/constantsInput";

export const getData = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});
export const editData = (payload) => ({
  type: EDIT_DATA_SUCCESS,
  payload,
});
export const clearData = (payload) => ({
  type: CLEAR_DATA_SUCCESS,
  payload,
});
export const addData = (payload) => ({
  type: ADD_DATA_SUCCESS,
  payload,
});
export const deleteData = () => ({ type: DELETE_TODO_SUCCESS, payload: null });
