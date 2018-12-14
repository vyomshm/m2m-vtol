const request = require('request')
async function loop_motor(){
	api_endpoint = 'http://127.0.0.1:8080/pay'
	for (let i = 0; i < 200; i++) {
		await request.post('http://127.0.0.1:8080/pay', {
		  json: {
		    proof: '0xinsertProofHere',
		    rpm: i
		  }
		})
	}
	for (i = 200; i > 0 ; i--) {
		await request.post('http://127.0.0.1:8080/pay', {
		  json: {
		    proof: '0xinsertProofHere',
		    rpm: i
		  }
		})
	}
}

loop_motor()
	