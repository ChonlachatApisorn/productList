import { Route, Routes } from 'react-router-dom';
import SignIn from './page/sign-in';
import SignUp from './page/sign-up';
import Homepage from './page/homepage';
import { useContext } from 'react';
import { AuthContext } from './contexts/auth.context';

export function Router() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="*" element={<SignIn />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Homepage />} />
          <Route path="homepage" element={<Homepage />} />
        </>
      )}
    </Routes>
  );
}
