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
  if (req.isAuthenticated()) {
    console.log(req.body);
    console.log("/recipes POST route");
    console.log(req.body);
    console.log("is authenticated?", req.isAuthenticated());
    console.log("user", req.user);
    const createNewRecipe = `
    INSERT INTO "recipes" ("user_id", "title", "instructions", "image")
    VALUES ($1, $2, $3, $4)
  ;`;
    pool
      .query(createNewRecipe, [req.user.id, req.body.title, req.body.instructions, req.body.image])
      .then((result) => {
        console.log(result.rows[0].id);
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

module.exports = router;
