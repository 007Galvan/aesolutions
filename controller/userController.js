import User from "../model/users.js";


const saveUser = async (req, res) => {
    const user = new User(req.body);
    try {
      const storedUser = await user.save();
      // res.json(storedCostumer);
      res.status(200).send({
        message: "user saved succesfuly",
        status:"ok",
        storedUser
    })
      console.log('se guardó usuario')
    } catch (error) {
      console.log(error);
    }
  };

  const getCostumers = async (req, res) => {
    try {
      const users = await User.find()
      // res.json(costumers);

      if(!users){
        return res.status(202).send({
            mensaje:"No hay registros en la BD",
            status:"ok"
        })
    }
    return res.status(200).json(users);
    // .send({
    //     costumers
    // })
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    console.log(user);
  
    if (!user) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  
    // if (costumer._id.toString() !== req._id.toString()) {
    //   return res.json({ msg: "Accion no válida" });
    // }
  
    // Actualizar Paciente
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.job = req.body.job || user.job;
    
    
  
    try {
      // findOneAndUpdate(consulta,nuevo,{new:true}
      const userUpdated = await user.save();
      res.json(userUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser= async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  
    // if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    //   return res.json({ msg: "Accion no válida" });
    // }
  
    try {
      await user.deleteOne();
      res.json({ msg: "Usuario Eliminado" });
    } catch (error) {
      console.log(error);
    }
  };

  export {saveUser, 
          getCostumers,
          updateUser,
          deleteUser};      