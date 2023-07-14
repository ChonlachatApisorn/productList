import { useState } from 'react';
import instant from '../provider/axios.instant';
import { UserUrl } from '../provider/api.constant';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirm_password: '',
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

    if (dataUser.password === data.confirm_password) {
      instant
        .post(UserUrl.create, dataUser)
        .then(() => {
          alert('Sign up succeed');
        })
        .then(() => navigate('/sign-in'));
    } else {
      alert('Password does not match');
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-full justify-around items-center bg-[url(https://wallpapercave.com/wp/wp3744429.jpg)] bg-cover bg-no-repeat bg-fixed bg-center">
        <div className="w-full mx-auto px-20 flex-col space-y-6 bg-black opacity-20 h-screen" />
        <div className="flex w-1/2 justify-center items-cente space-y-8 absolute">
          <div className="flex w-full px-8 md:px-32 lg:px-24 justify-center">
            <form
              className="bg-white rounded-md shadow-2xl p-5 w-full lg:max-w-md"
              onSubmit={onSubmit}
            >
              <h1 className="text-zinc-700 text-2xl my-10 text-center">
                Sign up your account
              </h1>
              <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md">
                <input
                  id="username"
                  className=" pl-2 w-full outline-none border-none bg-zinc-50"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md ">
                <input
                  className="pl-2 w-full outline-none border-none bg-zinc-50"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md ">
                <input
                  className="pl-2 w-full outline-none border-none bg-zinc-50"
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  onChange={handleOnChange}
                />
              </div>
              <button
                type="submit"
                className="block w-11/12 bg-zinc-600 mx-auto mt-5 py-2 rounded-2xl hover:bg-zinc-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Complete Sign Up
              </button>
              <div className="bg-zinc-700 w-full h-0.5 mt-9 shadow-md" />
              <div className="flex justify-center mt-6 mb-8">
                <span className="text-sm ml-2">
                  Did you have account ?{' '}
                  <a
                    href="sign-in"
                    className="hover:text-zinc-500 underline underline-offset-4"
                  >
                    Sign In
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
