from boto.mturk.connection import MTurkConnection
import settings
from threading import Timer
import time



# goes through all the hits in the MTurk requester account and finds matching Hit ID. 
# approves and deletes that particular HIT
def get_all_reviewable_hits(hitIdList, mtc):
    page_size = 10

    hits = mtc.get_reviewable_hits(page_size=page_size)

    # print "Total results to fetch %s " % hits.TotalNumResults
    # print "Request hits page %i" % 1
    total_pages = float(hits.TotalNumResults)/page_size
    int_total= int(total_pages)
    if(total_pages-int_total>0):
        total_pages = int_total+1
    else:
        total_pages = int_total
    pn = 1
    result = []
    while pn < total_pages:
        pn = pn + 1
        # print "Request hits page %i" % pn
        temp_hits = mtc.get_reviewable_hits(page_size=page_size,page_number=pn)
        hits.extend(temp_hits)
        # print "~~~~~~~~~~~"
    print hits
    f = open('myfile', 'w');
    # f.write(hits);
    for hit in hits:
        option1 = 0
        option2 = 0
        option3 = 0
        option4 = 0

        print hit.HITId
        f.write('\n:'+hit.HITId)
        print "list: ", hitIdList
        if hit.HITId in hitIdList:  
            # print "--------------------"
            # print hitIdList 
            # print "Hit ID %s" %hit.HITId
            assignments = mtc.get_assignments(hit.HITId)
            # print assignments
            for assignment in assignments:
                # print "Answers of the worker %s" % assignment.WorkerId

                for question_form_answer in assignment.answers[0]:
                    print question_form_answer.fields;

                    if question_form_answer.fields==[u'1']:
                        option1+=1
                    elif question_form_answer.fields==[u'2']:
                        option2+=1
                    elif question_form_answer.fields==[u'3']:
                        option3+=1
                    elif question_form_answer.fields==[u'4']:
                        option4+=1
                    else:
                        print "incorrect choice, man"

                    # for key, value in question_form_answer.fields:
                    #     print "%s: %s" % (key,value)
                # mtc.approve_assignment(assignment,feedback="none")
                # print "Approved assignment"
            
            result = [option1,option2,option3,option4]
            # f.write(int(option1))

            print "hello", result
            # mtc.expire_hit(hit.HITId)
            # time.sleep(0.25)
            # mtc.dispose_hit(hit.HITId)

            # print("HIT " + hit.HITId + " was deleted!")  
        # create timer to  invoke self after 10 seconds only if results are not yet available
    f.close()
    return result 


