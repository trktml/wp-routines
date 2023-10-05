'use client';
import { Dispatch, createContext, useContext, useReducer } from 'react';
import { cronsReducer } from './reducer';
import { CronsItemProps, cronsAction } from './type';

const CronsContext = createContext<CronsItemProps[] | null>(null);
const CronsDispatch = createContext<Dispatch<cronsAction> | null>(null);

export const useCrons = () => useContext(CronsContext);
export const useCronsDispatch = () => useContext(CronsDispatch);

const initialCrons: CronsItemProps[] = [
    { value: 'WP-Routines', isChecked: true, date: new Date() },
];

export function CronsProvider({ children }: { children: React.ReactNode }) {
    const [todos, dispatch] = useReducer(cronsReducer, initialCrons);

    return (
        <CronsContext.Provider value={todos}>
            <CronsDispatch.Provider value={dispatch}>
                {children}
            </CronsDispatch.Provider>
        </CronsContext.Provider>
    );
}
