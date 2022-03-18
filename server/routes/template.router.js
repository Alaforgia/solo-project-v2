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
      console.log("MyRecipes SERVER GET = ", result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(query);
      console.log("MyRecipes SERVER GET ERROR = ", err);
      res.sendStatus(500);
    });
});
// Details view GET
router.get("/details", (req, res) => {
  let query = `SELECT * FROM "ingredients"
  JOIN "recipes" ON "ingredients"."recipe_ID" = "recipes"."id"
  JOIN "user" ON "recipes"."user_id" = "user"."id";`;
  console.log("What is this!", result);
  pool
    .query(query)
    .then((result) => {
      console.log("Details SERVER GET = ", result);
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
    console.log("REQ.BODY?", req.body);
    console.log("/recipes recipes POST route");
    console.log(req.body);
    console.log("is authenticated?", req.isAuthenticated());
    console.log("user", req.user);
    const createNewRecipe = `
    INSERT INTO "recipes" ("user_id", "title", "instructions", "image")
    VALUES ($1, $2, $3, $4)
  ;`;
    // console.log("What is this!", createNewRecipe);
    pool
      .query(createNewRecipe, [req.user.id, req.body.title, req.body.instructions, req.body.image])
      .then((result) => {
        console.log(result.rows[0].id);
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
    console.log(req.body);
    console.log("/recipes Ingredients POST route");
    console.log(req.body);
    console.log("is authenticated?", req.isAuthenticated());
    console.log("user", req.user);
    const createNewIngredients = `
    INSERT INTO "ingredients" ("recipe_ID", "name", "amount")
    VALUES ($1, $2, $3)
  ;`;
    pool
      .query(createNewIngredients, [req.body.recipe_ID, req.body.name, req.body.amount])
      .then((result) => {
        console.log(result.rows[0].id);
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("Ingredients POST error", err);
        res.sendStatus(500);
      });
  }
});

module.exports = router;
