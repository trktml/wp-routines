'use client';
import clsx from 'clsx';
import Datepicker from 'tailwind-datepicker-react';
import { Fragment } from 'react';
import { FormEvent, useState } from 'react';
import { useCronsDispatch } from '../contexts/crons';
import { CronsItemProps, cronsActionKind } from '../contexts/crons/type';

interface TodoPopupProps {
    onClosePopup: () => void;
    index: number | null;
    data: CronsItemProps;
}

const TodoPopup = ({ onClosePopup, index, data }: TodoPopupProps) => {
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ');
    }
    const dispatch = useCronsDispatch()!;
    const [todoValue, setTodoValue] = useState(data?.value || '');

    const handleEditTodoItem = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClosePopup();

        if (index === null) {
            dispatch({
                type: cronsActionKind.ADD,
                payload: {
                    value: todoValue,
                },
            });

            return;
        }

        dispatch({
            type: cronsActionKind.EDIT,
            payload: {
                index,
                value: todoValue,
                isChecked: data.isChecked,
            },
        });
    };

    const [show, setShow] = useState<boolean>(false);
    const handleChange = (selectedDate: Date) => {
        console.log(selectedDate);
    };
    const handleClose = (state: boolean) => {
        setShow(state);
    };

    const options = {
        title: 'Select a date',
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date('2030-01-01'),
        minDate: new Date('1950-01-01'),
        theme: {
            background: 'bg-gray-700 dark:bg-gray-800',
            todayBtn: '',
            clearBtn: '',
            icons: '',
            text: '',
            disabledText: 'bg-gray-400',
            input: '',
            inputIcon: '',
            selected: '',
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <span>prev</span>,
            next: () => <span>next</span>,
        },
        datepickerClassNames: 'top-12',
        defaultDate: new Date(data?.date) ?? new Date().toUTCString(),
        language: 'en',
    };

    return (
        <div
            className={clsx(
                'fixed bottom-0 left-0 right-0 top-0 z-50',
                'flex items-center justify-center bg-gray-700/60 p-4'
            )}
        >
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleEditTodoItem}
                    className="rounded-lg bg-white shadow"
                >
                    <div className="p-6">
                        <input
                            required
                            type="text"
                            className={clsx(
                                'w-full bg-gray-50 p-4',
                                'rounded-lg border border-gray-300',
                                'text-gray-900',
                                'focus:border-blue-500 focus:ring-blue-500'
                            )}
                            placeholder="Add"
                            value={todoValue}
                            onChange={(event) =>
                                setTodoValue(event.target.value)
                            }
                        />
                        <Datepicker
                            options={options}
                            onChange={handleChange}
                            show={show}
                            setShow={handleClose}
                            classNames="mt-5"
                        />
                    </div>

                    <div
                        className={clsx(
                            'flex items-center justify-center space-x-8 p-4',
                            'rounded-b border-t border-gray-200'
                        )}
                    >
                        <button
                            type="submit"
                            className={clsx(
                                'rounded-lg bg-gray-700 px-5 py-2.5',
                                'text-center font-medium text-white',
                                'hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300'
                            )}
                        >
                            Save
                        </button>
                        <button
                            onClick={onClosePopup}
                            type="button"
                            className={clsx(
                                'bg-white px-5 py-2.5',
                                'rounded-lg border border-gray-200',
                                'font-medium text-gray-500',
                                'hover:bg-gray-100 hover:text-gray-900',
                                'focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200'
                            )}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoPopup;
