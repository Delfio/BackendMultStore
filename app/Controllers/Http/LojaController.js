/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with lojas
 */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  */
const Loja = use('App/Models/Loja');

class LojaController {
  async store({ request, response }) {
    const data = request.only([
      'nome',
      'descricao',
      'endereco',
      'user_id',
      'CNPJ',
      'cor',
    ]);

    const lojas = Loja.create(data);

    return response.status(201).json(lojas);
  }
}

module.exports = LojaController;
