import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle2, Heart, Scale, QrCode } from 'lucide-react';
import { initiatePayment, RazorpayResponse } from '@/lib/razorpay';

const ContributeGeneral: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const predefinedAmounts = ['500', '1000', '2500', '5000', '10000', '25000'];

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const getSelectedAmount = () => {
    return customAmount || amount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalAmount = getSelectedAmount();
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!donorName || !donorEmail || !donorPhone) {
      alert('Please fill in all your details');
      return;
    }

    setIsProcessing(true);

    // Initiate Razorpay payment
    await initiatePayment(
      {
        amount: parseFloat(finalAmount),
        name: donorName,
        email: donorEmail,
        phone: donorPhone,
        description: 'General Contribution for Temple Protection',
      },
      (response: RazorpayResponse) => {
        // Payment successful
        console.log('Payment successful:', response);
        setIsProcessing(false);
        setShowSuccess(true);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      },
      (error: any) => {
        // Payment failed
        console.error('Payment failed:', error);
        setIsProcessing(false);
        alert(error.message || 'Payment failed. Please try again.');
      }
    );
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              Your generous contribution of ₹{getSelectedAmount()} has been received successfully.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Your support helps protect our temples and preserve our heritage.
            </p>
            <p className="text-xs text-gray-400">
              Redirecting you to homepage...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Heart className="mr-2 h-6 w-6 text-orange-600" />
                  Support Temple Protection
                </CardTitle>
                <CardDescription>
                  Your contribution helps support legal proceedings and preservation of our sacred temples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Select Amount</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {predefinedAmounts.map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={amount === value ? 'default' : 'outline'}
                          className={amount === value ? 'bg-orange-600 hover:bg-orange-700' : ''}
                          onClick={() => handleAmountSelect(value)}
                        >
                          ₹{value}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customAmount">Or Enter Custom Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="customAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          className="pl-8"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Donor Details */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Your Details</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="donorName">Full Name *</Label>
                      <Input
                        id="donorName"
                        type="text"
                        placeholder="Enter your full name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="donorEmail">Email Address *</Label>
                      <Input
                        id="donorEmail"
                        type="email"
                        placeholder="your.email@example.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="donorPhone">Phone Number *</Label>
                      <Input
                        id="donorPhone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-base font-semibold">Payment Method</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button
                        type="button"
                        variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                        className={`justify-start h-auto py-4 ${paymentMethod === 'upi' ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        <Wallet className="mr-3 h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">UPI</div>
                          <div className="text-xs opacity-80">Google Pay, PhonePe, Paytm</div>
                        </div>
                      </Button>

                      <Button
                        type="button"
                        variant={paymentMethod === 'card' ? 'default' : 'outline'}
                        className={`justify-start h-auto py-4 ${paymentMethod === 'card' ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <CreditCard className="mr-3 h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">Credit/Debit Card</div>
                          <div className="text-xs opacity-80">Visa, Mastercard, Rupay</div>
                        </div>
                      </Button>

                      <Button
                        type="button"
                        variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
                        className={`justify-start h-auto py-4 ${paymentMethod === 'netbanking' ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                        onClick={() => setPaymentMethod('netbanking')}
                      >
                        <Building2 className="mr-3 h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">Net Banking</div>
                          <div className="text-xs opacity-80">All major banks</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg"
                    disabled={isProcessing || !getSelectedAmount()}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      `Contribute ₹${getSelectedAmount() || '0'}`
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Your contribution is secure and will be used for temple protection and legal proceedings
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Information & QR Code */}
          <div className="space-y-4">
            {/* QR Code Payment Card */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <QrCode className="mr-2 h-5 w-5 text-orange-600" />
                  Scan & Pay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-orange-900 mb-2">BHIM UPI Payment</p>
                  <p className="text-xs text-orange-800 mb-3">Scan QR code to pay or enter payment address</p>
                  <p className="text-xs font-mono text-orange-900 mb-4">sakethamhindu@dlb</p>
                </div>
                <div className="bg-white p-3 rounded-lg flex justify-center">
                  <img 
                    src="/bhim-upi-qr.png"
                    alt="BHIM UPI QR Code"
                    className="w-48 h-48 object-contain"
                    onError={(e) => {
                      // Fallback if image not found
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <p className="text-xs text-center text-orange-900 font-semibold">
                  OR ENTER PAYMENT ADDRESS<br/>
                  sakethamhindu@dlb
                </p>
              </CardContent>
            </Card>

            {/* Impact Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Scale className="mr-2 h-5 w-5 text-orange-600" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Legal Support</h4>
                      <p className="text-xs text-gray-600">Fund court cases and legal proceedings</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Temple Protection</h4>
                      <p className="text-xs text-gray-600">Preserve sacred properties and heritage</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Community Support</h4>
                      <p className="text-xs text-gray-600">Help maintain temple sanctity</p>
                    </div>
                  </div>
                </div>

                <Alert className="bg-orange-50 border-orange-200">
                  <AlertDescription className="text-xs text-orange-900">
                    <strong>44 Active Cases</strong> currently need your support. Your contribution helps cover legal fees, court costs, and advocacy efforts.
                  </AlertDescription>
                </Alert>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-semibold text-sm">Why Contribute?</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Protect temple properties</li>
                    <li>• Support ongoing legal battles</li>
                    <li>• Preserve cultural heritage</li>
                    <li>• Ensure deity rights</li>
                  </ul>
                </div>

                <Alert>
                  <AlertDescription className="text-xs">
                    All contributions are treated as seva to the Temple Hundi and used for deity welfare.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributeGeneral;
