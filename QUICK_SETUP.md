# Quick Razorpay Setup

## Your Razorpay Key ID
```
rzp_live_S4uFZNi9NTtPP6
```

## Steps to Complete Setup

### 1. Get Your Key Secret
1. Go to https://dashboard.razorpay.com
2. Login to your account
3. Navigate to: **Settings → API Keys**
4. You'll see your Key Secret there (it will look like: `XXXXXXXXXXXXXXXX`)

### 2. Add to Render (Backend)

Go to your Render dashboard and add these environment variables:

**Service:** savedieties-backend  
**URL:** https://dashboard.render.com

Add these two variables:

```
RAZORPAY_KEY_ID = rzp_live_S4uFZNi9NTtPP6
RAZORPAY_KEY_SECRET = [paste your secret key here]
```

### 3. Redeploy Backend

After adding the environment variables:
- Render will automatically redeploy
- Or click "Manual Deploy" → "Deploy latest commit"
- Wait 2-3 minutes for deployment to complete

### 4. Test the Payment

1. Go to: https://savedieties2.netlify.app
2. Click on "Contribute" section
3. Fill in the form:
   - Select amount (e.g., ₹500)
   - Enter your name, email, phone
   - Click "Contribute ₹500" button
4. Razorpay checkout should open
5. Complete the payment

### 5. Verify Payment

Check your Razorpay dashboard to see if the payment appears:
- Go to https://dashboard.razorpay.com
- Navigate to "Transactions" → "Payments"
- You should see the test payment

## Important Notes

⚠️ **Security Warning:**
- Never commit your Key Secret to Git
- Never share your Key Secret publicly
- Keep it secure in Render environment variables only

✅ **You're using LIVE mode:**
- This will process real payments
- Real money will be transferred
- Make sure your Razorpay account is fully activated and KYC is complete

## Testing Before Going Live

If you want to test first without real money:

1. Get TEST API keys from Razorpay:
   - Key ID will start with `rzp_test_`
   - Key Secret for test mode
2. Use test keys in Render environment variables
3. Test with Razorpay test cards:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

## Need Help?

If you encounter any issues:
1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Verify environment variables are set correctly
4. Ensure Razorpay account is activated

## Current Status

✅ Backend code updated with Razorpay integration  
✅ Frontend code updated with payment flow  
✅ API endpoints created  
⏳ Waiting for you to add RAZORPAY_KEY_SECRET to Render  
⏳ Then test the payment flow  
