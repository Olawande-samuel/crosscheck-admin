import { create } from 'zustand';

type StoreData = { data: Institution | null };
type StoreAction = {
  setInstitution: (val: StoreData['data'] | null) => void;
};

type Store = StoreData & StoreAction;

const useInstitutionStore = create<Store>()((set) => ({
  data: null,
  setInstitution: (val) => set({ data: val }),
}));

export default useInstitutionStore;
