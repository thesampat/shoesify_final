import razorpay
import environ

env = environ.Env()
environ.Env.read_env()


razor_key_id= env('razor_key_id')
razor_key_secret = env('razor_key_secret')
FACTOR_API_KEY=env('FACTOR_API_KEY')

client = razorpay.Client(auth=(razor_key_id, razor_key_secret))
client.set_app_details({"FaceBand" : "Store", "version" : "1.0"})

