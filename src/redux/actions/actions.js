import {
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_TRANSPORTER,
  ADD_ITEM_TRANSPORTER,
  REMOVE_ITEM_TRANSPORTER,
  ADD_ITEM_STORE,
  CLEAR_STORE_TRANSPORTER,
} from "./actionTypes";

export const addTransporterAction = (t) => ({
  type: ADD_TRANSPORTER,
  payload: { t },
});

export const addItemStoreAction = (t) => ({
  type: ADD_ITEM_STORE,
  payload: { t },
});

export const resetStoreTransporterAction = (t) => ({
  type: CLEAR_STORE_TRANSPORTER,
  payload: { t },
});

export const addItemAction = (itm) => ({
  type: ADD_ITEM,
  payload: { itm },
});

export const removeItemAction = (itm) => ({
  type: REMOVE_ITEM,
  payload: { itm },
});

export const addItemToTransporterAction = (transporter, itm) => ({
  type: ADD_ITEM_TRANSPORTER,
  payload: { transporter, itm },
});
export const removeItemFromTransporterAction = (transporter, itm) => ({
  type: REMOVE_ITEM_TRANSPORTER,
  payload: { transporter, itm },
});
