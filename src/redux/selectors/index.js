export const getTransporter = (store) => {
  // console.log(store);
  return store.reducer.transporter
};

export const getStoreItems = (store) => {
  // console.log(store);
  return store.reducer.storeItems
};

export const getSortedData = (store) => {
  // console.log(store);
  return store.reducer.sortedData
};