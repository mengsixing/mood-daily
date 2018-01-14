import indexModel from '../models/indexModel.js'

class indexController{
    getIndexInfo(){
        return new indexModel().getIndexInfo();
    }
    submitTodayData(data){
        return new indexModel().submitTodayData(data);
    }
    getAllData(query){
        return new indexModel().getAllData(query.userId);
    }
    getTodayData(query){
        return new indexModel().getTodayData(query.userId);
    }
    getAnydayData(query){
        return new indexModel().getAnydayData(query.userId,query.date);
    }
    register(data){
        return new indexModel().register(data);
    }
    login(data){
        return new indexModel().login(data);
    }
    submitTodayDescribe(data){
        return new indexModel().submitTodayDescribe(data);
    }
}

export default indexController;