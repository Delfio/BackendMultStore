/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  */
const Token = use('App/Models/Token');

// eslint-disable-next-line import/no-extraneous-dependencies
const Moment = require('Moment');

class ResetPasswordController {
  async store({ request, response }) {
    const { token, password } = request.only(['token', 'password']);

    const userToken = await Token.findByOrFail('token', token);

    const tokenExpired = Moment()
      .subtract('2', 'hours')
      .isAfter(userToken.created_at);

    if (tokenExpired) {
      await userToken.delete();

      return response.status(400).json({ error: 'token expirado' });
    }
    const user = await userToken.user().fetch();

    user.password = password;

    await user.save();

    await userToken.delete();

    return response.status(200).json({ ok: 'Senha alterada' });
  }
}

module.exports = ResetPasswordController;
