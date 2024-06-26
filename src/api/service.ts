export interface AuthRequest {
  email: string;
  password: string;
}
  
export interface LoginResponse {
  token: string;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  data: User[];
  total_pages: number;
}
  
  export const loginUser = async (requestBody: AuthRequest): Promise<LoginResponse> => {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    const data = await response.json();
    return data;
  };
  

  
  export const registerUser = async (requestBody: AuthRequest): Promise<LoginResponse> => {
    const response = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    const data = await response.json();
    return data;
  };
  
  
  export const fetchUsers = async (page: number): Promise<UsersResponse> => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchUser = async (userId: string): Promise<User> => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    const data = await response.json();
    return data.data;
  };
  
  export const updateUserAvatar = async (userId: string, avatarUrl: string): Promise<Response> => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    });
    return response;
  };