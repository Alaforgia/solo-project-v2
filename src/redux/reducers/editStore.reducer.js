const getEditData = (state = [], action) => {
  switch (action.type) {
    case "SET_EDIT_ITEM":
      return action.payload;
    default:
      return state;
  }
};

export default getEditData;
