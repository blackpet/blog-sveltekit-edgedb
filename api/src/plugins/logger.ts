import fp from 'fastify-plugin'
import fastifyRequestLogger, {FastifyRequestLoggerOptions} from '@mgcrea/fastify-request-logger'
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifyRequestLoggerOptions>(async (fastify) => {
  fastify.register(fastifyRequestLogger)
})
