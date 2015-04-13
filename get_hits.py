from boto.mturk.connection import MTurkConnection
import ConfigParser
 
HOST = 'mechanicalturk.sandbox.amazonaws.com'

config = ConfigParser.ConfigParser()
config.read("config.ini")

def readConfigurations():
    dict = {};
    sections = config.sections()
    for section in sections:
        options = config.options(section)
        for option in options:
            dict[option] = config.get(section, option)
    return dict;    

def get_all_reviewable_hits(mtc):
    page_size = 10
    hits = mtc.get_reviewable_hits(page_size=page_size)

    print "Total results to fetch %s " % hits.TotalNumResults
    print "Request hits page %i" % 1
    total_pages = float(hits.TotalNumResults)/page_size
    int_total= int(total_pages)
    if(total_pages-int_total>0):
        total_pages = int_total+1
    else:
        total_pages = int_total
    pn = 1
    while pn < total_pages:
        pn = pn + 1
        print "Request hits page %i" % pn
        temp_hits = mtc.get_reviewable_hits(page_size=page_size,page_number=pn)
        hits.extend(temp_hits)
    return hits
 
params = readConfigurations() 
mtc = MTurkConnection(aws_access_key_id=params['aws_access_key'],
                      aws_secret_access_key=params['aws_secret_key'],
                      host=HOST)
 
hits = get_all_reviewable_hits(mtc)

for hit in hits:
    print "--------------------"
    print "Hit ID %s" %hit.HITId
    assignments = mtc.get_assignments(hit.HITId)
    for assignment in assignments:
        print "Answers of the worker %s" % assignment.WorkerId

        for question_form_answer in assignment.answers[0]:
            print question_form_answer.fields;
            # for key, value in question_form_answer.fields:
            #     print "%s: %s" % (key,value)
            print "--------------------"
