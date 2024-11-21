import { createContext } from 'react';
import { Bracket } from './types.tsx';

const BracketContext = createContext<Bracket | null>({
    roundList: []
});

export default BracketContext;