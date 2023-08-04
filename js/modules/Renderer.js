export default function Renderer(props){
	const { config, server } = props;
	let itemId = 0;
	let items = [];
	let orderUserToken = "";

	this.showLogin = function showLogin(){
		const loginBox = document.createElement('div');
		loginBox.innerHTML = 'Чтобы сохранять историю заказов, используйте систему токенов:';

		let orders = document.createElement('div');
		orders.id = 'userOrders';
		orders.innerHTML = 'ВАШИ ЗАКАЗЫ:<br>';
		const loginBut = document.createElement('button');
		loginBut.innerHTML = 'Login!';
		let ordersData = [];

		loginBut.addEventListener('click', async function(){
			loginBox.innerHTML = 'Login as "' + token.value + '": wait...';
			document.getElementById('orderBut').innerHTML = "order with '" + token.value + "' token";

			const resLogin = await server.sendReq('signin', '&token=' + token.value);
			loginBox.innerHTML = 'Logged in as "' + token.value + '": SUCCESS<br>Login as another token: ';
			loginBox.appendChild(token);
			loginBox.appendChild(loginBut);

			loginBox.appendChild(orders);
			orderUserToken = token.value;
			// TODO: ...GET SERVER DATA FROM TOKEN
			ordersData = [];
		});

		const token = document.createElement('input');
		token.setAttribute('name', 'token');
		token.placeholder = 'Введите ваш токен здесь';


		const newUserToken = document.createElement('div');
		newUserToken.innerHTML = 'Если вы здесь впервые, токен сегенерируется автоматически при заказе. Либо можете сделать это сейчас: ';
		const genTokenBut = document.createElement('button');
		genTokenBut.innerHTML = 'сгенерировать';
		genTokenBut.addEventListener('click', async function(){
			loginBox.innerHTML = 'Creating new token": wait...';

			const resNewUserToken = await server.sendReq('getNewUserToken');	
			const resLogin = await server.sendReq('signin', '&token=' + token.value);

			document.getElementById('orderBut').innerHTML = "order with '" + resNewUserToken.data + "' token";

			loginBox.innerHTML = 'Logged in as "' + resNewUserToken.data + '": SUCCESS<br>Login as another token: ';
			loginBox.appendChild(token);
			loginBox.appendChild(loginBut);
			loginBox.appendChild(orders);

			ordersData = [];
			orderUserToken = resNewUserToken.data;
		});

		loginBox.appendChild(token);
		loginBox.appendChild(loginBut);
		newUserToken.appendChild(genTokenBut);
		loginBox.appendChild(newUserToken);
		document.getElementsByTagName('body')[0].appendChild(loginBox);	
	};

	this.showCalc = function showCalc(){
		const calcBox = document.getElementById('rdCalcBox');
		const calcForm = document.createElement('form');
		calcForm.id = 'rdCalcForm';

		const calcAddItem = document.createElement('button');
		calcAddItem.innerHTML = 'add item';
		calcAddItem.addEventListener('click', ()=>{
			const item = document.createElement('div'); 
			item.id = 'rdCalcItem-' + itemId;
	
			const close = document.createElement('button');
			close.innerHTML = 'X';
			close.addEventListener('click', ()=>{
				item.remove();
			});

			const category = document.createElement('select');
			category.addEventListener('focus', async ()=>{
				material.innerHTML = '';
				category.innerHTML = '';
				let img = document.createElement('img');
				img.src = "assets/load2.gif";
				//img.width = "200";
				img.height = "100";
				item.appendChild(img);

				let res = await server.sendReq('getCategories');
				img.remove();

				// HERE WE ARE CREATING OPTIONS...
				res.data.forEach((el,i)=>{
					const categoryOption = document.createElement('option');
					categoryOption.innerHTML = el.category_name;	
					categoryOption.addEventListener('click', async ()=>{
						material.innerHTML = '';
						measure.innerHTML = '';
						price.value = '';
						let resMaterials = await server.sendReq('getMaterials', '&category_id='+el.category_id);

						resMaterials.data.forEach((el2, mi)=>{
							const materialOption = document.createElement('option');
							materialOption.innerHTML = el2.material_name;
							materialOption.addEventListener('click', async ()=>{
								amount.setAttribute('data-unit-price', el2.material_unit_price);
								price.value = el2.material_unit_price * amount.value;
								materialImgBox.src = '';

								let resUnit = await server.sendReq('getUnit', '&unit_id=' + el2.material_unit_id);	
								measure.innerHTML = resUnit.data.unit_material_name;

								let resImage = await server.sendReq('getMaterialImage', '&material_img_id=' + el2.material_img_id);
								if(resImage.result == 'ok') materialImgBox.src = resImage.data.img_src;

							});

							material.appendChild(materialOption);	
						}); // forEach2

						
					});
		
					category.appendChild(categoryOption);
				}); // forEach1

			});

			const material = document.createElement('select');
			// ...
	
			const amount = document.createElement('input');
			amount.value = 1;
			amount.addEventListener('change', ()=>{
				price.value = amount.dataset.unitPrice * amount.value;
			});
	
			const measure = document.createElement('div');
			// ...
	
			const materialImgBox = document.createElement('img');	

			
			const price = document.createElement('input');
			price.disabled = true; 
	
			itemId++;
			item.appendChild(close);
			item.appendChild(category);
			item.appendChild(material);
			item.appendChild(amount);
			item.appendChild(measure);
			item.appendChild(materialImgBox);
			item.appendChild(price);

			calcForm.appendChild(item);

			// Forming items data for the server
			items.push({
				itemId: itemId,
				itemCategory: "TODO",
				itemMaterial: "TODO",
				itemAmount: "TODO",
				itemPrice: "TODO",
			});
			console.log(items);
		});	// calcAddItem.addEventListener()

		const calcSumPrice = document.createElement('input');
		calcSumPrice.disabled = true;
		calcSumPrice.placeholder = 'SUM PRICE';

		calcForm.appendChild(calcSumPrice);
		calcBox.appendChild(calcForm);
		calcBox.appendChild(calcAddItem);

		// DEVELOP 
		calcAddItem.dispatchEvent(new Event("click"));
		//console.log(this.state);
		
		const orderBut = document.createElement("button");	
		orderBut.id = "orderBut";
		orderBut.innerHTML = "order";
		orderBut.addEventListener('click', ()=>{
			let date = new Date();
			let order = {
				msg: "hello Server!",
				items: items,
				orderSumPrice: "TODO",
				orderDate: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), 
				orderUserToken: orderUserToken,
			}

			let msgToSrv = JSON.stringify(order);
			console.log(order);
			console.log(msgToSrv);
		});
		calcBox.appendChild(orderBut);
	};
}
