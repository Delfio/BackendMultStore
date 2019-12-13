'use strict'

const User = use('App/Models/User');

class UserController {
  async store({request, response, auth}){
    const data = request.only([
      'username',
      'telefone',
      'email',
      'password'
    ]);

    const user = await User.create(data);

    //const token = await auth.attempt(email, password)

    return user;
  }
}

module.exports = UserController
