const router = require("express").Router();
const db = require("../models");

router.get("/workouts", (req, res) => {
  // db.Workout.find({})
  //   .sort({ day: 1 })
  //   .then((dbWorkout) => {
  //     console.log(dbWorkout)
  //     res.json(dbWorkout);
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err);
  //   });

  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ day: 1 })
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });

  // res.json({ message: "hola" });
});

router.put("/workouts/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  db.Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  // res.json({ message: "hola" });
});

router.post("/workouts", (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  // db.Workout.collection
  //   .insertOne(req.body)
  //   .then((dbWorkout) => {
  //     res.json(dbWorkout);
  //   })
  //   .catch((err) => {
  //     res.status(404).json(err);
  //   });
  db.Workout.collection
    .insertOne({
      day: new Date(new Date().setDate(new Date().getDate())),
      exercises: [],
    })
    .then((dbWorkout) => {
      console.log(dbWorkout.ops);
      res.json(dbWorkout.ops[0]);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;
