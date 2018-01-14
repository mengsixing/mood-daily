import indexController from './indexController.js'


class InitController{
    init(app,router){
        app.use(router(_ => {
            _.get('/', async(ctx, next) => {
                var data=await new indexController().getIndexInfo();
                ctx.body=await ctx.render('index',{data:data});
            }),
            _.get('/submitTodayData', async(ctx, next) => {
                var requestData=ctx.query;
                var data=await new indexController().submitTodayData(requestData);
                ctx.body=data;
            }),
            _.get('/getAllData', async(ctx, next) => {
                var data=await new indexController().getAllData(ctx.query);
                ctx.body=data;
            }),
            _.get('/getTodayData', async(ctx, next) => {
                var data=await new indexController().getTodayData(ctx.query);
                ctx.body=data;
            }),
            _.get('/getAnydayData', async(ctx, next) => {
                var data=await new indexController().getAnydayData(ctx.query);
                ctx.body=data;
            }),
            _.get('/login', async(ctx, next) => {
                var data=await new indexController().login(ctx.query);
                console.log('这是返回的data',data);
                ctx.body=data;
            }),
            _.get('/register', async(ctx, next) => {
                var data=await new indexController().register(ctx.query);
                ctx.body=data;
            }),
            _.get('/submitTodayDescribe', async(ctx, next) => {
                var data=await new indexController().submitTodayDescribe(ctx.query);
                ctx.body=data;
            })
          }))
    }
}

export default InitController;