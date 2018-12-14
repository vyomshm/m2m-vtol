from rq import Queue
from rq.job import Job
from worker import conn
from flask import Flask, request
import pyfirmata
import json

board = pyfirmata.Arduino('/dev/tty.usbserial-1410')
servo_pin = board.get_pin('d:9:s')

app = Flask(__name__)

# q = Queue(connection=conn)

# TO-DO insert proper validation function
def validate_proof(proof):
	if(len(proof) != 0):
		return True
	else:
		return False

@app.route('/')
def hello():
	return "Hello World!!\n"

@app.route('/pay', methods = ['GET', 'POST'])
def motor():
	error = None
	speed = 0
	if request.method == 'POST':
		data = json.loads(request.data)
		if(validate_proof(data['proof'])):
			print("proof validated")
			speed = int(data['rpm'])
			servo_pin.write(speed)
			return 'RPM modfied to {}!'.format(speed)
		return 'Invalid Proof.'
	elif request.method == 'GET':
		return str("RPM : " + str(servo_pin.read()))
	else:
		return "Unidentified Request method"

if __name__ == '__main__':
	app.run(port = 8080, debug = True)