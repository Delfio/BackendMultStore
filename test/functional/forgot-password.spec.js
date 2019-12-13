const Mail = use('Mail')

const { test, trait } = use('Test/Suite')('User');

const User = use('App/Models/User');

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Teste de envio de email com instruções', async ({ assert, client }) => {
  Mail.fake()

  const data = {
    username: 'Delfio Francisco',
    telefone: '993014603',
    email: "delfio_eu@hotmail.com",
    password: '123456'
  }

  const user = await User.create(data);

  const response = await client
    .post('/forgot')
    .send({email: data.email})
    .end()
  
  response.assertStatus(204)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, data.email)

  const token = await user.tokens().first();

  assert.include(token.toJSON(), {
    user_id: user.id,
    type: 'forgotpassword'
  })

  Mail.restore()
})