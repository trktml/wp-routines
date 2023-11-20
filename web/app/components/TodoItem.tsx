"use client";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import CheckIcon from "./icons/CheckIcon";
import { CronsItemProps, cronsActionKind } from "../contexts/crons/type";
import { useCronsDispatch } from "../contexts/crons";
import clsx from "clsx";

interface TodoItemInterface {
    searchTerm: string;
    item: CronsItemProps;
    onEditTodoItem: () => void;
}

const TodoItem = ({
    searchTerm,
    item,
    onEditTodoItem,
}: TodoItemInterface) => {
    const todosDispatch = useCronsDispatch()!;

    const handleRemoveTodoItem = () => {
        fetch(
            '/api/crons/remove' +
            '?id=' +
            item.id
        ).then(async (res) => {
            let result = await res.json();
            console.log(result);

            if (result) {
                todosDispatch({
                    type: cronsActionKind.REMOVE,
                    payload: {
                        id: item.id
                    },
                });
            }
        });
    }

    const handleCheckTodoItem = () =>
        todosDispatch({
            type: cronsActionKind.EDIT,
            payload: item.value,
        });

    return (
        <div
            className={clsx(
                "mt-2.5 flex w-full items-center justify-between bg-white p-4",
                "rounded-lg border border-gray-200 shadow"
            )}
        >
            <span
                className="font-normal text-black-700"
                dangerouslySetInnerHTML={{
                    __html:
                        searchTerm !== ""
                            ? item.value.toLowerCase().replace(
                                searchTerm,
                                `<span class="bg-blue-100 font-bold">${searchTerm}</span>`
                            )
                            : item.value,
                }}
            ></span>

            <span className={clsx("text-gray-400 font-thin text-md")}>
                {item.date.toString().split(' ').slice(0, 4).join(' ')}
            </span>

            <div className="flex gap-2">
                <button
                    onClick={handleRemoveTodoItem}
                    type="button"
                    className={clsx(
                        "flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700",
                        "hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
                    )}
                >
                    <DeleteIcon />
                </button>

                <button
                    onClick={onEditTodoItem}
                    type="button"
                    className={clsx(
                        "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700",
                        "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    )}
                >
                    <EditIcon />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
