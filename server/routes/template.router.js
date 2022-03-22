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

  let query = `SELECT "recipes"."title", "recipes"."image", "recipes"."instructions", "ingredients"."recipe_id", "ingredients"."name", "ingredients"."amount"
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
        // TODO: Loop through the newRecipe.ingredients array and for each ingredient create a newIngredientQuery
        for (let i = 0; i < newRecipe.ingredients.length; i++) {
          const createNewIngredient = `INSERT INTO "ingredients" ("recipe_id", "name", "amount")
        VALUES ($1, $2, $3);`;
          pool
            .query(createNewIngredient, [recipeId, newRecipe.ingredients[i].name, newRecipe.amounts[i].name])
            .then((result) => {
              // console.log(result.rows[0].id);
              res.sendStatus(201);
            })
            .catch((err) => {
              console.log("Ingredients POST error", err);
              res.sendStatus(500);
            });
        }

        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("Recipes POST Error = ", err);
        res.sendStatus(500);
      });
  }
});

router.put("/edit/:id", (req, res) => {
  const newRecipeId = req.params.id;
  const newRecipe = req.body.formData;
  // const recipeUpdateArray = [newRecipe.title, newRecipe.instructions, newRecipe.image];
  console.log("Req.BODY =", req.body);
  const updateRecipe = `
    UPDATE "recipes" 
    SET "title" = $1, 
    "instructions" = $1,
     "image" = $1
    WHERE "id" = $2;`;
  const sqlValues = [newRecipe, newRecipeId];
  pool
    .query(updateRecipe, sqlValues)
    .then((result) => {
      console.log("EDIT SERVER PUT RESULT = ", result);
      // res.send(result.rows);
      // const recipeId = result.rows[0].id;
      // console.log("result.rows =", recipeId);
      // for (let i = 0; i < newRecipe.ingredients.length; i++) {
      //   const createNewIngredient = `INSERT INTO "ingredients" ("recipe_id", "name", "amount")
      //   VALUES ($1, $2, $3);`;
      //   pool
      //     .query(createNewIngredient, [recipeId, newRecipe.ingredients[i].name, newRecipe.amounts[i].name])
      //     .then((result) => {
      //       // console.log(result.rows[0].id);
      //       res.sendStatus(201);
      //     })
      //     .catch((err) => {
      //       console.log("Ingredients PUT error =", err);
      //       res.sendStatus(500);
      //     });
      // }

      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("EDIT SERVER PUT ERROR = ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
