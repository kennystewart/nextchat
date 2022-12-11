import React from "react";
import Collapse from "./Collapse";

const Faq = (props) => {
   
   // if (!props.data.faq){
      return;
  // }  
    const faq = props.data.faq;
    console.log(props);
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
