const express = require("express");
const router = express.Router();
const db = require("../models");
const { Trainer } = db.sequelize.models;

router.get("/", async (req, res) => {
  const trainers = await Trainer.findAll();

  res.render("trainer/list", {
    title: "Trainers",
    message: "List of Trainers",
    list: trainers,
  });
});

router.get("/create", async (req, res) => {
  res.render("trainer/create", {
    title: "Add Trainers",
    message: "Add new trainer",
  });
});

router.get("/update/:id", async (req, res) => {
  const trainer = await Trainer.findByPk(req.params.id);

  res.render("trainer/update", {
    title: "Update trainer",
    message: "Update trainer",
    trainer,
  });
});

router.post("/update/:id", async (req, res) => {
  console.log(req.params.id);
  const trainerToUpdate = await Trainer.findByPk(req.params.id);
  trainerToUpdate.set({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    subject: req.body.subject,
  });
  await trainerToUpdate.save();
  res.redirect("/trainers");
});

router.post("/create/add", async (req, res) => {
  const { firstName, lastName, subject } = req.body;

  await Trainer.create({
    firstName,
    lastName,
    subject,
  });

  res.redirect("/trainers");
});

router.get("/delete/:id", async (req, res) => {
  const trainer = await Trainer.findByPk(req.params.id);

  await trainer.destroy();

  res.redirect("/trainers");
});

module.exports = router;
