"use client";

import React, { useState } from "react";

const Rating = () => {
    const [rating, setRating] = useState(0);
  
    return (
          <SelectRating
            rating={rating}
            setRating={setRating}
          />
    );
  };
  
  
const SelectRating = ({ rating, setRating }) => (
    <>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
  
            onClick={() => setRating(value)}
          >
            {rating >= value &&
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 w-20 h-20 text-rating_color" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd">
                </path>             
              </svg>}
            {rating < value &&
                <svg className="w-20 h-20 text-rating_color" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                    </path>
                </svg>
            }   
                
          </button>
        ))}
        </div>

    </>
  );
  
  export asyn function getServerSideProps (rate) {
    const rat = rate;
  }

  export default Rating;
