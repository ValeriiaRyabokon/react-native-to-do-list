import {
    ADD_TODO,
    DELETE_TODO,
    SHOW_LOADER,
    UPDATE_TODO,
    HIDE_LOADER,
    SHOW_ERROR,
    CLEAR_ERROR,
    FETCH_TODOS,
} from "../types";

const handlers = {
    [ADD_TODO]: (state, { title }) => ({
        ...state,
        todos: [...state.todos, { title, id }],
    }),
    [DELETE_TODO]: (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
    }),
    [UPDATE_TODO]: (state, { id, title }) => ({
        ...state,
        todos: state.todos.map((todo) => {
            if (todo.id === id) {
                todo.title = title;
            }
            return todo;
        }),
    }),
    [SHOW_LOADER]: (state) => ({...state, loading: true }),
    [HIDE_LOADER]: (state) => ({...state, loading: false }),
    [SHOW_ERROR]: (state, { error }) => ({...state, error }),
    [CLEAR_ERROR]: (state) => ({...state, error: null }),
    [FETCH_TODOS]: (state, { todos }) => ({...state, todos }),
    DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};