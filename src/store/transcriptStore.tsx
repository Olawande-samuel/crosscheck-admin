import { create } from 'zustand';

type StoreData = {
  preview: ITranscript | null;
};
type StoreAction = {
  setPreview: (val: ITranscript) => void;
  clearPreview: () => void;
};

type StoreState = StoreData & StoreAction;

const useTranscriptStore = create<StoreState>()((set) => ({
  preview: null,
  setPreview: (val) => set({ preview: val }),
  clearPreview: () => set({ preview: null }),
}));

export default useTranscriptStore;
