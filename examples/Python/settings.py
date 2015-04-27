import ConfigParser
import os

def readConfigurations():
	# files = [os.listdir('.\Python')]
	# print files
	config = ConfigParser.ConfigParser()
	dataset = config.read(".\Python\config.ini")
	# print "Length: ", len(dataset)
	dict = {};
	sections = config.sections()
	for section in sections:
		options = config.options(section)
		for option in options:
			dict[option] = config.get(section, option)
	# print "Dict: ", dict		
	return dict;