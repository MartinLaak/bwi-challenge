import { ADD_ITEM, REMOVE_ITEM, ADD_TRANSPORTER } from "../actions/actionTypes";

const initialState = {
  items: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSPORTER: {
      console.log(action);
      return {
        ...state,
        transporter: [...state.transporter, action.payload],
      };
    }

    case ADD_ITEM: {
      console.log(action);
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false,
          },
        },
      };
    }
    case REMOVE_ITEM: {
      console.log(action);
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed,
          },
        },
      };
    }
    default:
      return state;
  }
}
