import { CronsItemProps, cronsAction, cronsActionKind } from './type';

export const cronsReducer = (crons: CronsItemProps[], action: cronsAction) => {
    switch (action.type) {
        case cronsActionKind.ADD: {
            return [
                ...crons,
                {
                    id: action.payload.id,
                    value: action.payload.value,
                    isChecked: false,
                    date: action.payload.date,
                } as CronsItemProps,
            ];
        }

        case cronsActionKind.REMOVE: {
            return crons.filter(
                (_: CronsItemProps, index: number) =>
                    _.id !== action.payload.id
            );
        }

        case cronsActionKind.EDIT: {
            return crons.map((item: CronsItemProps, index: number) =>
                item.id === action.payload.id
                    ? ({
                        value: action.payload.value,
                        isChecked: action.payload.isChecked,
                        date: action.payload.date,
                    } as CronsItemProps)
                    : item
            );
        }

        case cronsActionKind.UPDATE: {
            return (crons = action.payload);
        }
    }
};
