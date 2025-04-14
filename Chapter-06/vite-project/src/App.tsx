import React, { useEffect, useState } from "react";

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}
function Calendar(props: CalendarProps) {
  const { defaultValue = new Date(), onChange } = props;
  const [value, setValue] = useState(defaultValue);
  function changeValue(date: Date) {
    setValue(date);
    onChange?.(date);
  }
  return (
    <div>
      {value.toLocaleDateString()}

      <div
        onClick={() => {
          changeValue(new Date("2025-4-14"));
        }}
      >
        2025-4-14
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2025-4-15"));
        }}
      >
        2025-4-15
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2025-4-16"));
        }}
      >
        2025-4-16
      </div>
    </div>
  );
}
function App() {
  const [value, setValue] = useState("hello world");
  const inputRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      console.log(inputRef.current?.value);
    }, 1000);
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change", e);
    setValue(e.target.value);
  };
  console.log("render");
  return (
    <>
      {/* <input
        defaultValue={"hello world"}
        onChange={onChange}
        ref={inputRef}
      ></input> */}
      {/* <input value={value} onChange={onChange}></input> */}
      <Calendar onChange={(date) => console.log(date)}></Calendar>
    </>
  );
}

export default App;
