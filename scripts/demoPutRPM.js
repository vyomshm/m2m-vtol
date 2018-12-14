const request = require('request')

request.post('http://127.0.0.1:8080/pay', {
  json: {
    proof: '0xinsertProofHere',
    rpm: 10
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
})
