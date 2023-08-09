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

	this.errs = {
		"SUCCESS": 999,
		"ERR_NO_USER_ORDERS": 100,
		"ERR_NOT_ENOUGH_FORM_DATA": 101,
		"ERR_NO_USER_TOKEN": 102,
	}

	this.getRes = function(response){
		const errs = this.errs;

		switch(response.data){
			case errs["SUCCESS"]: return "SERVER: SUCCESS";
			case errs["ERR_NO_USER_ORDERS"]: return "SERVER ERR: NO USER ORDERS...";
			case errs["ERR_NOT_ENOUGH_FORM_DATA"]: return "SERVER ERR: ONE OF THE FOLLOWING NOT PRESENT: (TOKEN, CATEGORY, MATERIAL, PRICE, AMOUNT)";
			case errs["ERR_NO_USER_TOKEN"]: return "SERVER ERR: server didn\'t get USER_TOKEN";
			default: return {msg: "SERVER: SOME ERROR", res: response};
		}	
	};
}
