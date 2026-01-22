# Razorpay Payment Integration Setup Guide

## Overview
This guide will help you set up Razorpay payment gateway for accepting contributions on your Save Deities platform.

## Prerequisites
1. A Razorpay account (Sign up at https://razorpay.com)
2. Access to Render dashboard (for backend environment variables)
3. Access to Netlify dashboard (optional, for frontend)

## Step 1: Get Razorpay Credentials

1. **Sign up/Login to Razorpay**
   - Go to https://dashboard.razorpay.com
   - Sign up or log in to your account

2. **Get API Keys**
   - Navigate to Settings → API Keys
   - Generate API keys (Test Mode for testing, Live Mode for production)
   - You'll get:
     - `Key ID` (starts with `rzp_test_` or `rzp_live_`)
     - `Key Secret` (keep this secret!)

## Step 2: Configure Backend (Render)

1. **Go to Render Dashboard**
   - Navigate to https://dashboard.render.com
   - Select your `savedieties-backend` service

2. **Add Environment Variables**
   - Go to Environment tab
   - Add the following variables:
   
   ```
   RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
   RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
   ```
   
   Replace with your actual Razorpay credentials

3. **Deploy Backend**
   - The backend will automatically redeploy with new environment variables
   - Or manually trigger a deploy

4. **Install Dependencies**
   - SSH into your Render service or wait for auto-deploy
   - Run: `cd backend && npm install`
   - This will install the `razorpay` package

## Step 3: Test the Integration

### Test Mode (Recommended First)
1. Use test API keys (starting with `rzp_test_`)
2. Use Razorpay test cards for testing:
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - Name: Any name

### Test Payment Flow
1. Go to your Netlify site: https://savedieties2.netlify.app
2. Navigate to Contribute section
3. Fill in the form with test details
4. Click "Pay" button
5. Razorpay checkout should open
6. Complete payment with test card
7. Verify payment success message

## Step 4: Go Live (Production)

1. **Switch to Live Mode in Razorpay**
   - Complete KYC verification in Razorpay dashboard
   - Activate your account
   - Generate Live API keys

2. **Update Render Environment Variables**
   - Replace test keys with live keys:
   ```
   RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
   RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
   ```

3. **Test with Real Payment**
   - Use a small amount (₹1) to test
   - Verify payment appears in Razorpay dashboard

## API Endpoints Created

### 1. Create Order
```
POST /api/payment/create-order
Body: {
  "amount": 1000,
  "currency": "INR",
  "receipt": "receipt_123",
  "notes": {}
}
```

### 2. Verify Payment
```
POST /api/payment/verify
Body: {
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

### 3. Get Payment Details
```
GET /api/payment/:paymentId
```

## Frontend Integration

The frontend automatically:
1. Loads Razorpay SDK
2. Creates order on backend
3. Opens Razorpay checkout
4. Verifies payment after completion
5. Shows success/failure message

## Payment Flow

```
User clicks "Pay" 
  → Frontend calls backend to create order
  → Backend creates Razorpay order
  → Frontend opens Razorpay checkout
  → User completes payment
  → Razorpay sends response to frontend
  → Frontend verifies payment with backend
  → Backend verifies signature
  → Success message shown to user
```

## Security Notes

1. **Never expose Key Secret** in frontend code
2. **Always verify payments** on backend
3. **Use HTTPS** for all payment transactions
4. **Store payment logs** for reconciliation
5. **Handle webhook** for payment notifications (optional)

## Troubleshooting

### Payment Gateway Not Configured
- Check if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set in Render
- Restart backend service

### Razorpay SDK Not Loading
- Check internet connection
- Verify Razorpay script URL is accessible
- Check browser console for errors

### Payment Verification Failed
- Ensure Key Secret matches the one used to create order
- Check if signature calculation is correct
- Verify payment ID and order ID are correct

### CORS Errors
- Ensure frontend URL is in backend CORS whitelist
- Check if backend is running and accessible

## Support

- Razorpay Documentation: https://razorpay.com/docs
- Razorpay Support: support@razorpay.com
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-details

## Next Steps

1. Set up Razorpay webhooks for payment notifications
2. Implement payment history tracking
3. Add receipt generation
4. Set up refund functionality
5. Implement subscription payments (if needed)
