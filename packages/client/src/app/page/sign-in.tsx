import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instant from '../provider/axios.instant';
import { AuthUrl } from '../provider/api.constant';

function SignIn() {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const dataUser = {
      username: data.username,
      password: data.password,
    };
    instant
      .post(AuthUrl.login, dataUser)
      .then((res) => {
        localStorage.setItem('Token', JSON.stringify(res.data.access_token));
      })
      .then(() => navigate('/homepage'))
      .then(() => window.location.reload())
      .catch(() => alert('Username or Password is incorrect'));
  };

  return (
    <div className="h-screen flex">
      <div className="lg:flex w-full lg:w-1/2 justify-around items-center bg-[url(https://wallpapercave.com/wp/wp3744429.jpg)] bg-cover bg-no-repeat bg-fixed bg-center">
        <div className="w-full mx-auto px-20 flex-col space-y-6 bg-black opacity-20 h-screen" />
        <div className="items-center absolute pr-56"></div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center space-y-8">
        <div className="w-full px-8 md:px-32 lg:max-w-xl lg:px-24">
          <h1 className="text-4xl mb-10">Sign in your Account</h1>
          <form
            className="bg-zinc-300 rounded-md shadow-lg p-5"
            onSubmit={onSubmit}
          >
            <div className="flex items-center bg-white shadow-md mt-4 mb-8 py-2 px-3 rounded-lg">
              <input
                id="username"
                className=" pl-2 w-full outline-none border-none"
                type="text"
                name="username"
                placeholder="username"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex items-center bg-white shadow-md mb-8 py-2 px-3 rounded-lg">
              <input
                id="password"
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-white mt-5 py-2 shadow-md rounded-full hover:bg-zinc-700 hover:text-white hover:-translate-y-1 transition-all duration-500 text-black font-semibold mb-2"
            >
              Sign In
            </button>
            <div className="bg-zinc-700 w-full h-0.5 mt-9 shadow-md" />
            <div className="flex justify-center mt-4">
              <span className="text-sm ml-2">
                Need an account ?{' '}
                <a
                  href="sign-up"
                  className="hover:text-zinc-500 underline underline-offset-4"
                >
                  Sign up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
