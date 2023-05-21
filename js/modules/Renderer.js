export default function Renderer(props){
	this.state = {
		server: props.server,
		calc: props.calc,	

		itemId: 0
	};

	const {calc, itemId} = this.state;

	this.showCalc = function showCalc(){
		const calcBox = document.getElementById('rdCalcBox');
		const calcForm = document.createElement('form');
		calcForm.id = 'rdCalcForm';

		const calcAddItem = document.createElement('button');
		calcAddItem.innerHTML = 'add item';
		calcAddItem.addEventListener('click', ()=>{
			const item = document.createElement('div'); 
			item.id = 'rdCalcItem-' + this.state.itemId;
	
			const close = document.createElement('button');
			close.innerHTML = 'X';
			close.addEventListener('click', ()=>{
				item.remove();
			});

			const category = document.createElement('select');
			category.addEventListener('focus', async ()=>{
				category.innerHTML = '';
				let img = document.createElement('img');
				img.src = "assets/load2.gif";
				//img.width = "200";
				img.height = "100";
				item.appendChild(img);

				let res = await this.state.server.sendReq('getMaterials');
				img.remove();

				// HERE WE ARE CREATING OPTIONS...
				res.data.forEach((el,i)=>{
					const categoryOption = document.createElement('option');
					categoryOption.innerHTML = el.material_name;	
					categoryOption.addEventListener('click', ()=>{
						product.innerHTML = '';
						console.log(el);
						//el.products.forEach((el2, j)=>{
						//	const productOption = document.createElement('option');
						//	productOption.innerHTML = el2.name;
						//	productOption.addEventListener('click', ()=>{
						//		measure.innerHTML = this.state.calc.state.config.measureNames[el2.measure];
						//	});
		
						//	product.appendChild(productOption);
						//});
					});
		
					category.appendChild(categoryOption);
					});
			});

			const product = document.createElement('select');
			// ...
	
			const amount = document.createElement('input');
			amount.value = 1;
	
			const measure = document.createElement('div');
			// ...
	
			const price = document.createElement('input');
			price.disabled = true; 
	
			this.state.itemId++;
			item.appendChild(close);
			item.appendChild(category);
			item.appendChild(product);
			item.appendChild(amount);
			item.appendChild(measure);
			item.appendChild(price);

			calcForm.appendChild(item);
		});	

		const calcSumPrice = document.createElement('input');
		calcSumPrice.disabled = true;
		calcSumPrice.placeholder = 'SUM PRICE';

		calcForm.appendChild(calcSumPrice);
		calcBox.appendChild(calcForm);
		calcBox.appendChild(calcAddItem);

		// DEVELOP 
		calcAddItem.dispatchEvent(new Event("click"));
		//console.log(this.state);
	};
}
