import razorpay

import environ
env = environ.Env()
environ.Env.read_env()

# razor_key_id= env('razor_key_id')
# razor_key_secret = env('razor_key_secret')

FACTOR_API_KEY="6019045c-332e-11ed-9c12-0200cd936042"
razor_key_id='rzp_test_QPGJfseF5g03Qp'
razor_key_secret='lxdfOOtzCTyeRiv87TXhNeDe'

client = razorpay.Client(auth=(razor_key_id, razor_key_secret))
client.set_app_details({"FaceBand" : "Store", "version" : "1.0"})

