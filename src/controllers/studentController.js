const studentModel = require('../models/studentModel')

module.exports = {
    createStudentData : async (req, res) => {
        try {
            let data = req.body
            let {name, department,email, mobile, address} = data
            if (address) {
                let {place, city, pincode} = address
            }

            if (!name) {
                return res.status(400).send({ status: false, msg: "name is required" })
            }
            if (!/^[A-Za-z ]+$/.test(name)) {
                return res.status(400).send({ status: false, msg: "name should be in a valid format" })
            }
            if (department) {
                if (!/^[A-Za-z ]+$/.test(department)) {
                    return res.status(400).send({ status: false, msg: "department should be in a valid format" })
                }
            }
            if (!email) {
                return res.status(400).send({ status: false, msg: "email is required" })
            }
            if (!/.+\@.+\..+/.test(email)) {
                return res.status(400).send({ status: false, msg: "please enter a valid email" })
            }
            if (!mobile) {
                return res.status(400).send({ status: false, msg: "mobile is required" })
            }
            if (!/^[0-9]{10}$/.test(mobile)) {
                return res.status(400).send({ status: false, msg: "mobile should be 10 digits only" })
            }

            let uniqueData = await studentModel.find({ $and: [{ $or: [{ mobile: mobile }, { email: email }] }, { isDeleted: false }] })
            let arr = []
            uniqueData.map((i) => { arr.push(i.mobile, i.email) })

            if (arr.includes(mobile)) {
                return res.status(409).send({ status: false, msg: "mobile is already exsits" })
            }
            if (arr.includes(email)) {
                return res.status(409).send({ status: false, msg: "email is already exsits" })
            }

            if (address) {
                if (place) {
                    if (!/^[A-Za-z ]+$/.test(place)) {
                        return res.status(400).send({ status: false, msg: "please enter a valid place" })
                    }
                }
                if (city) {
                    if (!/^[A-Za-z ]+$/.test(city)) {
                        return res.status(400).send({ status: false, msg: "please enter a valid city" })
                    }
                }
                if (pincode) {
                    if (!/^([0-9]{6})$/.test(pincode)) {
                        return res.status(400).send({ status: false, msg: "please enter a valid pincode" })
                    }
                }
            }
            let saveData = await studentModel.create(data)
            return res.status(200).send({status: false, msg: "Data created successfully", Data: saveData})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}