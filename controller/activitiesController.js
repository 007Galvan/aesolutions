import Activity from "../model/activities.js";

const saveActivity = async (req, res) => {
    const activity = new Activity(req.body);
    try {
      const storedActivity = await activity.save();
      // res.json(storedCostumer);
      res.status(200).send({
        message: "activity saved succesfuly",
        status:"ok",
        storedActivity
    })
      console.log('se guardó la actividad')
    } catch (error) {
      console.log(error);
    }

}

const getActivities = async (req, res)=>{

  try {
    const activities = await Activity.find()
    // res.json(costumers);

    if(!activities){
      return res.status(202).send({
          mensaje:"No hay registros en la BD",
          status:"ok"
      })
  }
  return res.status(200).json(activities);
  // .send({
  //     costumers
  // })
  } catch (error) {
    console.log(error);
  }

}

const updateActivity = async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findById(id);

  console.log(activity);

  if (!activity) {
    return res.status(404).json({ msg: "Actividad no encontrada" });
  }

  // if (costumer._id.toString() !== req._id.toString()) {
  //   return res.json({ msg: "Accion no válida" });
  // }

  // Actualizar actividad
  activity.nameActivity = req.body.nameActivity || activity.nameActivity;
  activity.descriptionActivity = req.body.descriptionActivity || activity.descriptionActivity;
  activity.date = req.body.date || activity.date;
  activity.notification = req.body.notification || activity.notification;
  activity.costumers = req.body.costumers || activity.costumers;
  activity.machines = req.body.machines || activity.machines;
  activity.managers = req.body.managers || activity.managers;
  

  try {
    // findOneAndUpdate(consulta,nuevo,{new:true}
    const activityUpdated = await activity.save();
    res.json(activityUpdated);
  } catch (error) {
    console.log(error);
  }
};

const deleteActivity= async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findById(id);

  if (!activity) {
    return res.status(404).json({ msg: "Actividad no encontrada" });
  }

  // if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
  //   return res.json({ msg: "Accion no válida" });
  // }

  try {
    await activity.deleteOne();
    res.json({ msg: "Actividad Eliminada" });
  } catch (error) {
    console.log(error);
  }
};








export {saveActivity,
        getActivities,
        updateActivity,
        deleteActivity}