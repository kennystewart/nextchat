import React from "react";
import Collapse from "./Collapse";

const Faq = (props) => {
  if (!props.data[0]?.question) {
    return;
  }
  const faq = props.data;
  return (
    <div id="faq" className="">
      <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
        Frequently asked questions
      </h3>
      {faq.map(function (d, id) {
        return (
          <>
            <hr className="border-sky-700 dark:border-white" />
            <Collapse data={d} />
          </>
        );
      })}
    </div>
  );
};
export default Faq;
