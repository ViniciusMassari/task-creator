import { app } from './app';
import { env } from './env';

app.listen({ port: env.PORT }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log('Listening on ' + address);
});
