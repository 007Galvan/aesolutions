import Costumer from "../model/costumer.js";

const saveCostumer = async (req, res) => {
    const costumer = new Costumer(req.body);
    try {
      const storedCostumer = await costumer.save();
      // res.json(storedCostumer);
      res.status(200).send({
        message: "costumer saved succesfuly",
        status:"ok",
        storedCostumer
    })
      console.log('se guardó cliente')
    } catch (error) {
      console.log(error);
    }
  };

  const getCostumers = async (req, res) => {

    try {
      const costumers = await Costumer.find()
      // res.json(costumers);

      if(!costumers){
        return res.status(202).send({
            mensaje:"No hay registros en la BD",
            status:"ok"
        })
    }
    return res.status(200).json(costumers);
    // .send({
    //     costumers
    // })
    } catch (error) {
      console.log(error);
    }
    
  };

  const updateCostumer = async (req, res) => {
    const { id } = req.params;
    const costumer = await Costumer.findById(id);

    console.log(costumer);
  
    if (!costumer) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  
    // if (costumer._id.toString() !== req._id.toString()) {
    //   return res.json({ msg: "Accion no válida" });
    // }
  
    // Actualizar Paciente
    costumer.name = req.body.name || costumer.name;
    costumer.address = req.body.address || costumer.address;
    costumer.phone = req.body.phone || costumer.phone;
    costumer.email = req.body.email || costumer.email;
    costumer.machines = req.body.machines || costumer.machines;
  
    try {
      // findOneAndUpdate(consulta,nuevo,{new:true}
      const costumerUpdated = await costumer.save();
      res.json(costumerUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  
const deleteCostumer= async (req, res) => {
  const { id } = req.params;
  const costumer = await Costumer.findById(id);

  if (!costumer) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  // if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
  //   return res.json({ msg: "Accion no válida" });
  // }

  try {
    await Costumer.deleteOne();
    res.json({ msg: "Cliente Eliminado" });
  } catch (error) {
    console.log(error);
  }
};
  

  export {
    saveCostumer,
    getCostumers,
    updateCostumer,
    deleteCostumer
  }