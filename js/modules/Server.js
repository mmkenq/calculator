export default function Server(props){
	const config = props.config;
	const { serverURL, } = config.serverConfig;
	this.state = {};

	function reqListener(req, resolve, reject){
		resolve(JSON.parse(req.response));
	};

	// Send AJAX Request to server
	this.sendReq = function sendReq(method){
		return new Promise((resolve, reject) => {
			const url = serverURL + method;
			let req = new XMLHttpRequest();
			req.addEventListener('load', reqListener.bind(null, req, resolve, reject));
			req.open('GET', url, true);
			//req.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
			req.send();
		});
	};
}
