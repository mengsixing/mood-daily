import devconfig from './local'
import prodconfig from './server'

//这里是公共配置
let config={};

if(process.env.NODE_ENV=='production'){
	Object.assign(config,prodconfig);
}else{
	Object.assign(config,devconfig);
}

export default config;
