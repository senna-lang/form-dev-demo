import { create } from 'zustand';

type State = {
  username: string | null;
  email: string | null;
};
type Action = {
  updateUserName: (username: State['username']) => void;
  updateEmail: (email: State['email']) => void;
};

export const useStore = create<Action & State>(set => ({
  username: null,
  email: null,
  updateEmail: email => set(() => ({ email: email })),
  updateUserName: username => set(() => ({ username: username })),
}));
