'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useCrons, useCronsDispatch } from './contexts/crons';
import { CronsItemProps, cronsActionKind } from './contexts/crons/type';
import SearchIcon from './components/icons/SearchIcon';
import TodoItem from './components/TodoItem';
import Heading from './components/Heading';
import TodoPopup from './components/TodoPopup';
import ToggleButton from './components/ToggleButton';

const App = () => {
    const crons = useCrons();
    const dispatch = useCronsDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [isShowCompletedTodos, setIsShowCompletedTodos] = useState(false);
    const [todoPopupData, setTodoPopupData] = useState<CronsItemProps | null>(
        null
    );

    const handleOpenTodoPopup = (
        item: CronsItemProps
    ) => {
        setTodoPopupData(item);
    };

    useEffect(() => {
        fetch('/api/crons/get-all').then((res) => {
            res.json().then((data) => {
                dispatch!({
                    payload: data ?? [],
                    type: cronsActionKind.UPDATE,
                });
            });
        });
    }, []);

    const getTodoItem = (
        isShow: boolean,
        index: number,
        date: Date,
        item: CronsItemProps
    ) => {
        if (!isShow || !item.value.toString().toLowerCase().includes(searchTerm.toLowerCase())) return null;

        return (
            <TodoItem
                key={index}
                item={item}
                searchTerm={searchTerm}
                onEditTodoItem={() => {
                    setTodoPopupData(item);
                }}
            />
        );
    };

    return (
        <div className="flex min-h-screen items-center bg-gray-50">
            {todoPopupData && (
                <TodoPopup
                    onClosePopup={() => setTodoPopupData(null)}
                    data={todoPopupData}
                />
            )}

            <div className={clsx('mx-auto w-full max-w-3xl px-4 py-6')}>
                <Heading />
                <input
                    type="text"
                    className={clsx(
                        'w-full bg-gray-50 p-4',
                        'rounded-lg border border-gray-300',
                        'text-gray-900',
                        'focus:border-blue-500 focus:ring-blue-500',
                        'mt-10 mb-5'
                    )}
                    placeholder="Staring Text"
                />
                <div className="pt-5">
                    <div className="flex items-center gap-3">
                        <div className="relative w-full">
                            <input
                                type="search"
                                className={clsx(
                                    'w-full bg-gray-50 p-4',
                                    'rounded-lg border border-gray-300',
                                    'text-gray-900',
                                    'focus:border-blue-500 focus:ring-blue-500'
                                )}
                                placeholder="Search Cron"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value.toLowerCase())
                                }
                            />
                            <button
                                type="button"
                                className={clsx(
                                    'absolute bottom-2 right-2 top-2',
                                    'rounded-lg bg-blue-700 px-4',
                                    'hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                                )}
                            >
                                <SearchIcon />
                            </button>
                        </div>

                        <button
                            onClick={() =>
                                handleOpenTodoPopup({
                                    id: 0,
                                    value: '',
                                    isChecked: false,
                                    date: new Date(),
                                })
                            }
                            type="button"
                            className={clsx(
                                'rounded-lg bg-gray-700 px-4 py-2.5',
                                'font-medium text-white',
                                'hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300'
                            )}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="py-3">
                    {crons?.map((item, index) =>
                        getTodoItem(!item.isChecked, index, item.date, item)
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
