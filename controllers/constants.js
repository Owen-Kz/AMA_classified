// const dotenv = require("dotenv").config();

const { configDotenv } = require("dotenv");

const constants = (req,res) =>{
    console.log(process.env.ENDPOINT)

}

module.exports = constants

