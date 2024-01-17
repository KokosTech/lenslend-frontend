import { getAuth, loginAction } from '@/actions/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  // const t = useTranslations('auth.login');

  const auth = await getAuth();

  if (auth.accessToken) redirect('/');

  return (
    <div>
      <h1>Login page</h1>
      <form action={loginAction}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          placeholder='Enter your email'
          type='email'
          name='email'
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          placeholder='Enter your password'
          type='password'
          name='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
