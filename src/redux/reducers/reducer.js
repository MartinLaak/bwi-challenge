import {
  CLEAR_STORE_TRANSPORTER,
  INIT_DATA,
  ADD_TRANSPORTER,
  ADD_ITEM_STORE,
  ADD_ITEM_TRANSPORTER,
  REMOVE_ITEM_TRANSPORTER,
  ADD_ITEM,
  REMOVE_ITEM,
} from "../actions/actionTypes";

const initialState = {
  initData:[],
  transporter: [],
  storeItems: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_STORE_TRANSPORTER: {
      return {
        ...state,
        transporter: [],
        storeItems: [],
      };
    }
    case INIT_DATA:{
      return {
        ...state,
        initData: [action.payload.d],
      };
    }
    case ADD_TRANSPORTER: {
      console.log(action);
      let tmp = state.transporter;
      tmp[action.payload.t.name] = action.payload.t;
      return {
        ...state,
        transporter: tmp,
        // transporter: [
        //   ...state.transporter,
        //   action.payload.t.name: action.payload.t,
        // ],
      };
    }
    case ADD_ITEM_STORE: {
      console.log(action.type, action.payload);
      let tmp = state.storeItems;
      tmp[action.payload.t.name] = action.payload.t;
      return {
        ...state,
        storeItems: tmp,
        // storeItems: [...state.storeItems, action.payload.t],
      };
    }
    case ADD_ITEM_TRANSPORTER: {
      console.log(action.type, action.payload);
      const { transporter, itm } = action.payload;
      let tmpItems = state.storeItems;
      if (tmpItems[itm] !== undefined) {
        tmpItems[itm].units.left--;
      } else {
        console.log("Trouble in the Warehouse!!! >> Item stolen?");
      }

      let tmpTransporter = state.transporter;
      let tmpTransporterCargo = state.transporter[transporter].items;
    //   console.log(tmpTransporterCargo);
      if (
        tmpTransporterCargo[itm] === undefined &&
        tmpItems[itm] !== undefined
      ) {
        tmpTransporterCargo[itm] = {
          id: tmpItems[itm].id,
          name: tmpItems[itm].name,
          count: 1,
          weight: tmpItems[itm].weight,
          utility: tmpItems[itm].utility,
        };
      } else {
        tmpTransporterCargo[itm].count++;
      }

      return {
        ...state,
        storeItems: tmpItems,
        transporter: tmpTransporter,
      };
    }

    case REMOVE_ITEM_TRANSPORTER: {
      console.log(action.type, action.payload);
      const { transporter, itm } = action.payload;
      let tmpItems = state.storeItems;
      if (tmpItems[itm] !== undefined) {
        tmpItems[itm].units.left++;
      } else {
        console.log("Trouble in the Warehouse!!! >> Item stolen?");
      }

      let tmpTransporter = state.transporter;
      let tmpTransporterCargo = state.transporter[transporter].items;
      console.log(tmpTransporterCargo);
      if (
        tmpTransporterCargo[itm] === undefined &&
        tmpItems[itm] !== undefined
      ) {
        console.log("Trouble in the Transporter!!! >> Item doesn't exist! Stolen?");
      } else {
        tmpTransporterCargo[itm].count--;
        if (tmpTransporterCargo[itm].count < 1) {
          delete tmpTransporterCargo[itm];
        }
      }

      return {
        ...state,
        storeItems: tmpItems,
        transporter: tmpTransporter,
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
