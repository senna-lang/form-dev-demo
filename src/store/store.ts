import { create } from 'zustand';

type State = {
  username: string;
  email: string;
};
type Action = {
  updateUserName: (username: State['username']) => void;
  updateEmail: (email: State['email']) => void;
};

export const useStore = create<Action & State>(set => ({
  username: '',
  email: '',
  updateEmail: email => set(() => ({ email: email })),
  updateUserName: username => set(() => ({ username: username })),
}));
