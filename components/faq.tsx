import React from "react";
import Collapse from "./Collapse";

const Faq = (props) => {
    if (!props.faq){
      return;
    }
    const faq = '';
   // const question = "Why Are we not done yest?";
   // const answer = "Bacause were going very slow";
   // const faq= {question,answer};
return (
<div id="faq" className="">
  <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
    Frequently asked questions
  </h3>
  <hr className="border-sky-700 dark:border-white" />
  <Collapse faq={faq}/>
  <hr className="border-sky-700 dark:border-white" />
  <Collapse faq={faq}/>
</div>
    );
};
export default Faq;
