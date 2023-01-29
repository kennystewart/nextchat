import React from "react";
import Collapse from "./Collapse";

const Faq = (props) => {
  if (!props.data) {
    return;
  }
  const faq = props.data;
  return (
    <div id="faq">
      <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
        Frequently asked questions
      </h3>
      {faq.map(function (d, id) {
        const data = { d, id };
        return (
          <React.Fragment key={id}>
            <hr className="border-sky-700 dark:border-white" />
            <Collapse data={data} />
          </React.Fragment>
        );
      })}
      <hr className="border-sky-700 dark:border-white my-7"></hr>
    </div>
  );
};
export default Faq;
