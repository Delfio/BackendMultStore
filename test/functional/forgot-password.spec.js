const Mail = use('Mail')

const { test, trait } = use('Test/Suite')('Recuperação de senha');

const User = use('App/Models/User');
const Hash = use('Hash');
const Database = use('Database');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

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

test('Reset de senha pelo link enviado', async ({ assert, client }) => {
  const email = 'delfio_eu@hotmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);
  
  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();


  response.assertStatus(204);

  await user.reload();

  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);
})