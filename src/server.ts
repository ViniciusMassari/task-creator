import { app } from './app';
import { env } from './env';

app.listen({ port: env.PORT }, async function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  await app.ready();
  app.swagger();
  console.log('Listening on ' + address);
});
