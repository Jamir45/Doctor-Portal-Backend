const express = require('express')
const router = express.Router()

const AppointmentData = require('../Models/bookAppointment')

// Add an Appointment Data
router.post('/appointment', async (req, res) => {
   try {
      const appointment = new AppointmentData(req.body)
      await appointment.save()
      res.send(appointment)
   } catch (error) {
      res.status(400).send(error.message)
   }
})

// Get Appointment Data
router.get('/get-appointments', async(req, res) => {
   try {
      const allData = await AppointmentData.find()
      res.send(allData)
   } catch (error) {
      res.status(404).send(error.message)
   }
})

// Post Prescription Data on Database
router.put('/add-prescription', async (req, res) => {
   try {
      const prescriptionData = await AppointmentData.findByIdAndUpdate({_id:req.body.patientId}, {
         $push:{prescription:req.body.prescription}
      }, {new:true}
      )
      res.send(prescriptionData)
   } catch (error) {
      res.status(500).send(error.message)
   }
})

// Post Prescription Data on Database
router.put('/add-status', async (req, res) => {
   try {
      const Data = await AppointmentData.findByIdAndUpdate({_id:req.body.patientId}, {
         status:req.body.status
      }, {new:true}
      )
      res.send(Data)
   } catch (error) {
      res.status(500).send(error.message)
   }
})

router.get('/', (req, res) => {
   res.send("Welcome to node app")
})


module.exports = router