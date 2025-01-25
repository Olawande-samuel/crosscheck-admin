import { create } from 'zustand';

type StoreData = {
  preview: IEducation | null;
};
type StoreAction = {
  setPreview: (val: IEducation) => void;
  clearPreview: () => void;
};

type StoreState = StoreData & StoreAction;

const useEducationStore = create<StoreState>()((set) => ({
  preview: null,
  setPreview: (val) => set({ preview: val }),
  clearPreview: () => set({ preview: null }),
}));

export default useEducationStore;
