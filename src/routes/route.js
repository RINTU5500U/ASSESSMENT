const express = require("express")
const router = express.Router()

const {createStudentData} = require('../controllers/studentController')

router.post('/createStudentData',createStudentData )
router.all("/*", (req,res) => {return res.status(400).send({status: false , msg : "Endpoint is not valid"})})

module.exports = router