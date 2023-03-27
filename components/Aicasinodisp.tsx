import React from "react";

interface Props {
  name: string;
  image: string;
  description: string;
  bonuses: string[];
  casinoUrl: string;
  reviewUrl: string;
}

const CasinoD: React.FC<Props> = ({
  name,
  image,
  description,
  bonuses,
  casinoUrl,
  reviewUrl,
}) => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                className="h-full w-full md:rounded-l-lg md:rounded-r-none"
                src={image}
                alt="Casino Image"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">{name}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {description}
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Bonuses</h3>
                <ul className="list-disc list-inside">
                  {bonuses.map((bonus) => (
                    <li key={bonus}>{bonus}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center">
                <a
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                  href={casinoUrl}
                >
                  Visit Casino
                </a>
                <a
                  className="inline-block text-blue-500 hover:text-blue-700 font-bold"
                  href={reviewUrl}
                >
                  Read Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoD;