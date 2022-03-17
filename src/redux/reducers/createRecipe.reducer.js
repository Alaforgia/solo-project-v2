
const createRecipe = (state = [], action) => {
  switch (action.type) {
    case "CREATE_RECIPE":
      return action.payload;
    default:
      return state;
  }
};




export default createRecipe