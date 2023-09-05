const express = require("express");
const router = express.Router();
const db = require("../utils/database");

//Get all
router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM user");
    let row = data[0];
    res.json({
      msessage: "data-users",
      data: row,
    });
  } catch (error) {
    console.log(error);
  }
});
//Post
router.post("/", async (req, res) => {
  let { name, gmail, age } = req.body;
  console.log(name, gmail, age);
  try {
    let newUser = await db.execute(
      `INSERT INTO user ( user_name, user_gmail, user_age) VALUES ("${name}", "${gmail}", "${age}")`
    );
    res.json({
      message: "create success",
    });
  } catch (error) {
    console.log(error);
  }
});
//Get id
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let user = await db.execute(`SELECT * FROM user WHERE user_id = ${id}`);
    res.json({
      message: `user with id = ${id}`,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
});
//patch
router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, gmail, age } = req.body;
  try {
    let updateUser = await db.execute(
      "UPDATE user_hkt.user SET user_name=?, user_gmail=?, user_age=? WHERE user_id=?",
      [name, gmail, age, +id]
    );
    res.json({
      message: "Update user sucsess",
    });
  } catch (error) {
    console.log(error);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  await db.execute(`DELETE FROM user WHERE (user_id = ${id});
  `);
  res.json({
    message: "delete success",
  });
});
module.exports = router;
