import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

type State = {
  session: Session | null;
};
type Action = {
  updateSession: (username: State['session']) => void;
};

export const useStore = create<Action & State>(set => ({
  session: null,
  updateSession: session => set(() => ({ session: session })),
}));
