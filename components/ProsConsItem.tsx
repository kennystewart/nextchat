import React from "react";

const Faq = (props) => {
  const pro = props.data;
  return (
    <>
      {pro.map((d) => (
        <li key={d.id}>
          <span className="font-medium">{d.title}:</span> {d.text}
        </li>
      ))}
    </>
  );
};
export default Faq;
