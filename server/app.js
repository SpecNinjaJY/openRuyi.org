import Koa from 'koa'
import path  from 'path'
import {fileURLToPath} from 'url';
import koaStatic from 'koa-static'
import views from 'koa-views'
import router from './router.mjs'
import { koaBody } from 'koa-body'
const app = new Koa()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) {
    ctx.url = ctx.url.replace('/api','')
  }
  await next()
})


app.use(views(path.resolve(__dirname, '..', 'dist'), { extension: 'html' })) /* 动态模板 */

app.use(koaStatic(path.resolve(__dirname, '..', 'dist')), {
  maxage: 10000
}) 

app.use(
  koaBody({
    multipart: true /* 通过设置multipart可以允许读取formdata */,
    formidable: {
        maxFileSize: 50 * 1024 * 1024 // 设置最大文件大小为50MB
    }
  })
)


 /* 后端路由 */
app.use(router.routes()).use(router.allowedMethods())



app.use(async (ctx, next) => {
  await ctx.render('index', {})
})

app.listen(801, () => console.log(`server is running on port 801`))
