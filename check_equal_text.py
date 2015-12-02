#!/usr/bin/python
import os, sys

def print_usage():
	pass

def eq(txt1, txt2):
	# remove all new-lines and tabs
	txt1 = txt1.replace("\n", "").replace("\t", "").replace("\r", "")
	txt2 = txt2.replace("\n", "").replace("\t", "").replace("\r", "")
	return (txt1 == txt2)

if __name__ == "__main__":
	if len(sys.argv) != 3:
		print_usage()
	try:
		f1 = open(sys.argv[1])
		f2 = open(sys.argv[2])
	except:
		print >> sys.stderr, "fatal: wrong text file paths given"
		sys.exit(1)
	print eq(f1.read(), f2.read())
	f1.close()
	f2.close()
