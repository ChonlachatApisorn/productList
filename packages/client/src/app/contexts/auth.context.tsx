import { createContext, useEffect, useState } from 'react';
import { IAuthContext } from '../provider/interface';
import instant from '../provider/axios.instant';
import { AuthUrl } from '../provider/api.constant';

export const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: { children: JSX.Element }) {
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    username: '',
  });
  const [user, setUser] = useState(true);
  const value = { user, setUser, currentUser };

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .get(AuthUrl.getCurrentUser, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((res) => setCurrentUser(res.data));
    } else {
      setUser(false);
    }
  }, [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
