import os, sys, json
from PIL import Image
import hw9
from check_equal import eq

if __name__ == "__main__":
	if len(sys.argv) < 4:
		sys.exit(1)

	DetectType = sys.argv[2]
	Threshold = int(sys.argv[3])

	# open images
	try:
		orig = Image.open("lena.bmp")
	except:
		print "[ERROR] cannot open original image: lena.bmp"
		sys.exit(1)

	# do the edge detection
	if DetectType == "robert":
		myResult = hw9.doRobertDetection(orig, Threshold)
	elif DetectType == "prewitt":
		myResult = hw9.doPrewittDetection(orig, Threshold)
	elif DetectType == "sobel":
		myResult = hw9.doSobelDetection(orig, Threshold)
	elif DetectType == "frei_and_chen":
		myResult = hw9.doFreiAndChenDetector(orig, Threshold)
	elif DetectType == "kirsch":
		myResult = hw9.doKirschDetector(orig, Threshold)
	elif DetectType == "robinson":
		myResult = hw9.doRobinsonDetector(orig, Threshold)
	elif DetectType == "nevatia_babu":
		myResult = hw9.doNevatiaAndBabuDetector(orig, Threshold)
	else:
		print "[ERROR] unknown detect-type given..."
		sys.exit(1)

	# check if equal
	yourResult = Image.open(sys.argv[1])
	if eq(yourResult, myResult):
		print "True"
	else:
		print "False"