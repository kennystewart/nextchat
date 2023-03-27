import { useState } from 'react';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import StarIcon from '../icons/star.svg';
import FilledStarIcon from '../icons/filled-star.svg';

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

  const handleSubmit = () => {
    Cookies.set(`${type}-${id}-ratingSubmitted`, true, { expires: 365 });
    setSubmitted(true);
    // Here, you can send the rating and comment to your server using a fetch or axios request
    // The request should include the type, id, rating, and comment as parameters
  };

  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starIcons.push(<FilledStarIcon key={i} />);
    } else {
      starIcons.push(<StarIcon key={i} />);
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