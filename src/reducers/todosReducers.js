import { v4 as uuidv4 } from "uuid";

export default function reducer(currentToDos, action) {
  switch (action.type) {
    case "added": {
      const newToDo = {
        id: uuidv4(),
        title: action.payLoad.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentToDos, newToDo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentToDos.filter((t) => {
        return t.id != action.payLoad.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      const updatedTodos = currentToDos.map((t) => {
        if (t.id == action.payLoad.id) {
          return {
            ...t,
            title: action.payLoad.title,
            details: action.payLoad.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const StorageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return StorageTodos;
    }
    case "checked": {
  
      const updatedTodos = currentToDos.map((t) => {
        if (t.id === action.payLoad.id) {
          const updatedTODO = {
            ...t,
            isCompleted: !t.isCompleted,

          };
           return updatedTODO;
          //  t.isCompleted = !t.isCompleted;//MUTITION
        }

        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default: {
      throw Error("unknown Action" + action.type);
    }
  }
  return [];
}
