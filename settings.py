import ConfigParser

def readConfigurations():
	config = ConfigParser.ConfigParser()
	config.read("config.ini")
	dict = {};
	sections = config.sections()
	for section in sections:
		options = config.options(section)
		for option in options:
			dict[option] = config.get(section, option)
	return dict;