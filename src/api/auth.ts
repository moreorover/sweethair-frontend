import axios from '@/axios/axios';

export async function login(email: string, password: string): Promise<string> {
  const { data } = await axios.post('/auth/login', { email, password });
  console.log(data);
  return data;
}

export async function me(): Promise<string> {
  const { data } = await axios.get('/auth/me');
  console.log(data);
  return data;
}
