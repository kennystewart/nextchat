import React from "react";

const ProItem = (props) => {
  const pro = props.data;
  return (
    <>
      {pro.map((d) => (
        <li key={d.id}>
          <span className="font-medium">{d.title}:</span> {d.content}
        </li>
      ))}
    </>
  );
};
export default ProItem;
