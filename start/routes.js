/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store').validator('CreateUser'); // Criar User
Route.post('sessions', 'SessionController.store').validator('Session'); // Logar

Route.post('forgot', 'ForgotPasswordController.store').validator('Forgot'); // Email para recuperaçaõ de senha
Route.post('reset', 'ResetPasswordController.store').validator('Reset'); // Mudar a senha

Route.group(() => {
  Route.post('lojas', 'LojaController.store').validator('Lojas'); // Cadastrar loja
}).middleware('auth');

