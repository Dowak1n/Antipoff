import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import hide from '../assets/icons/hide.svg';
import { registerUser } from '../api/service';
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from '../helpers/validation';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    const nameValidationError = validateName(name);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);

    if (nameValidationError) {
      setNameError(nameValidationError);
      valid = false;
    } else {
      setNameError('');
    }

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

    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;

    try {
      const requestBody = {
        email: email,
        password: password,
      };

      console.log('Request Body:', requestBody);

      const data = await registerUser(requestBody);

      if (data.token) {
        sessionStorage.setItem('token', data.token);
        dispatch(login(email));
        navigate('/usersmenu');
      } else {
        setError(data.error || 'Ошибка регистрации');
      }
    } catch (error) {
      setError('Ошибка сети');
      console.error('Error:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='register-form-group-container'>
      <form className='register-form-container' onSubmit={handleSubmit} noValidate>
        <div className='register-padding'>
          <h2 className='register-heading field-margin'>Регистрация</h2>

          <div className='field-container field-margin'>
            <label className='label-field'>Имя</label>
            <input
              className={`input-field ${nameError ? 'input-error' : ''}`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <span className='error-field'>{nameError}</span>}
          </div>

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

          <div className='field-container upper-button-margin'>
            <label className='label-field'>Подтвердите пароль</label>
            <div className={`input-field-password ${confirmPasswordError ? 'input-error' : ''}`}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="button" onClick={toggleShowConfirmPassword} className="toggle-button">
                <img src={hide} alt='toggle visibility'></img>
              </button>
            </div>
            {confirmPasswordError && <span className='error-field'>{confirmPasswordError}</span>}
          </div>

          {error && <p>{error}</p>}
          <button className='button' type="submit">Зарегистрироваться</button>
        </div>
      </form>
      <div className='register-bottom-text'>Уже есть аккаунт? <Link className='register-bottom-link' to="/login">Войти</Link></div>
    </div>
  );
};

export default Register;