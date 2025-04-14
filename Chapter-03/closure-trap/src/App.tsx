import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      console.log("count", count);
      // setCount(count + 1); 这时候的count 一直是 初始化count
      setCount((count) => count + 1);
    }, 1000);
  }, []);
  return <div>{count}</div>;
}

export default App;
