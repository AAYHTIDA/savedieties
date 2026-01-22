# 🔑 Update Razorpay Keys in Render Dashboard

## New Razorpay Key ID
```
rzp_live_S4uFZNi9NTtPP6
```

## Steps to Update in Render

### 1. Go to Render Dashboard
Visit: **https://dashboard.render.com**

### 2. Select Your Service
Click on: **savedieties-backend**

### 3. Go to Environment Tab
Click: **Environment** in the left sidebar

### 4. Update/Add These Variables

#### Update RAZORPAY_KEY_ID:
```
Name: RAZORPAY_KEY_ID
Value: rzp_live_S4uFZNi9NTtPP6
```

#### Add RAZORPAY_KEY_SECRET:
```
Name: RAZORPAY_KEY_SECRET
Value: [your secret key from Razorpay dashboard]
```

### 5. Save Changes
- Click **Save Changes**
- Wait for automatic redeploy (2-3 minutes)

---

## How to Get Your Key Secret

1. Go to: **https://dashboard.razorpay.com**
2. Login to your account
3. Navigate to: **Settings** → **API Keys**
4. Find the Key Secret for: `rzp_live_S4uFZNi9NTtPP6`
5. Click **"Show"** to reveal it
6. Copy the secret key (looks like: `XXXXXXXXXXXXXXXX`)

---

## After Updating

### Test the Integration:

1. **Wait for Render to redeploy** (2-3 minutes)

2. **Test backend API:**
   ```bash
   curl -X POST https://savedieties1.onrender.com/api/payment/create-order \
     -H "Content-Type: application/json" \
     -d '{"amount": 100, "currency": "INR"}'
   ```

3. **Expected response:**
   ```json
   {
     "success": true,
     "order": {
       "id": "order_xxxxx",
       "amount": 10000,
       "currency": "INR"
     },
     "key_id": "rzp_live_S4uFZNi9NTtPP6"
   }
   ```

4. **Test on live site:**
   - Go to: https://savedieties2.netlify.app
   - Click "Contribute"
   - Try to make a payment
   - Razorpay modal should open with new Key ID

---

## Verification Checklist

- [ ] Updated RAZORPAY_KEY_ID in Render dashboard
- [ ] Added RAZORPAY_KEY_SECRET in Render dashboard
- [ ] Waited for Render redeploy to complete
- [ ] Tested create-order API endpoint
- [ ] Tested payment flow on live website
- [ ] Verified payment appears in Razorpay dashboard

---

## Current Status

✅ **Documentation updated** with new Key ID  
⏳ **Render environment variables** - YOU NEED TO UPDATE  
⏳ **Backend redeploy** - After you update variables  
⏳ **Payment testing** - After redeploy completes  

---

## Summary

Your new Razorpay Key ID is: `rzp_live_S4uFZNi9NTtPP6`

**Next steps:**
1. Update both RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Render dashboard
2. Wait for redeploy
3. Test the payment flow

Once done, your payment gateway will be fully functional! 🎉