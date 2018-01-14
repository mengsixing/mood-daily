import path from 'path'
const devConfig = {
	port: 8081,
	"viewDir":path.join(__dirname, '..', 'views'),
	"staticDir":path.join(__dirname, '..','assets')
};


export default devConfig;