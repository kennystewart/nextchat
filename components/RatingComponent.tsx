import { useState } from 'react';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { BsFillStarFill} from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";

function RatingComponent({ type, id }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(Cookies.get(`${type}-${id}-ratingSubmitted`));
  const { data: session } = useSession();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      Cookies.set(`${type}-${id}-ratingSubmitted`, true, { expires: 365 });
      setSubmitted(true);
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          id: id,
          rating: rating,
          comment: comment,
        }),
      });
      if (response.status === 200) {
        // Rating submitted successfully
        console.log(response);
      } else {
        throw new Error('Error submitting rating');
      }
    } catch (error) {
      console.error(error);
      // Display error message to the user
    }
  };
  
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starIcons.push(<BsFillStarFill key={i} />);
    } else {
      starIcons.push(<VscStarEmpty key={i} />);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-row items-center justify-center w-full">
        <div className="flex flex-row items-center justify-center">
          {starIcons}
        </div>
      </div>
      {session && (
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor="comment">Leave a comment:</label>
          <textarea id="comment" name="comment" value={comment} onChange={handleCommentChange} disabled={submitted}></textarea>
        </div>
      )}
      <button onClick={handleSubmit} disabled={submitted}>Submit rating</button>
    </div>
  );
}

export default RatingComponent;