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
      nome: 'Loja teste de cadastro 1',
      descricao:
        'Drescição teste 112323 123 123 1223233 112312323 123 112323 123 123 123 123 123 123 123 123123 123 12332323',
      endereco: 'avenida sete de setembro 7426',
      user_id: user.id,
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});
