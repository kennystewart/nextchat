
import React from "react";
const FaqJsonLD = () => {
const faq = {__html:'{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"WHat is 1","acceptedAnswer":{"@type":"Answer","text":"Its less than 2"}},{"@type":"Question","name":"What is 3","acceptedAnswer":{"@type":"Answer","text":"Not 1"}}]}'};
return (
    <script
          type="application/ld+json"
          dangerouslySetInnerHTML={faq}
          key="faq-jsonld"
        />

)};

//export 
export default FaqJsonLD