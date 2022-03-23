const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
/**
 * GET route template
 */
// One GET for the MyRecipes page. Title and IMG
router.get("/", (req, res) => {
  console.log("hello");
  let queryText = `SELECT * FROM "recipes";`;
  // JOIN "ingredients" on "recipes"."id" = "ingredients"."recipe_ID"
  pool
    .query(queryText)
    .then((result) => {
      // console.log("MyRecipes SERVER GET = ", result);
      console.log({ result });
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
  // detailsId = Number(req.params.id);
  let query = `SELECT "recipes"."id", "recipes"."title", "recipes"."image", "recipes"."instructions", "ingredients"."recipe_id", "ingredients"."name", "ingredients"."amount"
  FROM "ingredients"
  JOIN "recipes" ON "ingredients"."recipe_id" = "recipes"."id"
  JOIN "user" ON "recipes"."user_id" = "user"."id"
  WHERE "ingredients"."recipe_id" = ${req.params.id};
  ;`;
  console.log("query =", query);
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
    // console.log("REQ.BODY?", req.body);
    // console.log("/recipes recipes POST route");
    // console.log("is authenticated?", req.isAuthenticated());
    // console.log("user", req.user);
    const newRecipe = req.body.formData;
    // console.log("Req.BODY =", req.body);
    const createNewRecipe = `
    INSERT INTO "recipes" ("user_id", "title", "instructions", "image")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";`;
    pool
      .query(createNewRecipe, [
        req.user.id,
        newRecipe.title,
        newRecipe.instructions,
        "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
      ])
      .then((result) => {
        // console.log("What is This?", result);
        // console.log("========================");
        // console.log("res =", res);
        // console.log("========================");
        // console.log("res.body =", res.body);
        // console.log([req.user.id, newRecipe.title, newRecipe.instructions, newRecipe.image]);
        const recipeId = result.rows[0].id;
        console.log("result.rows =", recipeId);
        console.log("typeof =", typeof recipeId);
        console.log("newRecipe.ingredients :");
        console.log(JSON.stringify(newRecipe.ingredients, null, 2));
        console.log(JSON.stringify(newRecipe.amounts, null, 2));
        console.log(newRecipe.ingredients.length);
        for (let i = 0; i < newRecipe.ingredients.length; i++) {
          const createNewIngredient = `INSERT INTO "ingredients" ("recipe_id", "name", "amount")
        VALUES ($1, $2, $3);`;
          pool
            .query(createNewIngredient, [recipeId, newRecipe.ingredients[i].name, newRecipe.amounts[i].name])
            .then((result) => {
              // console.log(result.rows[0].id);
              console.log(
                `${newRecipe.amounts[i].name} of ${newRecipe.ingredients[i].name} added to ingredients table`
              );
              // res.sendStatus(201);
            })
            .catch((err) => {
              console.log("Ingredients POST error", err);
              res.sendStatus(500);
            });
        }
      })
      .catch((err) => {
        console.log("Recipes POST Error = ", err);
        res.sendStatus(500);
      });
  }
});
router.put("/edit/:id", (req, res) => {
  const recipeId = parseInt(req.params.id);
  const updatedRecipe = req.body.formData;
  // const recipeUpdateArray = [updatedRecipe.title, updatedRecipe.instructions, updatedRecipe.image];
  console.log("Req.BODY =", req.body);
  console.log("params.id =", req.params);
  console.log("params.id =", req.params.id);
  const updateRecipe = `
    UPDATE "recipes"
    SET "title" = $2,
    "instructions" = $3,
     "image" = $4
    WHERE "id" = $1;`;
  const sqlValues = [recipeId, updatedRecipe.title, updatedRecipe.instructions, updatedRecipe.image];
  console.log("recipeId = ", recipeId);
  pool
    .query(updateRecipe, sqlValues)
    .then((result) => {
      console.log("EDIT SERVER PUT RESULT = ", result);
      // res.send(result.rows);
      // console.log("result.rows =", recipeId);
      for (let i = 0; i < updatedRecipe.ingredients.length; i++) {
        const updateIngredient = `UPDATE "ingredients" SET "name" = $2, "amount" = $3, WHERE "id" = $1;`;
        pool
          .query(updateIngredient, [recipeId, updatedRecipe.ingredients[i].name, updatedRecipe.amounts[i].name])
          .then((result) => {
            // console.log(result.rows[0].id);
            // res.sendStatus(201);
          })
          .catch((err) => {
            console.log("Ingredients PUT error =", err);
            // res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log("EDIT SERVER PUT ERROR = ", err);
      res.sendStatus(500);
    });
});
module.exports = router;
