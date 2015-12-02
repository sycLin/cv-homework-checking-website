import os, sys, json
from PIL import Image
import hw8
from check_equal import eq

if __name__ == "__main__":
	if len(sys.argv) < 4:
		sys.exit(1)
	
	# parse the integer flag
	flag = int(sys.argv[1])
	b3, b5, m3, m5, otc, cto = False, False, False, False, False, False
	if (flag&1) != 0:
		b3 = True
	if (flag&2) != 0:
		b5 = True
	if (flag&4) != 0:
		m3 = True
	if (flag&8) != 0:
		m5 = True
	if (flag&16) != 0:
		otc = True
	if (flag&32) != 0:
		cto = True
	# open images
	try:
		src = Image.open(sys.argv[2])
		processed = []
		my_argv = [] # backup filename of processed images
		for i in range(3, len(sys.argv)):
			processed.append(Image.open(sys.argv[i]))
			my_argv.append(sys.argv[i])
	except:
		print "[ERROR] cannot open images"
		sys.exit(1)

	result = {}
	# check box filtering 3x3
	if b3:
		if len(processed) == 0:
			result['box filtering 3x3'] = '(not found)'
		else:
			tmp = hw8.boxFiltering(src, (3, 3))
			for i in range(len(processed)):
				if eq(tmp, processed[i]):
					# remove the image from the list
					# and record the file name to dictionary
					processed.pop(i)
					result['box filtering 3x3'] = my_argv.pop(i)
					break
				else:
					result['box filtering 3x3'] = '(not found)'
	# check box filtering 5x5
	if b5:
		if len(processed) == 0:
			result['box filtering 5x5'] = '(not found)'
		else:
			tmp = hw8.boxFiltering(src, (5, 5))
			for i in range(len(processed)):
				if eq(tmp, processed[i]):
					# remove the image from the list
					# and record the file name to dictionary
					processed.pop(i)
					result['box filtering 5x5'] = my_argv.pop(i)
					break
				else:
					result['box filtering 5x5'] = '(not found)'
	# check median filtering 3x3
	if m3:
		if len(processed) == 0:
			result['median filtering 3x3'] = '(not found)'
		else:
			tmp = hw8.medianFiltering(src, (3, 3))
			for i in range(len(processed)):
				if eq(tmp, processed[i]):
					# remove the image from the list
					# and record the file name to dictionary
					processed.pop(i)
					result['median filtering 3x3'] = my_argv.pop(i)
					break
				else:
					result['median filtering 3x3'] = '(not found)'
	# check median filtering 5x5
	if m5:
		if len(processed) == 0:
			result['median filtering 5x5'] = '(not found)'
		else:
			tmp = hw8.medianFiltering(src, (5, 5))
			for i in range(len(processed)):
				if eq(tmp, processed[i]):
					# remove the image from the list
					# and record the file name to dictionary
					processed.pop(i)
					result['median filtering 5x5'] = my_argv.pop(i)
					break
				else:
					result['median filtering 5x5'] = '(not found)'
	# check opening-then-closing
	octoKernel = hw8.Kernel(hw8.octo_kernel_pattern, (2, 2))
	if otc:
		if len(processed) == 0:
			result['opening-then-closing'] = '(not found)'
		else:
			tmp = hw8.closing(hw8.opening(src, octoKernel), octoKernel)
			for i in range(len(processed)):
				if eq(tmp, processed[i]):
					# remove the image from the list
					# and record the file name to dictionary
					processed.pop(i)
					result['opening-then-closing'] = my_argv.pop(i)
					break
				else:
					result['opening-then-closing'] = '(not found)'
	# check closing-then-opening
	if cto:
		if len(processed) == 0:
			result['closing-then-opening'] = '(not found)'
		else:
			tmp = hw8.opening(hw8.closing(src, octoKernel), octoKernel)
			for i in range(len(processed)):
				if eq(tmp, processed[i]):
					# remove the image from the list
					# and record the file name to dictionary
					processed.pop(i)
					result['closing-then-opening'] = my_argv.pop(i)
					break
				else:
					result['closing-then-opening'] = '(not found)'

	# output the result
	print json.dumps(result)
