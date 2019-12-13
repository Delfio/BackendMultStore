'use strict'

const crypto = require('crypto');

/** @type {import('@adonisjs/lucid/src/Schema')} */
const User = user('App/Models/User')

class ForgotPasswordController {
  async store({request, response, auth}){
    console.log("sdf")
  }
}

module.exports = ForgotPasswordController
