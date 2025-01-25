const useLocalStorage = () => {
  const getItem = (name: string) => {
    if (name) {
      const data = localStorage.getItem(name);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    }
    return null;
  };
  const setItem = (name: string, value: any) => {
    if (name && value) {
      localStorage.setItem(name, JSON.stringify(value));
    }
  };
  const removeItem = (name: string) => {
    if (name) {
      localStorage.removeItem(name);
    }
  };
  return { getItem, setItem, removeItem };
};
export default useLocalStorage;
