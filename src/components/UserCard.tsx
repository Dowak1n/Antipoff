import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import like from '../assets/icons/like.svg';
import likeActive from '../assets/icons/like-active.svg';

interface UserCardProps {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, avatar, firstName, lastName }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLike = localStorage.getItem(`like-${id}`);
    if (storedLike) {
      setLiked(JSON.parse(storedLike));
    }
  }, [id]);

  const toggleLike = (event: React.MouseEvent) => {
    event.preventDefault();
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(`like-${id}`, JSON.stringify(newLiked));
  };

  return (
    <Link className='card' to={`/user/${id}`}>
        <img className='card-image' src={avatar} alt={`${firstName} ${lastName}`} />
        <h2 className='card-text'>{`${firstName} ${lastName}`}</h2>
        <div className='card-bottom-side'>
          <div className='card-like' onClick={toggleLike}>
            <img src={liked ? likeActive : like} alt={liked ? 'like-active' : 'like'} />
          </div>
        </div>
    </Link>
  );
};

export default UserCard;