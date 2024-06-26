import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import { fetchUsers, User } from '../api/service';
import exit from '../assets/icons/exit.svg';

const UsersMenu: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='users-menu-container'>
      <div className='users-menu-header-container'>
        <div className='users-menu-button-box'>
          <button className='user-button' onClick={handleLogout}>Выход</button>
          <button className='user-button-icon' onClick={handleLogout}><img src={exit} alt='exit' /></button>
        </div>

        <h1 className='users-menu-heading'>Наша команда</h1>
        <h2 className='users-menu-text'>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
        </h2>
      </div>

      <div className='users-menu-list'>
        {users.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            avatar={user.avatar}
            firstName={user.first_name}
            lastName={user.last_name}
          />
        ))}
      </div>

      <div className='pagination'>
        <button className='pagination-button' onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span className='pagination-text'>Page {page} of {totalPages}</span>
        <button className='pagination-button' onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersMenu;