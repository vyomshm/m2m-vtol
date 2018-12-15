# m2m-vtol
[WIP] machine to machine micropayments

### Installation

`npm install`

### Tests

`npm run test`

#### Running motor api demo

1. Run python api server 
```
 cd demo_api_server
 pip3 install -r requirements.txt
 python3 app.py 
```
2. call the ap with a valid balance proof + desired rpm speed
`npm run motor`

##### Python & Arduino setup

*m2m-vtol* uses pyfirmate pakage to interact with arduino and therefore requires the arduino to have a `StandardFirmrate` image.