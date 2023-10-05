import { CronsItemProps, cronsAction, cronsActionKind } from './type';

export const cronsReducer = (crons: CronsItemProps[], action: cronsAction) => {
    switch (action.type) {
        case cronsActionKind.ADD: {
            return [
                ...crons,
                {
                    value: action.payload.value,
                    isChecked: false,
                } as CronsItemProps,
            ];
        }

        case cronsActionKind.REMOVE: {
            return crons.filter(
                (_: CronsItemProps, index: number) =>
                    index !== action.payload.index
            );
        }

        case cronsActionKind.EDIT: {
            return crons.map((item: CronsItemProps, index: number) =>
                index === action.payload.index
                    ? ({
                          value: action.payload.value,
                          isChecked: action.payload.isChecked,
                      } as CronsItemProps)
                    : item
            );
        }

        case cronsActionKind.UPDATE: {
            return (crons = action.payload);
        }
    }
};
