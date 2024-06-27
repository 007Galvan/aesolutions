import Activity from "../model/activities.js";
import Summary from "../model/summary.js";

const saveActivity = async (req, res) => {
    const activity = new Activity(req.body);

 // Parse initial date and number of days from request parameters
 const { date, notification } = activity;
 let startDate = new Date(date);
 let datesOfActivity = [];
 datesOfActivity.push({ date: startDate });
 
 // Generate documents for each day
 for (let i = 0; i < 50; i++) {
   let currentDate = new Date(startDate);
   currentDate.setDate(startDate.getDate() + parseInt(notification));
   datesOfActivity.push({ date: currentDate });
   startDate = currentDate;
  }
  //asignar las fechas a la actividad
  activity.datesOfActivity = req.body.datesOfActivity || datesOfActivity;
  
    try {
      const storedActivity = await activity.save();
      // res.json(storedCostumer);
      res.status(200).send({
        message: "activity saved succesfuly",
        status:"ok",
        storedActivity,
    })
      console.log('se guardó la actividad')
      checkActivities();
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

const checkActivities = async (req, res)=>{

  const activities = await Activity.find();
  const summaryData = await Summary.find();
  console.log(activities);
  console.log(summaryData);

  const currentDate = new Date();
    console.log(currentDate.toLocaleDateString());

    const filteredActivities = activities.filter( item => {
      if(item.datesOfActivity.some( item2 =>  item2.date.toLocaleDateString() === currentDate.toLocaleDateString()))
      {
        return(item)
      }
      })

      if(summaryData.length > 0){
        const newFilteredActivities = filteredActivities.filter( item => {
          if(!summaryData.some(item2 => item2.idActivity === item._id.toString())){
            return({...item})
            // console.log('fail, es igual');
            // return;
          }
        })
        console.log(newFilteredActivities);
        for(let i = 0; i < newFilteredActivities.length; i++ ){
          const summary = new Summary();
          summary.idActivity = newFilteredActivities[i]._doc._id.toString();
          await summary.save();
        }
      }else{

        for(let i = 0; i < filteredActivities.length; i++ ){
          const summary = new Summary();
          summary.idActivity = filteredActivities[i]._id.toString();
          await summary.save();
        }

      }

    //   for(let i = 0; i < filteredActivities.length; i++ ){
    //     if(!summaryData.some( item =>  item.idActivity === filteredActivities[i]._id))
    //  {
    //     const summary = new Summary();
    //     summary.idActivity = filteredActivities[i]._id;
    //     await summary.save();
    //   }
    //   }
    


};

export {saveActivity,
        getActivities,
        updateActivity,
        deleteActivity,
        checkActivities}