export const validateName = (name: string): string => {
    if (name.length <= 2) {
      return 'Имя должно быть длиннее 2 символов';
    }
    return '';
  };
  
  export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Введите корректный адрес электронной почты';
    }
    return '';
  };
  
  export const validatePassword = (password: string): string => {
    if (password.length <= 4) {
      return 'Пароль должен быть длиннее 4 символов';
    }
    return '';
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (password !== confirmPassword) {
      return 'Пароли не совпадают';
    }
    return '';
  };