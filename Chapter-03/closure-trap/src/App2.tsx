import { Reducer, useEffect, useReducer } from "react";

interface Action {
  type: "add" | "minus";
  num: number;
}
function reducer(state: number, action: Action) {
  switch (action.type) {
    case "add":
      return state + action.num;
    case "minus":
      return (state = action.num);
    default:
      return state;
  }
}
function App() {
  const [count, dispatch] = useReducer(reducer, 0);
  useEffect(() => {
    console.log("count", count);
    setInterval(() => {
      dispatch({ type: "add", num: 1 });
    }, 1000);
  }, []);
  return <div>{count}</div>;
}

export default App;
