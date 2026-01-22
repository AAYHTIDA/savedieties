# How to Test if Razorpay Integration is Working

## Quick Test Checklist

### ✅ Step 1: Check Backend is Running

Open this URL in your browser:
```
https://savedieties1.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-03T...",
  "uptime": 123.456
}
```

If you see this, backend is running! ✅

---

### ✅ Step 2: Check Razorpay Configuration

Open browser console (F12) and run this command in the Console tab:

```javascript
fetch('https://savedieties1.onrender.com/api/payment/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100, currency: 'INR' })
})
.then(r => r.json())
.then(d => console.log(d))
```

**Expected Response (Success):**
```json
{
  "success": true,
  "order": {
    "id": "order_xxxxx",
    "amount": 10000,
    "currency": "INR",
    "receipt": "receipt_xxxxx"
  },
  "key_id": "rzp_live_ExWV3GtOUg782w"
}
```

**If you see this:** Razorpay is configured correctly! ✅

**If you see error:**
```json
{
  "success": false,
  "error": "Payment gateway not configured"
}
```
This means you need to add RAZORPAY_KEY_SECRET to Render environment variables.

---

### ✅ Step 3: Test Full Payment Flow

1. **Go to your website:**
   ```
   https://savedieties2.netlify.app
   ```

2. **Click "Contribute" button** (in the main page or navigation)

3. **Fill the form:**
   - Select amount: ₹100
   - Name: Test User
   - Email: test@example.com
   - Phone: 9999999999

4. **Click the "Contribute ₹100" button**

5. **What should happen:**
   - ✅ A Razorpay checkout modal should open
   - ✅ You should see payment options (Card/UPI/NetBanking)
   - ✅ Amount should show ₹100

6. **Complete the payment:**
   - Use your card/UPI to pay
   - Or use test card (if using test mode):
     - Card: 4111 1111 1111 1111
     - CVV: 123
     - Expiry: 12/25

7. **After payment:**
   - ✅ You should see "Thank You!" success message
   - ✅ Page redirects after 3 seconds

---

### ✅ Step 4: Verify in Razorpay Dashboard

1. **Go to Razorpay Dashboard:**
   ```
   https://dashboard.razorpay.com
   ```

2. **Navigate to:** Transactions → Payments

3. **Check if your payment appears:**
   - ✅ Payment amount matches
   - ✅ Status is "Captured" or "Authorized"
   - ✅ Customer details are correct

---

## Visual Testing Guide

### What You Should See:

#### 1. Contribute Page
```
┌─────────────────────────────────────┐
│  Contribute to This Case            │
│                                     │
│  Select Amount:                     │
│  [₹500] [₹1000] [₹2500] [₹5000]   │
│                                     │
│  Your Details:                      │
│  Name: [____________]               │
│  Email: [____________]              │
│  Phone: [____________]              │
│                                     │
│  [Contribute ₹500] ← Click this    │
└─────────────────────────────────────┘
```

#### 2. Razorpay Checkout Modal (Should Open)
```
┌─────────────────────────────────────┐
│  Razorpay                      [X]  │
│  ─────────────────────────────────  │
│  Save Deities                       │
│  Pay ₹500                           │
│                                     │
│  [UPI]  [Card]  [NetBanking]       │
│                                     │
│  Enter UPI ID or select method     │
│  [____________]                     │
│                                     │
│  [Pay ₹500]                         │
└─────────────────────────────────────┘
```

#### 3. Success Message
```
┌─────────────────────────────────────┐
│         ✓                           │
│     Thank You!                      │
│                                     │
│  Your contribution of ₹500 has     │
│  been received successfully.        │
│                                     │
│  Redirecting...                     │
└─────────────────────────────────────┘
```

---

## Common Issues & Solutions

### Issue 1: "Payment gateway not configured"
**Problem:** RAZORPAY_KEY_SECRET not set in Render

**Solution:**
1. Go to Render dashboard
2. Add RAZORPAY_KEY_SECRET environment variable
3. Redeploy backend

---

### Issue 2: Razorpay modal doesn't open
**Problem:** Razorpay script not loading

**Solution:**
1. Check browser console (F12)
2. Look for errors
3. Check internet connection
4. Try refreshing page

---

### Issue 3: Payment fails immediately
**Problem:** Invalid API keys or account not activated

**Solution:**
1. Verify API keys in Razorpay dashboard
2. Check if Razorpay account is activated
3. Complete KYC if required

---

### Issue 4: CORS error
**Problem:** Frontend can't connect to backend

**Solution:**
1. Check if backend is running
2. Verify CORS settings include your Netlify URL
3. Check browser console for exact error

---

## Debug Mode

### Check Backend Logs

1. Go to Render dashboard
2. Select your backend service
3. Click "Logs" tab
4. Look for:
   ```
   ✅ Razorpay initialized
   ```

If you see this, Razorpay is configured correctly!

If you see:
```
⚠️ Razorpay credentials not found
```
You need to add the environment variables.

---

## Test Payment Amounts

For testing, use small amounts:
- ₹1 - Minimum test amount
- ₹10 - Small test
- ₹100 - Standard test

---

## Success Indicators

✅ Backend health check returns 200 OK  
✅ Create order API returns order ID  
✅ Razorpay modal opens on button click  
✅ Payment completes successfully  
✅ Success message appears  
✅ Payment shows in Razorpay dashboard  

If all these work, your integration is complete! 🎉

---

## Need Help?

If something doesn't work:

1. **Check backend logs** in Render dashboard
2. **Check browser console** (F12 → Console tab)
3. **Verify environment variables** are set correctly
4. **Test backend API** using the fetch command above
5. **Check Razorpay dashboard** for any account issues

---

## Quick Command to Test Backend

Run this in your terminal:

```bash
curl -X POST https://savedieties1.onrender.com/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR"}'
```

**Expected:** JSON response with order details  
**If error:** Check backend configuration
