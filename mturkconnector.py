from boto.mturk.connection import MTurkConnection
from boto.mturk.question import QuestionContent,Question,QuestionForm,Overview,AnswerSpecification,SelectionAnswer,FormattedContent
from threading import Timer
import settings 
import get_hits
import time

SANDBOX = True
# Number of different HITs posted for this task 
NUMBER_OF_HITS = 1 
# Number of tasks that DIFFERENT workers will be able to take for each HIT
NUMBER_OF_ASSIGNMENTS = 2  
# How long that the task will stay visible if not taken by a worker (in seconds)
LIFETIME = 60 * 7 
# Base payment value for completing the task (in dollars)
REWARD = 0.1  
# How long the worker will be able to work on a single task (in seconds)
DURATION = 60*2  
# How long after the task is completed will the worker be automatically paid if not manually approved (in seconds)
APPROVAL_DELAY = 60*60*2  

conn = None
# HIT title (as it will appear on the public listing)
TITLE = 'Earn $0.10/question'
# Description of the HIT that workers will see when deciding to accept it or not
DESCRIPTION = 'Go through the answer choices. Give us the right one and we reward you.'
# Search terms for the HIT posting
KEYWORDS = ['choices', 'multiple choice', 'question', 'twitter']
# hitIdList = "3XUSYT70IT1S2BXA1XINPBQDDRJD0B"
mturk_url = 'mechanicalturk.sandbox.amazonaws.com'

# the input to this function is the question and a set of options for answers
# format for answers is [(option1,1),(option2,2),(option3,3),(...)]
def postHitAndSetReviewIntervals(question, answers):
	ratings =[('Very Bad','1'),
         ('Bad','2'),
         ('Not bad','3'),
         ('Good','4'),
         ('Very Good','5')]

	hitIdList = createHits(question, ratings)

	conn = MTurkConnection(aws_access_key_id=params['aws_access_key'], aws_secret_access_key=params['aws_secret_key'], host=mturk_url)
	
	# after 5 second delay call review hits
	time.sleep(60)
	get_hits.get_all_reviewable_hits(hitIdList,conn)
	#Timer(60, get_hits.get_all_reviewable_hits, [hitIdList, conn]).start()

# creates a hit based on the preset questions and answers, returns a list of HIT IDs that have been created
def createHits(question, answers):
	if SANDBOX:
		mturk_url = 'mechanicalturk.sandbox.amazonaws.com'
		preview_url = 'https://workersandbox.mturk.com/mturk/preview?groupId='
	else:
		mturk_url = 'mechanicalturk.amazonaws.com'
		preview_url = 'https://mturk.com/mturk/preview?groupId='

	#Create Hit Form Structure	
	overview  = Overview()
	overview.append_field('Title', 'We want to know the crowds opinion!')
	overview.append(FormattedContent('<a href="http://programthecrowd.com/">Visit us here</a>'))
	questionContent = QuestionContent()
	questionContent.append_field('Title', question);
	answerChoices = SelectionAnswer(min=1, max=1, style='checkbox', selections=answers, type='text', other=False)
	q = Question(identifier='Help', content=questionContent, answer_spec=AnswerSpecification(answerChoices), is_required=True)
	questionForm = QuestionForm();
	questionForm.append(overview)
	questionForm.append(q)
	hitIdList = []
	global conn
	conn = MTurkConnection(aws_access_key_id=params['aws_access_key'], aws_secret_access_key=params['aws_secret_key'], host=mturk_url)
	
	#For Loop to create and post hits
	for i in range(0, NUMBER_OF_HITS):
		create_hit_rs = conn.create_hit(questions=questionForm, lifetime=LIFETIME, max_assignments=NUMBER_OF_ASSIGNMENTS, title=TITLE, keywords=KEYWORDS, reward=REWARD, duration=DURATION, approval_delay=APPROVAL_DELAY, annotation=DESCRIPTION)
		print(preview_url + create_hit_rs[0].HITTypeId)
		print("HIT ID: " + create_hit_rs[0].HITId)
		hitIdList.append(create_hit_rs[0].HITId);

	return hitIdList

params = settings.readConfigurations()
postHitAndSetReviewIntervals("How good do you think you are?", answers=None)		