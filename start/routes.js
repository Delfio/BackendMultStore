'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('users', 'UserController.store'); //Criar User
Route.post('sessions', 'SessionController.store'); //Logar
Route.post('forgot', 'ForgotPasswordController.store'); //Lembrar Senha
