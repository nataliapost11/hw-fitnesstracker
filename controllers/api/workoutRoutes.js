const router = require('express').Router();
const db = require('../../models');

router.get("/", (req, res) => {
  db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
 ] , (error, found) => {
    if (error) {
      console.log(error);
    } else {
      //console.log(found[found.length -1]);
      res.json(found);
    }
  });
});


router.put("/:id", (req, res) => {
  const id = req.params.id;
  //console.log(id);
  const reqData = req.body;
  var excercise = null;
  if (reqData.type == "resistance") {
    excercise = {
      type: 'resistance',
      name: reqData.name,
      duration: reqData.duration,
      weight: reqData.weight,
      reps: reqData.reps,
      sets: reqData.sets,
    };
  }
  else if (reqData.type == "cardio") {
    excercise = {
      type: 'cardio',
      name: reqData.name,
      duration: reqData.duration,
      distance: reqData.distance
    };
  }

  db.Workout.findOneAndUpdate(
    { _id: id }, 
    {
      $push: {
        exercises: excercise
      }
    })
    .then(workOut => {      
      //console.log(workOut);
      res.json(workOut);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  db.Workout.create(req.body)
    .then(workOut => {
      res.json(workOut);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/range", (req, res) => {
  console.log("Range called");
  db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
 ], (error, found) => {
      console.log("Range retreved");
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    })
    .sort({
      day: -1
    })
    .limit(7);
});

module.exports = router;