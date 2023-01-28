import React from "react";
const FaqJsonLD = (data) => {
  if (!data.data) {
    return;
  }
  console.log(data);
  let faqOut =
    '@context":"https://schema.org","@type":"FAQPage","mainEntity":[';

  data.data.map(function (d) {
    let faqQ =
      '{"@type":"Question","name":"' +
      d.question +
      '","acceptedAnswer":{"@type":"Answer","text":"' +
      d.answer +
      '"}},';
    faqOut = faqOut + faqQ;
  });

  faqOut = faqOut + "]}'};";

  const faq = {
    __html: faqOut,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={faq}
      key="faq-jsonld"
    />
  );
};

//export
export default FaqJsonLD;
