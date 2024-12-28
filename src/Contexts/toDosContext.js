import { createContext, useContext, useReducer } from "react";
import reducer from '../reducers/todosReducers'; // Adjust the path as needed

// Create Context for ToDos
const toDosContext = createContext();

const ToDosProvider = ({ children }) => {
    const [toDos, toDosDispatch] = useReducer(reducer, []);

    return (
        <toDosContext.Provider value={{ toDos, toDosDispatch }}>
            {children}
        </toDosContext.Provider>
    );
};

// Custom Hook for accessing ToDos Context
export const useToDos = () => {
    return useContext(toDosContext);
};

export default ToDosProvider;
