const UserSchema = require('../Schemas/UserSchema');
const bcrypt = require('bcrypt');
const ContactUs = require('../Schemas/ContactUs');

exports.ContactUs = (req, res) => {
    const { name, email, mobile, query } = req.body;

    ContactUs.insertMany({ name: name, email: email, mobile: mobile, query: query }).then((result) => {
        console.log(result)
        res.send({ status: 200, message: "Query Submitted Successfully" })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ status: 500, message: "Something went wrong !! Please, Try Again" })
    })
} 

    exports.RegisterUser = (req, res) => {
    const { name, email, mobile, address, password, gender } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            res.status(500).send({ status: 500, message: "Something went wrong !! Please, Try Again" })
        }

        else {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    res.status(400).send({ status: 400, message: "Something went wrong !! Please, Try Again" })
                }

                else {
                    UserSchema.insertMany({ name: name, address: address, email: email, mobile: mobile, password: hash, gender: gender }).then((result) => {
                        console.log(result)


                        if (result.length > 0) {
                            res.status(200).send({ status: 200, message: "User Registered Successfully" })
                        }

                        else {
                            res.status(400).send({ status: 400, message: "Something went wrong !! Please, Try Again" })
                        }


                    }).catch((err) => {


                        if (err.name == 'ValidationError') {
                            res.status(400).send({ status: 400, message: `${err.message.split('Path')[1]}` })
                        }

                        else if (err.name == 'MongoBulkWriteError' && err.code == 11000) {
                            res.status(400).send({ status: 400, message: `User Already Exists with ${err.message.split('{')[1].replace('}', '')}` })
                        }

                        else {
                            res.status(500).send({ status: 500, message: "Something went wrong !! Please, Try Again" })
                        }
                    })
                }
            })
        }
    })



}

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    UserSchema.find({ email: email }).then((result) => {
        console.log(result)
        if (result.length > 0) {

            bcrypt.compare(password, result[0].password, function (err, status) {
                if (err) {
                    res.status(500).send({ status: 500, message: "Something went wrong !! Please, Try Again" })
                }
                else {
                    if (status == true) {
                        res.status(200).send({ status: 200, message: "Login Successful", data: result[0] })
                    }

                    else {
                        res.status(400).send({ status: 400, message: "Incorrect Password" })
                    }
                }
            })
        }
        else {
            res.status(400).send({ status: 400, message: "User Not Found!! Register First" })
        }
    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something went wrong !! Please, Try Again" })
    })


}