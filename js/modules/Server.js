export default function Server(props){
	const { serverURL, } = props;
	this.state = {};

	function reqListener(req, resolve, reject){
		resolve(JSON.parse(req.response));
	};

	// Send AJAX Request to server
	this.sendReq = function sendReq(method, params = ''){
		return new Promise((resolve, reject) => {
			const url = serverURL + '/api/?method=' + method + params;
			let req = new XMLHttpRequest();
			req.addEventListener('load', reqListener.bind(null, req, resolve, reject));
			req.open('GET', url, true);
			//req.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
			req.send();
		});
	};
}
