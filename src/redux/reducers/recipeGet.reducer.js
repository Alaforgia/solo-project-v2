const recipeGet = (state = [], action) => {
  switch (action.type) {
    case "GET_RECIPES":
      return action.data;
    default:
      return state;
  }
};

export default recipeGet