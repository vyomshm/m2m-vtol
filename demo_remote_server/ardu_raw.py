import pyfirmata

board = pyfirmata.Arduino('/dev/tty.usbserial-1410')
servo_pin = board.get_pin('d:9:s')

while True:
	angle = input("Enter rpm val:")
	angle = int(angle)
	servo_pin.write(angle)