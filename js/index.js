// Calculator
import Config from './Config.js';
import Server from './modules/Server.js';
import Calculator from './modules/Calculator.js';
import Renderer from './modules/Renderer.js';

document.addEventListener('DOMContentLoaded', ()=>{
	let config = new Config();
	
	let server = new Server({
		config: config.serverConfig,
	});

	let calc = new Calculator({
		//config: config,
	});

	let renderer = new Renderer({
		config: config.rendererConfig,
		server: server
	});

	renderer.showCalc();

	// DEVELOP
	console.log("CALC:", calc);
	console.log("RENDERER:", renderer);
});
