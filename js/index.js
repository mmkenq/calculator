// Calculator
import Config from './Config.js';
import Calculator from './modules/Calculator.js';
import Renderer from './modules/Renderer.js';

document.addEventListener('DOMContentLoaded', ()=>{
	let calc = new Calculator({
		config: new Config()
	});

	let renderer = new Renderer({
		calc: calc
	});

	renderer.showCalc();

	// DEVELOP
	console.log("CALC:", calc);
	console.log("RENDERER:", renderer);
});
