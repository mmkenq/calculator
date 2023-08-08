export default function Server(props){
	const { serverURL, } = props;
	this.state = {};

	function reqListener(req, resolve, reject){
		resolve(JSON.parse(req.response));
	};

	// Send AJAX Request to server
	this.sendReq = function(method, params = ''){
		return new Promise((resolve, reject) => {
			const url = serverURL + '/api/?method=' + method + params;
			let req = new XMLHttpRequest();
			req.addEventListener('load', reqListener.bind(null, req, resolve, reject));
			req.open('GET', url, true);
			//req.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
			req.send();
		});
	};

	const errs = {
		"SUCCESS": 999,
		"ERR_NO_USER_ORDERS": 100,
		"ERR_NOT_ENOUGH_FORM_DATA": 101,
	}

	this.getRes = function(response){
		switch(response.data){
			case errs["SUCCESS"]: return "SUCCESS";
			case errs["ERR_NO_USER_ORDERS"]: return "ERR: NO USER ORDERS...";
			case errs["ERR_NOT_ENOUGH_FORM_DATA"]: return "ERR: ONE OF THE FOLLOWING NOT PRESENT: (TOKEN, CATEGORY, MATERIAL, PRICE, AMOUNT)";
			default: return {msg: "SOME ERROR", res: response};
		}	
	};
}
