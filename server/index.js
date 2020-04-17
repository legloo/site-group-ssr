const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const axios = require('axios');
config.dev = app.env !== 'production'

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
};

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // app.use(async (ctx, next) => {	
  //   console.log('``````````````ctx``````````````');
  //   let clinetip = getClientIp(ctx.req);
  //   const ipInfo = await axios.get('http://www.ddnews.top/apis/api/article/front/search/1/5?typeId=1');	
  //   if(ipInfo.data.data.contents.length){
  //     console.log(ipInfo.data.data.contents.length)
  //     ctx.status = 404;
  //     return;
  //   }
  //   console.log('*************************************');
  //   await next();	
  // });


  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
