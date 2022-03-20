const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
// One GET for the MyRecipes page. Title and IMG
router.get("/", (req, res) => {
  console.log("hello");
  let queryText = `SELECT * FROM "recipes"
  ;`;
  // JOIN "ingredients" on "recipes"."id" = "ingredients"."recipe_ID"
  pool
    .query(queryText)
    .then((result) => {
      // console.log("MyRecipes SERVER GET = ", result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(query);
      console.log("MyRecipes SERVER GET ERROR = ", err);
      res.sendStatus(500);
    });
});
// Details view GET
router.get("/details/:id", (req, res) => {
  console.log("in details", req.params.id);

  let query = `SELECT "recipes"."title", "recipes"."instructions", recipes.image
  FROM "recipes"
  WHERE "recipes"."id" = ${req.params.id}
  ;`;
  /*
  JOIN "ingredients" ON "recipes"."id" = "ingredients"."recipe_ID"
  JOIN "user" ON "recipes"."user_id" = "user"."id"
  */
  pool
    .query(query)
    .then((result) => {
      // console.log("Details SERVER GET = ", result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(query);
      console.log("Details SERVER GET ERROR = ", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
// Recipe table POST
router.post("/recipes", (req, res) => {
  if (req.isAuthenticated()) {
    // console.log("REQ.BODY?", req.body);
    // console.log("/recipes recipes POST route");
    // console.log("is authenticated?", req.isAuthenticated());
    console.log("user", req.user);
    const newRecipe = req.body.formData;
    console.log("Req.BODY =", req.body);
    const createNewRecipe = `
    INSERT INTO "recipes" ("user_id", "title", "instructions", "image")
    VALUES ($1, $2, $3, $4)
  ;`;
    // console.log("What is this!", createNewRecipe);
    pool
      .query(createNewRecipe, [req.user.id, newRecipe.title, newRecipe.instructions, newRecipe.image])
      .then((result) => {
        console.log("What is This?", result);
        console.log([req.user.id, newRecipe.title, newRecipe.instructions, newRecipe.image]);
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("Recipes POST Error = ", err);
        res.sendStatus(500);
      });
  }
});
// Ingredients Table POST
router.post("/ingredients", (req, res) => {
  if (req.isAuthenticated()) {
    // console.log(req.body);
    // console.log("/recipes Ingredients POST route");
    // console.log(req.body);
    // console.log("is authenticated?", req.isAuthenticated());
    // console.log("user", req.user);
    const newIngredient = req.body.formData;
    console.log("ingredient name =", newIngredient.ingredients);
    const createNewIngredients = `
    INSERT INTO "ingredients" ("recipe_ID", "name", "amount")
    VALUES ($1, $2, $3)
  ;`;
    pool
      .query(createNewIngredients, [req.user.id, newIngredient.ingredients[0].name, newIngredient.amounts[0].name])
      .then((result) => {
        // console.log(result.rows[0].id);
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("Ingredients POST error", err);
        res.sendStatus(500);
      });
  }
});

module.exports = router;
