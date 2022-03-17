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

/**
 * POST route template
 */
router.post("/", (req, res) => {
  console.log(req.body);
  const createNewRecipe = `
  INSERT INTO "recipe" ("user_id", "title", "instructions")
  VALUES ($1, $2, $3)
  RETURNING "id";`;
  pool
    .query(createNewRecipe, [req.body.user_id, req.body.title, req.body.amount, req.body.instructions])
    .then((result) => {
      console.log(result.rows[0].id);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
