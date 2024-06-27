import Summary from "../model/summary.js";


const getSummary = async(req, res)=>{

    try {
        const summary = await Summary.find();
        // res.json(costumers);
    
        if(!summary){
          return res.status(202).send({
              mensaje:"No hay registros en la BD",
              status:"ok"
          })
      }
      // console.log(summary);
      return res.status(200).json(summary);
      // .send({
      //     costumers
      // })
      } catch (error) {
        console.log(error);
      }

}

export {getSummary}