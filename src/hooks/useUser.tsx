import { useState, useEffect } from 'react';

const useUser = (): { user: IUser | null; storeUser: (val: IUser) => void } => {
  const USER = 'crosscheck-admin';
  const [user, setUser] = useState<IUser | null>(null);
  const storedUser = localStorage.getItem(USER);

  useEffect(() => {
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [storedUser]);

  function storeUser(data: IUser) {
    if (!data) {
      return;
    }
    localStorage.setItem(USER, JSON.stringify(data));
  }
  return { user, storeUser };
};

export default useUser;
