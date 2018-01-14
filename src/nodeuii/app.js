import Koa from 'koa'
import cors from 'koa2-cors'
import router from 'koa-simple-router'
import config from './config/config.js'
import errorHander from './middlewares/errorHander.js'
import initController from './controller/initController.js'
import log4js from 'log4js'
import serve from 'koa-static'

let app = new Koa();
app.use(cors());
//配置静态资源路径
app.use(serve(config.staticDir));
//配置全局日志打印
log4js.configure({
    appenders: { globallog: { type: 'file', filename: './logs/globallog.log' } },
    categories: { default: { appenders: ['globallog'], level: 'error' } }
  });
const logger = log4js.getLogger('globallog');
//配置全局错误处理
new errorHander().init(app,logger);
//初始化路由
new initController().init(app,router);
app.listen(config.port);


module.exports=app;
