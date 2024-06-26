import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailIcon from '../assets/icons/email.svg';
import phoneIcon from '../assets/icons/phone.svg';
import { fetchUser, updateUserAvatar, User } from '../api/service';
import exit from '../assets/icons/exit.svg';
import arrow from '../assets/icons/arrow.svg';

const UserPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (userId: string) => {
    try {
      const data = await fetchUser(userId);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleAvatarChange = async () => {
    const urlPattern = /\.(jpg|jpeg|png|gif)$/i;
    if (!urlPattern.test(avatarUrl)) {
      alert('Введите корректный URL для изображения.');
      return;
    }
    try {
      const response = await updateUserAvatar(id!, avatarUrl);
      if (response.ok) {
        setUser({ ...user!, avatar: avatarUrl });
      } else {
        alert('Не удалось обновить аватар.');
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('Ошибка при обновлении аватара.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleBack = () => {
    window.history.back();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='users-menu-container'>
      <div className='user-page-header-container'>
        <div className='user-page-leftside'>
          <div>
            <button className='user-button' onClick={handleBack}>Назад</button>
          </div>
          <div>
            <img className='user-page-image' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          </div>
          <div className='user-page-heading'>
            <h1 className='user-page-heading-text-top'>{user.first_name} {user.last_name}</h1>
            <div className='user-page-heading-text-bottom'>{user.email}</div>
          </div>
        </div>
        <button className='user-button' onClick={handleLogout}>Выход</button>
        <div className='mobile-buttons-group'>
          <button className='button-arrow' onClick={handleBack}>
            <img  src={arrow}/>
            </button>
          <button className='button-exit' onClick={handleLogout}>
            <img  src={exit}/>
          </button>

          </div>
      </div>

      <div className='user-page-main'>
        <div className='user-page-main-leftside'>
          <p>Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.</p>
          <p>В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".</p>
          <p>Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.</p>
        </div>
        <div className='user-page-main-rightside'>
          <div className='user-page-main-rightside-text'>
            <img src={phoneIcon} alt='phone' />
            <span>+7 (954) 333-44-55</span>
          </div>
          <div>
            <img src={emailIcon} alt='email' />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
      <div className='avatar-change-section'>
        <input
          type='text'
          placeholder='Enter new avatar URL'
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <button onClick={handleAvatarChange}>Изменить аватар</button>
      </div>
    </div>
  );
};

export default UserPage;