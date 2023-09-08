const express = require('express');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const user = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecretKey = "Mynameisganeshpeduiamsoftwaredeveloper";



Router.post('/createuser', [
    
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 8 }),
   
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const salt  = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash( req.body.password, salt  )

    try {
        await user.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            location: req.body.location
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});




Router.post('/loginuser',[

    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 8 })]

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const pwPassword = await bcrypt.compare(req.body.password ,userData.password )

            if (!pwPassword) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const data = {
                user : {
                    id : userData.id
                }
            }

            const authToken = jwt.sign(data , jwtSecretKey)


            return res.json({ success: true , authToken:authToken});

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })




module.exports = Router;