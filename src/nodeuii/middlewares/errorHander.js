class ErrorHander{
    init(app,logger){
        logger.error('Entering errorlog testing');
        //捕获内部错误
        app.use(async (ctx,next)=>{
            try{
                await next();
            }catch(e){
                ctx.status=500;
                ctx.body='内部错误';
            }
        });
        //捕获404错误
        app.use(async(ctx,next)=>{
            await next();
            if(ctx.status!=404){
                return;
            }else{
                ctx.body='没有找到页面';
            }
        })
    }
}

export default ErrorHander;