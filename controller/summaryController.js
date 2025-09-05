import Summary from "../model/summary.js";
import {bucket} from "../firebase.js";

import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import path from "path";
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const getSummaryOne = async(req, res)=>{

  const {_id} = req.params

    try {
        const summary = await Summary.findOne({_id});
        // res.json(costumers);

        if(!summary){
          return res.status(202).send({
              mensaje:"Registro no encontrado",
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



const updateSummary = async (req, res) => {
  const { id } = req.params;
  const summary = await Summary.findById(id);
  let publicUrl = null;

  console.log(summary);

  if (!summary) {
    return res.status(404).json({ msg: "Resumen no encontrada" });
  }

  // if (costumer._id.toString() !== req._id.toString()) {
  //   return res.json({ msg: "Accion no válida" });
  // }

  try{
    const { signature} = req.body;
    const fileName = `signature_${Date.now()}.png`;

  if (!signature || !fileName) {
    return res.status(400).json({ error: "Falta la firma y el nombre" });
  }

    const buffer = Buffer.from(signature, "base64");
    const file = bucket.file(`uploads/${fileName}`);

    await file.save(buffer, {
      metadata: { contentType: "image/png" }, // adjust if needed
      public: true,
    });

    publicUrl = `https://storage.googleapis.com/${bucket.name}/uploads/${fileName}`;
    // res.json({ url: publicUrl });

  }catch(error){
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }

  // Actualizar actividad
  summary.status = req.body.status || summary.status;
  summary.idActivity = req.body.idActivity || summary.idActivity;
  summary.signature = publicUrl || summary.signature;
  summary.nameSign = req.body.nameSign || summary.nameSign;


  try {
    // findOneAndUpdate(consulta,nuevo,{new:true}
    const summaryUpdated = await summary.save();
    res.status(200).json({ message: summaryUpdated });
  } catch (error) {
    console.log(error);
  }
};


const generatePDF = async (req, res) =>{

  const { id } = req.params;
  const {nameActivity, descriptionActivity, date, costumers, machines, managers, signature, nameSign} = req.body;
  const summary = await Summary.findById(id);


  try {


   if(!summary){
          return res.status(202).send({
              mensaje:"No hay registros en la BD",
              status:"ok"
          })
      }


   const doc = new PDFDocument();
   const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);
      const fileName = `${nameActivity}_${Date.now()}`

      //upload buffer to firebase storage
      const file = bucket.file(`pdfs/${fileName}.pdf`);
      await file.save(pdfBuffer, {
        metadata: { contentType: 'application/pdf' },
        public: true, // optional
      });

      const publicUrlPDF = `https://storage.googleapis.com/${bucket.name}/pdfs/${fileName}.pdf`;
      // res.status(200).json({ message: 'PDF uploaded', url: publicUrlPDF });

      //Actualizar actividad
        console.log(publicUrlPDF);
        summary.pdf = { title: nameActivity, pdf: publicUrlPDF } || summary.pdf;
        console.log(summary);
        const summaryPDF = await summary.save();
        res.status(200).json({ message: summaryPDF });

    });


    //write content to PDF
     // 🔽 Insert Image
    
   const imagePath = path.join(__dirname, '..' ,'public', 'images', 'logo.jpg');
   const topMargin = 50;
   const imageWidth = 200; // same as your fit width
   const pageWidth = doc.page.width;
   const imageX = (pageWidth - imageWidth) / 2;
    // 1. Download the image from the URL
    const response = await axios.get(signature, {
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data, 'binary');

  
  // PDF content

  doc.image(imagePath, 50, topMargin, {
    fit: [100, 100],
    align: 'left',
    // valign: 'center'
  });
  doc.fontSize(12).text('HOJA DE SERVICIO', { align: 'right' });


   doc.fontSize(8)
         .text('Aguascalientes, Ags.', { align: 'center' })
         .text('Tel. +52(494)1066082', { align: 'center' })
         .text('aescobedo@aes-autoamtion.com', { align: 'center' })



    doc.fontSize(12).text('Fecha: '+ ` ${new Date().toLocaleDateString()}` || 'No content provided.', { align: 'right' });
    doc.moveDown();
     
    doc.fontSize(12).text('CLIENTE: ' + ` ${costumers[0].name}` || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('ACTIVIDAD: ' + ` ${nameActivity}` || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('EQUIPO(S): ' +  (machines.length > 0 
    ? machines.map(m => m.name).join(', ') 
    : 'planta 1'), { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('TECNICO(S) ENCARGADO: ' +  (managers.length > 0 
    ? managers.map(m => m.name).join(', ') 
    : 'Leonardo Astorga'), { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('DESCRIPCIÓN DE ACTIVIDAD: '+ ` ${descriptionActivity}` || 'No content provided.', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('NOMBRE DE QUIEN LIBERA: ' + ` ${nameSign}` || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('FIRMA: ' , { align: 'left' });
    doc.moveDown();
    doc.image(imageBuffer, imageX, doc.y, {
    fit: [200, 200],
    align: 'center',
    valign: 'center'
  });
    doc.end();



  }catch(error){
     console.error(error);
     res.status(500).send('Failed to upload pdf to firebase');
  }


}

const retrievePDF = async (req, res) =>{
 try {
    const summary = await Summary.findById(req.params.id);
     if (!summary || !summary.pdf || !summary.pdf.pdf) {
      return res.status(404).send('PDF not found');
    }

    const pdflink = summary.pdf.pdf; // this is a Buffer (binary)
    // const base64Pdf = pdfBuffer.toString('base64');


    // res.set('Content-Type', 'application/pdf');
    // res.send(pdf.pdf.pdf);
    res.json({ link: pdflink });
  } catch (err) {
    res.status(500).send('Error retrieving PDF');
  }
}

const viewPDF = async (req, res) =>{

   const doc = new PDFDocument();
    // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=document.pdf');

  // Pipe PDF stream directly to response
  doc.pipe(res);

  // PDF content
   const imagePath = path.join(__dirname, '..' ,'public', 'images', 'logo.jpg');
   const topMargin = 50;
   const imageWidth = 200; // same as your fit width
   const pageWidth = doc.page.width;
   const imageX = (pageWidth - imageWidth) / 2;



  doc.image(imagePath, 50, topMargin, {
    fit: [100, 100],
    align: 'left',
    // valign: 'center'
  });
  doc.fontSize(12).text('HOJA DE SERVICIO', { align: 'right' });


   doc.fontSize(8)
         .text('Aguascalientes, Ags.', { align: 'center' })
         .text('Tel. +52(494)1066082', { align: 'center' })
         .text('aescobedo@aes-autoamtion.com', { align: 'center' })



    doc.fontSize(12).text('Fecha: '+ ` ${new Date().toLocaleDateString()}` || 'No content provided.', { align: 'right' });
    doc.moveDown();
     
    doc.fontSize(12).text('CLIENTE: ' + ' lescen SA de CV' || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('ACTIVIDAD: ' + ' limpieza cuarto de pelusa' || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('EQUIPO(S): ' + ' secadora #4' || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('TECNICO(S) ENCARGADO: ' + ' Leonardo Astorga y Alfredo Escobedo' || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('DESCRIPCIÓN DE ACTIVIDAD: '+ 'se limpio el cuarto de pelusa de planta 1, ademas se sopleteo la pared' || 'No content provided.', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('NOMBRE DE QUIEN LIBERA: ' + ' Danna Martinez' || 'Default Title', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text('FIRMA: ' , { align: 'left' });
    doc.moveDown();
    doc.image(imagePath, imageX, doc.y, {
    fit: [200, 200],
    align: 'center',
    valign: 'center'
  });
    

  // Add more content here...

  doc.end(); // Finalize the PDF and send it
}



export {getSummary,
        getSummaryOne,
        updateSummary,
        generatePDF,
        retrievePDF,
        viewPDF
       }