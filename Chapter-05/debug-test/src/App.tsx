import React from "react";
import { useState, useLayoutEffect } from "react";
async function queryData(): Promise<number> {
  const data = await new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(666);
    }, 2000);
  });
  return data;
}

function App() {
  const [num, setNum] = useState(0);
  useLayoutEffect(() => {
    queryData().then((data) => {
      setNum(data);
    });
  }, []);
  return (
    <div
      onClick={(e) => {
        setNum((prevNum) => prevNum + 1);
      }}
    >
      {num}
    </div>
  );
}

export default App;
