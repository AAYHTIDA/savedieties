# 🎯 How to Know if Razorpay is Working

## Quick 3-Step Test

### ✅ Step 1: Open Test Page (Easiest Way)

1. Open the `test-payment.html` file in your browser
2. Click each test button in order:
   - **Test 1:** Check Backend ✅
   - **Test 2:** Check Razorpay Config ✅
   - **Test 3:** Create Test Order ✅
   - **Test 4:** Test Payment (₹10) ✅

**If all 4 tests pass = Everything is working! 🎉**

---

### ✅ Step 2: Test on Live Website

1. Go to: **https://savedieties2.netlify.app**

2. Click **"Contribute"** button

3. Fill the form:
   - Amount: ₹100
   - Name: Your Name
   - Email: your@email.com
   - Phone: 9999999999

4. Click **"Contribute ₹100"**

5. **What should happen:**
   ```
   ✅ Razorpay modal opens
   ✅ Shows "Pay ₹100"
   ✅ Payment options visible (UPI/Card/NetBanking)
   ✅ Can complete payment
   ✅ Success message appears
   ```

**If Razorpay modal opens = Integration is working! 🎉**

---

### ✅ Step 3: Check Razorpay Dashboard

1. Go to: **https://dashboard.razorpay.com**

2. Login to your account

3. Navigate to: **Transactions → Payments**

4. Look for your test payment

**If payment appears in dashboard = Everything is connected! 🎉**

---

## What Each Test Means

### Test 1: Backend Health ❤️
**Tests:** Is backend server running?

**Pass:** Backend is online and responding  
**Fail:** Backend is down or not accessible

---

### Test 2: Razorpay Config 🔑
**Tests:** Are Razorpay API keys configured?

**Pass:** Both RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set  
**Fail:** Missing RAZORPAY_KEY_SECRET in Render environment variables

**How to fix:**
1. Go to Render dashboard
2. Add RAZORPAY_KEY_SECRET environment variable
3. Redeploy

---

### Test 3: Create Order 📝
**Tests:** Can backend create Razorpay orders?

**Pass:** Backend can communicate with Razorpay API  
**Fail:** API keys are invalid or Razorpay account has issues

---

### Test 4: Full Payment 💳
**Tests:** Complete payment flow end-to-end

**Pass:** User can complete payment successfully  
**Fail:** Issue with payment processing or verification

---

## Visual Guide

### ✅ Working Payment Flow

```
User clicks "Pay" button
         ↓
[Loading spinner appears]
         ↓
[Razorpay modal opens] ← YOU SHOULD SEE THIS!
         ↓
User enters payment details
         ↓
Payment processes
         ↓
[Success message appears] ← YOU SHOULD SEE THIS!
         ↓
Redirects to previous page
```

### ❌ Not Working

```
User clicks "Pay" button
         ↓
[Error message appears] ← PROBLEM!
OR
[Nothing happens] ← PROBLEM!
OR
[Modal doesn't open] ← PROBLEM!
```

---

## Common Issues

### Issue: "Payment gateway not configured"

**Reason:** RAZORPAY_KEY_SECRET not set

**Fix:**
1. Get Key Secret from Razorpay dashboard
2. Add to Render environment variables:
   ```
   RAZORPAY_KEY_SECRET = your_secret_here
   ```
3. Redeploy backend

---

### Issue: Modal doesn't open

**Reason:** Razorpay script not loading

**Fix:**
1. Check internet connection
2. Check browser console for errors (F12)
3. Try different browser
4. Clear cache and reload

---

### Issue: Payment fails immediately

**Reason:** Invalid API keys or account not activated

**Fix:**
1. Verify API keys in Razorpay dashboard
2. Check if account is activated
3. Complete KYC if required
4. Use test mode first

---

## Quick Commands

### Test Backend Health
```bash
curl https://savedieties1.onrender.com/health
```

**Expected:** `{"status":"healthy",...}`

---

### Test Create Order
```bash
curl -X POST https://savedieties1.onrender.com/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR"}'
```

**Expected:** `{"success":true,"order":{...}}`

---

## Success Checklist

Use this checklist to verify everything:

- [ ] Backend health check returns 200 OK
- [ ] Backend logs show "✅ Razorpay initialized"
- [ ] Create order API returns order ID
- [ ] Razorpay modal opens when clicking Pay button
- [ ] Can select payment method (UPI/Card/NetBanking)
- [ ] Payment completes successfully
- [ ] Success message appears after payment
- [ ] Payment shows in Razorpay dashboard
- [ ] Payment status is "Captured"

**If all checked = Fully working! 🎉**

---

## Still Not Working?

### Check These:

1. **Render Environment Variables**
   - RAZORPAY_KEY_ID = `rzp_live_ExWV3GtOUg782w`
   - RAZORPAY_KEY_SECRET = `your_secret_key`

2. **Backend Logs** (Render dashboard → Logs)
   - Look for "✅ Razorpay initialized"
   - Check for any error messages

3. **Browser Console** (F12 → Console)
   - Look for JavaScript errors
   - Check network tab for failed requests

4. **Razorpay Account**
   - Is account activated?
   - Is KYC complete?
   - Are API keys correct?

---

## Need More Help?

1. Open `test-payment.html` and run all tests
2. Check which test fails
3. Follow the error message instructions
4. Check `TESTING_GUIDE.md` for detailed troubleshooting

---

## Summary

**Easiest way to test:**
1. Open `test-payment.html` in browser
2. Click all 4 test buttons
3. If all pass = Working! ✅

**Or test on live site:**
1. Go to https://savedieties2.netlify.app
2. Click Contribute
3. Try to pay ₹100
4. If Razorpay modal opens = Working! ✅

**That's it!** 🎉
