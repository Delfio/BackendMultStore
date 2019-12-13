'use strict'

const { test, trait } = use('Test/Suite')('User');


trait('Test/ApiClient')

test('Tesando cadastro de usúario', async ({ assert, client }) => {

  const response = await
    client.post('/users')
    .send({
      username: 'Delfio Francisco',
      telefone: '993014603',
      email: 'delfio_eu@hotmail.com',
      password: '123456'
    }).end()
/*
  const response = await 
    client.post('/users')
    .send({
      email: 'delfio_eu@hotmail.com',
      password: '123456'
    }).end()
*/
response.assertStatus(200)
  //assert.exists(createUser.body.token);
});

test('Autenticação de usúario', async({assert, client}) => {

  const response = await
    client.post('/sessions')
    .send({
      email: 'delfio_eu@hotmail.com',
      password: '123456'
    }).end()

    response.assertStatus(200);

    assert.exists(response.body.token);
})
