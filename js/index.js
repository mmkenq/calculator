// Calculator
import Config from './Config.js';
import Server from './modules/Server.js';
import Calculator from './modules/Calculator.js';
import Renderer from './modules/Renderer.js';

document.addEventListener('DOMContentLoaded', ()=>{
	let server = new Server({

	});

	let calc = new Calculator({
		config: new Config()
	});

	let renderer = new Renderer({
		server: server,
		calc: calc,
	});

	renderer.showCalc();

	// DEVELOP
	console.log("CALC:", calc);
	console.log("RENDERER:", renderer);
});
