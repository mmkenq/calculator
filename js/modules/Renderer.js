export default function Renderer(props){
	const { config, server } = props;
	let orderUserToken = "";

	function parseRdCalcForm(el){
		let formData = {
			items: [],
			sumPrice: 0,
		};

		Array.from(el.getElementsByClassName('inputItem')).forEach((item, i)=>{
			let category = Array.from(item.getElementsByClassName('category'))[0];
			let material = Array.from(item.getElementsByClassName('material'))[0];
			let amount = Array.from(item.getElementsByClassName('amount'))[0];
			let price = Array.from(item.getElementsByClassName('price'))[0];

			formData.items.push({
				category_id: category.dataset.selectedCatId,
				material_id: material.dataset.selectedMatId,
				amount: Number(amount.value),
				price: Number(price.value),
			});

			formData.sumPrice += Number(price.value);
		});

		return formData;
	}

	function updateSumPrice(calcForm, calcSumPrice){
		let prices = Array.from(calcForm.getElementsByClassName('price'));
		calcSumPrice.value = 0;
		prices.forEach((price,i)=>{
			calcSumPrice.value = Number(calcSumPrice.value) + Number(price.value);
		});	
	}

	async function updateUserOrders(userToken, userOrdersBox){
		userOrdersBox.innerHTML = 'ВАШИ ЗАКАЗЫ: ';
		const resUserOrders = await server.sendReq('getUserOrders', '&token=' + userToken);
		if(!Array.isArray(resUserOrders.data)) console.log(server.getRes(resUserOrders));
		else {
			resUserOrders.data.forEach((order, i) => {
				const orderEntry = document.createElement('div');
				orderEntry.id = 'order-no-' + order.order_id;
				orderEntry.setAttribute('class', 'orderEntry');

				const orderDate = document.createElement('div');
				orderDate.setAttribute('class', 'orderDate');
				orderDate.innerHTML = order.order_date;

				const orderSumPrice = document.createElement('div');
				orderSumPrice.setAttribute('class', 'orderSumPrice');
				orderSumPrice.innerHTML = order.order_sum_price;
				
				orderEntry.appendChild(orderDate);
				orderEntry.appendChild(orderSumPrice);

				const orderItems = order.order_items;
				orderItems.forEach((item, j) => {
					const orderItem = document.createElement('div');
					orderItem.setAttribute('class', 'orderItem');
					
					const orderItemPrice = document.createElement('input');
					orderItemPrice.disabled = true;
					orderItemPrice.value = item.price;

					const orderItemAmount = document.createElement('input');
					orderItemAmount.disabled = true;
					orderItemAmount.value = item.amount;

					const orderItemCatName = document.createElement('div');
					orderItemCatName.innerHTML = item.category_name;
					const orderItemMatName = document.createElement('div');
					orderItemMatName.innerHTML = item.material_name;

					orderItem.appendChild(orderItemCatName);
					orderItem.appendChild(orderItemMatName);
					orderItem.appendChild(orderItemAmount);
					orderItem.appendChild(orderItemPrice);
					orderEntry.appendChild(orderItem);
				});

				userOrdersBox.appendChild(orderEntry);
			});
		}
	}

	function updateLoginBox(newUserToken, loginBox){
		const token = document.createElement('input');
		token.setAttribute('name', 'token');
		token.placeholder = 'Введите ваш токен здесь';

		loginBox.innerHTML = 'Logged in as "' + newUserToken + '": SUCCESS<br>Login as another token: ';
		document.getElementById('orderBut').innerHTML = "order with '" + newUserToken + "' token";

		const loginBut = document.createElement('button');
		loginBut.innerHTML = 'Login!';

		loginBut.addEventListener('click', async function(){
			orderUserToken = token.value;
			loginBox.innerHTML = 'Login as "' + orderUserToken + '": wait...';
			document.getElementById('orderBut').innerHTML = "order with '" + orderUserToken + "' token";

			const resLogin = await server.sendReq('signin', '&token=' + orderUserToken);
			updateLoginBox(orderUserToken, loginBox);
			updateUserOrders(orderUserToken, document.getElementById('userOrdersBox'));
		});

		loginBox.appendChild(token);
		loginBox.appendChild(loginBut);
	}

	this.showLogin = function (){
		const loginBox = document.createElement('div');
		loginBox.id = "rdLoginBox";
		loginBox.innerHTML = 'Чтобы сохранять историю заказов, используйте систему токенов:';

		const token = document.createElement('input');
		token.setAttribute('name', 'token');
		token.placeholder = 'Введите ваш токен здесь';

		const loginBut = document.createElement('button');
		loginBut.innerHTML = 'Login!';

		loginBut.addEventListener('click', async function(){
			orderUserToken = token.value;
			loginBox.innerHTML = 'Login as "' + orderUserToken + '": wait...';
			document.getElementById('orderBut').innerHTML = "order with '" + orderUserToken + "' token";

			const resLogin = await server.sendReq('signin', '&token=' + orderUserToken);
			updateLoginBox(orderUserToken, loginBox);
			updateUserOrders(orderUserToken, document.getElementById('userOrdersBox'));
		});

		const newUserToken = document.createElement('div');
		newUserToken.innerHTML = 'Если вы здесь впервые, токен сегенерируется автоматически при заказе. Либо можете сделать это сейчас: ';
		const genTokenBut = document.createElement('button');
		genTokenBut.innerHTML = 'сгенерировать';
		genTokenBut.addEventListener('click', async function(){
			loginBox.innerHTML = 'Creating new token": wait...';

			const resNewUserToken = await server.sendReq('getNewUserToken');	
			const resLogin = await server.sendReq('signin', '&token=' + resNewUserToken.data);


			orderUserToken = resNewUserToken.data;
			updateLoginBox(orderUserToken, loginBox);
		});

		loginBox.appendChild(token);
		loginBox.appendChild(loginBut);
		newUserToken.appendChild(genTokenBut);
		loginBox.appendChild(newUserToken);
		document.getElementsByTagName('body')[0].appendChild(loginBox);	
	};

	this.showCalc = function (){

		const calcBox = document.getElementById('rdCalcBox');
		const calcForm = document.createElement('form');
		calcForm.id = 'rdCalcForm';

		const calcAddItem = document.createElement('button');
		calcAddItem.innerHTML = 'add item';
		calcAddItem.addEventListener('click', ()=>{
			const item = document.createElement('div'); 
			item.setAttribute('class', 'inputItem');
	
			const close = document.createElement('button');
			close.innerHTML = 'X';
			close.addEventListener('click', ()=>{
				item.remove();
				updateSumPrice(calcForm, calcSumPrice);
			});

			const category = document.createElement('select');
			category.setAttribute('class', 'category');
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
					categoryOption.dataset.catId = res.data[i].category_id;
					category.appendChild(categoryOption);
		
				});

			});
			category.addEventListener('change', async (ev)=>{
				material.innerHTML = '';
				measure.innerHTML = '';
				price.value = '';

				let catId = ev.target.options[ev.target.selectedIndex].dataset.catId;
				category.dataset.selectedCatId = catId;

				let resMaterials = await server.sendReq('getMaterials', '&category_id='+catId);
				material.dataset.selectedMatId = resMaterials.data[0].material_id;

				let unitPrice = resMaterials.data[0].material_unit_price;
				amount.setAttribute('data-unit-price', unitPrice);
				price.value = unitPrice * amount.value;
				updateSumPrice(calcForm, calcSumPrice);

				resMaterials.data.forEach((el, mi)=>{
					const materialOption = document.createElement('option');
					materialOption.innerHTML = el.material_name;
					materialOption.dataset.matId = resMaterials.data[mi].material_id;
					materialOption.addEventListener('click', async ()=>{
						amount.setAttribute('data-unit-price', el.material_unit_price);
						price.value = el.material_unit_price * amount.value;
						updateSumPrice(calcForm, calcSumPrice);
						materialImgBox.src = '';

						let resUnit = await server.sendReq('getUnit', '&unit_id=' + el.material_unit_id);	
						measure.innerHTML = resUnit.data.unit_material_name;

						let resImage = await server.sendReq('getMaterialImage', '&material_img_id=' + el.material_img_id);
						if(resImage.result == 'ok') materialImgBox.src = resImage.data.img_src;


					});
					material.appendChild(materialOption);	
				});

			});

			const material = document.createElement('select');
			material.setAttribute('class', 'material');
			material.addEventListener('change', (ev)=>{
				let matId = ev.target.options[ev.target.selectedIndex].dataset.matId;
				material.dataset.selectedMatId = matId;
			});
	
			const amount = document.createElement('input');
			amount.value = 1;
			amount.setAttribute('class', 'amount');
			amount.addEventListener('change', ()=>{
				price.value = amount.dataset.unitPrice * amount.value;
				updateSumPrice(calcForm, calcSumPrice);
			});
	
			const measure = document.createElement('div');
			// ...
	
			const materialImgBox = document.createElement('img');	

			
			const price = document.createElement('input');
			price.disabled = true; 
			price.setAttribute('class', 'price');
	
			item.appendChild(close);
			item.appendChild(category);
			item.appendChild(material);
			item.appendChild(amount);
			item.appendChild(measure);
			item.appendChild(materialImgBox);
			item.appendChild(price);
			calcForm.appendChild(item);

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
		orderBut.addEventListener('click', async ()=>{
			const form = parseRdCalcForm(calcForm);

			// Check FORM_FIELDS
			for(let i = 0; i < form.items.length; i++){
				if(!form.items[i].category_id || !form.items[i].material_id){
					alert('ERR: not enough data, fill all fields!');
					return;
				}
			}

			// Check USER_TOKEN
			if(!orderUserToken){
				const resNewUserToken = await server.sendReq('getNewUserToken');	
				const resLogin = await server.sendReq('signin', '&token=' + resNewUserToken.data);
				orderUserToken = resNewUserToken.data;
				updateLoginBox(orderUserToken, document.getElementById('rdLoginBox')); 
			}


			const date = new Date();
			let order = {
				msg: "hello Server!",
				items: form.items,
				orderSumPrice: form.sumPrice,
				orderDate: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), 
				orderUserToken: orderUserToken,
			}

			let msgToSrv = JSON.stringify(order);
			let resOrder = await server.sendReq('makeOrder', '&data=' + msgToSrv);
			if(resOrder.data == server.errs['ERR_NO_USER_TOKEN'] || 
				resOrder.data == server.errs['ERR_NOT_ENOUGH_FORM_DATA']){
				alert(server.getRes(resOrder));
				return;
			}
			updateUserOrders(orderUserToken, document.getElementById('userOrdersBox')); 

		});
		calcBox.appendChild(orderBut);
	};

	this.showUserOrders = function(){
		let userOrdersBox = document.createElement('div');
		userOrdersBox.id = 'userOrdersBox';
		userOrdersBox.innerHTML = '';
		document.getElementsByTagName('body')[0].appendChild(userOrdersBox);
	}

}
