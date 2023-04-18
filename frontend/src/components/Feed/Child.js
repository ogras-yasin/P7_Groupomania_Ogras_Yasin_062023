import React from "react";
import Button from "../UI/Button";

const Child = (props) => {
  console.log(props);
  const data = "from childToParent ";
  return (
    <div>
      <Button onClickProps={() => props.childToParent(data)}>
        Cliquez sur enfant{" "}
      </Button>
    </div>
  );
};

export default Child;
