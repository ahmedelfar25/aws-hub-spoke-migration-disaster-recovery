const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      return res.send(err);
    }

    res.render("index", {
      employees: result,
    });
  });
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  const { name, department, salary } = req.body;

  db.query(
    "INSERT INTO employees(name,department,salary) VALUES (?,?,?)",
    [name, department, salary],
    (err) => {
      if (err) return res.send(err);

      res.redirect("/");
    },
  );
});

module.exports = router;
