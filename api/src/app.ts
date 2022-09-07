import {join} from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import {FastifyPluginAsync} from 'fastify';
import {serializerCompiler, validatorCompiler} from 'fastify-type-provider-zod';
import prettifier from '@mgcrea/pino-pretty-compact'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!

  // Add schema validator and serializer
  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  opts.options = {
    ...opts.options,
    disableRequestLogging: true,
    logger: {prettyPrint: true, prettifier,},
  }

  fastify.addHook('preHandler', function (req, reply, done) {
    if (req.body) {
      req.log.info({ body: req.body }, '(preHandler hook) parsed body')
    }
    done()
  })


  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })
};

export default app;
export { app }
