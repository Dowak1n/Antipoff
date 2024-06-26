import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import hide from '../assets/icons/hide.svg';
import { loginUser } from '../api/service';
import { validateEmail, validatePassword } from '../helpers/validation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError) {
      setEmailError(emailValidationError);
      valid = false;
    } else {
      setEmailError('');
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      const requestBody = {
        email: email,
        password: password,
      };

      const data = await loginUser(requestBody);

      if (data.token) {
        sessionStorage.setItem('token', data.token);
        dispatch(login(email));
        navigate('/usersmenu');
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (error) {
      setError('Ошибка сети');
      console.error('Error:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='register-form-group-container'>
      <form className='register-form-container' onSubmit={handleSubmit} noValidate>
        <div className='register-padding'>
          <h2 className='register-heading field-margin'>Вход</h2>

          <div className='field-container field-margin'>
            <label className='label-field'>Электронная почта</label>
            <input
              className={`input-field ${emailError ? 'input-error' : ''}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <span className='error-field'>{emailError}</span>}
          </div>

          <div className='field-container field-margin'>
            <label className='label-field'>Пароль</label>
            <div className={`input-field-password ${passwordError ? 'input-error' : ''}`}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={toggleShowPassword} className="toggle-button">
                <img src={hide} alt='toggle visibility'></img>
              </button>
            </div>
            {passwordError && <span className='error-field'>{passwordError}</span>}
          </div>

          {error && <p>{error}</p>}
          <button className='button' type="submit">Войти</button>
        </div>
      </form>
      <div className='register-bottom-text'>
        Нету аккаунта? <Link className='register-bottom-link' to="/register">Создать</Link>
      </div>
    </div>
  );
};

export default Login;