from boto.mturk.connection import MTurkConnection
from boto.mturk.question import QuestionContent,Question,QuestionForm,Overview,AnswerSpecification,SelectionAnswer,FormattedContent
import ConfigParser
from threading import Timer

SANDBOX = True 
NUMBER_OF_HITS = 1  # Number of different HITs posted for this task
NUMBER_OF_ASSIGNMENTS = 1  # Number of tasks that DIFFERENT workers will be able to take for each HIT
LIFETIME = 60 * 7  # How long that the task will stay visible if not taken by a worker (in seconds)
REWARD = 0.1  # Base payment value for completing the task (in dollars)
DURATION = 60*2  # How long the worker will be able to work on a single task (in seconds)
APPROVAL_DELAY = 60*60*2  # How long after the task is completed will the worker be automatically paid if not manually approved (in seconds)


# HIT title (as it will appear on the public listing)
TITLE = 'Earn $0.10/question'
# Description of the HIT that workers will see when deciding to accept it or not
DESCRIPTION = 'Go through the answer choices. Give us the right one and we reward you.'
# Search terms for the HIT posting
KEYWORDS = ['choices', 'multiple choice', 'question', 'twitter']



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

def postHitAndSetReviewIntervals(question, answers):
	ratings =[('Very Bad','-2'),
         ('Bad','-1'),
         ('Not bad','0'),
         ('Good','1'),
         ('Very Good','1')]
	createdHit = createHits(question, ratings)
	Timer(10, getAllReviewableHits).start()
	#print "Testing now"

def createHits(question, answers):
	if SANDBOX:
		mturk_url = 'mechanicalturk.sandbox.amazonaws.com'
		preview_url = 'https://workersandbox.mturk.com/mturk/preview?groupId='
	else:
		mturk_url = 'mechanicalturk.amazonaws.com'
		preview_url = 'https://mturk.com/mturk/preview?groupId='

	# q = ExternalQuestion(external_url=HIT_URL, frame_height=800)

	overview  = Overview()
	overview.append_field('Title', 'We need the crowd!!')
	overview.append(FormattedContent('<a href="http://programthecrowd.com/">Visit us here</a>'))
	questionContent = QuestionContent()
	questionContent.append_field('Title', question);
	answerChoices = SelectionAnswer(min=1, max=1, style='checkbox', selections=answers, type='text', other=False)
	q = Question(identifier='Help', content=questionContent, answer_spec=AnswerSpecification(answerChoices), is_required=True)
	questionForm = QuestionForm();
	questionForm.append(overview)
	questionForm.append(q)
	conn = MTurkConnection(aws_access_key_id=params['aws_access_key'], aws_secret_access_key=params['aws_secret_key'], host=mturk_url)
	for i in range(0, NUMBER_OF_HITS):
		create_hit_rs = conn.create_hit(questions=questionForm, lifetime=LIFETIME, max_assignments=NUMBER_OF_ASSIGNMENTS, title=TITLE, keywords=KEYWORDS, reward=REWARD, duration=DURATION, approval_delay=APPROVAL_DELAY, annotation=DESCRIPTION)
		print(preview_url + create_hit_rs[0].HITTypeId)
		print("HIT ID: " + create_hit_rs[0].HITId)


params = readConfigurations()
print params
postHitAndSetReviewIntervals("how good are you???", answers=None)		