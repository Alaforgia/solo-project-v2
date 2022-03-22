

getEditData = (state = [], action) => {
  switch (action.type) {
    case "SET_NEW_RECIPE":
      return action.payload;
    default:
      return state;
  }
};

export default getEditData;
