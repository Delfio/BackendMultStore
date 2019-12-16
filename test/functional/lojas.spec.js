const { test, trait } = use('Test/Suite')('Lojas');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Criar lojas dentro do aplicativo', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/lojas')
    .send({
      nome: 'Loja teste 123',
      descricao: 'Uma loja focada em testes para clientes que usam a plataforma 123',
      endereco: 'Avenida sete de setembro 245',
      user_id: 1,
      CNPJ: '12345678910123',
    })
    .end();

  response.assertStatus(201);
});
