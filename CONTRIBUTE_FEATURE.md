# Contribute/Donation Feature

## ✅ What Was Added

### 1. General Contribute Page (`/contribute`)
A complete payment/donation page for general temple support with:
- **Amount Selection**: Predefined amounts (₹500, ₹1000, ₹2500, ₹5000, ₹10000, ₹25000) or custom amount
- **Donor Details Form**: Name, email, and phone number
- **Payment Methods**: UPI, Credit/Debit Card, Net Banking
- **Impact Information**: Shows how contributions help (Legal Support, Temple Protection, Community Support)
- **Success Screen**: Thank you message after contribution

### 2. Case-Specific Contribute Page (`/contribute/:id`)
A payment page for contributing to specific court cases with:
- **Case Summary**: Shows the specific court case details
- **Same payment features** as general contribute page
- **Targeted contribution** for individual cases

### 3. Contribute Button on Homepage
- Updated the "Contribute" section on homepage
- Button now navigates to `/contribute` page
- Prominent call-to-action for donations

### 4. Contribute Button on Case Detail Page (Optional)
- Added "Support This Case" card on court case detail pages
- Allows users to contribute to specific cases
- Navigates to `/contribute/:id`

## 🎨 Features

### General Contribute Page Features:
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Multiple Payment Options**: UPI, Card, Net Banking
- **Custom Amount**: Users can enter any amount
- **Form Validation**: Required fields for donor information
- **Loading States**: Shows processing animation during payment
- **Success Feedback**: Confirmation screen with auto-redirect
- **Impact Display**: Shows how contributions help (44 active cases)

### User Flow:
1. User clicks "Contribute" button on homepage
2. Redirected to general payment page
3. Selects amount and payment method
4. Fills in donor details
5. Submits contribution
6. Sees success message
7. Auto-redirected back to homepage

## 📁 Files Modified/Created

### Created:
- `src/pages/ContributeGeneral.tsx` - General payment/donation page
- `src/pages/Contribute.tsx` - Case-specific payment page (already existed)

### Modified:
- `src/components/ContributeSection.tsx` - Added navigation to contribute page
- `src/pages/CourtCaseDetail.tsx` - Added contribute button for specific cases
- `src/App.tsx` - Added routes for both contribute pages

## 🚀 How to Use

### For Users:
1. Navigate to any court case detail page
2. Look for the orange "Support This Case" card on the right
3. Click "Contribute Now"
4. Select amount and fill details
5. Choose payment method
6. Submit contribution

### For Developers:
The payment processing is currently simulated. To integrate real payment gateway:

1. **Razorpay Integration**:
```typescript
// Install: npm install razorpay
import Razorpay from 'razorpay';

const options = {
  key: 'YOUR_RAZORPAY_KEY',
  amount: amount * 100, // Amount in paise
  currency: 'INR',
  name: 'Save Deities',
  description: courtCase.caseTitle,
  handler: function (response) {
    // Handle success
  }
};
```

2. **Stripe Integration**:
```typescript
// Install: npm install @stripe/stripe-js
import { loadStripe } from '@stripe/stripe-js';
```

3. **PayPal Integration**:
```typescript
// Install: npm install @paypal/react-paypal-js
import { PayPalButtons } from '@paypal/react-paypal-js';
```

## 🎯 Next Steps (Optional Enhancements)

1. **Real Payment Gateway**: Integrate Razorpay, Stripe, or PayPal
2. **Donation Tracking**: Store contributions in Firestore
3. **Receipt Generation**: Email PDF receipts to donors
4. **Progress Bar**: Show fundraising goal and current amount
5. **Donor Wall**: Display list of contributors (with permission)
6. **Tax Benefits**: Add 80G certificate information
7. **Recurring Donations**: Monthly contribution option
8. **Social Sharing**: Share contribution on social media

## 💡 Payment Gateway Recommendations

### For India:
1. **Razorpay** (Recommended)
   - Easy integration
   - Supports UPI, Cards, Net Banking
   - Good documentation
   - Competitive pricing

2. **Paytm Payment Gateway**
   - Popular in India
   - Multiple payment options

3. **Instamojo**
   - Good for small businesses
   - Easy setup

### International:
1. **Stripe**
   - Global payment support
   - Excellent developer experience

2. **PayPal**
   - Widely trusted
   - International support

## 🔒 Security Notes

- Never store payment card details
- Use HTTPS for all payment pages
- Implement proper authentication
- Follow PCI DSS compliance
- Use payment gateway's secure checkout
- Validate all inputs server-side
- Log all transactions securely

## 📊 Analytics to Track

- Number of contributions per case
- Total amount raised per case
- Average contribution amount
- Payment method preferences
- Conversion rate (views to contributions)
- Donor retention rate
