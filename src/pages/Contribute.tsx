import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle2 } from 'lucide-react';
import { firebaseApi } from '@/lib/firebase';
import { initiatePayment, RazorpayResponse } from '@/lib/razorpay';

const Contribute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: courtCase, isLoading } = useQuery({
    queryKey: ['courtCase', id],
    queryFn: () => firebaseApi.getCourtCase(id!),
    enabled: !!id,
  });

  const predefinedAmounts = ['500', '1000', '2500', '5000', '10000'];

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
        description: `Contribution for ${courtCase?.caseTitle || 'Temple Protection'}`,
        caseId: id,
        caseTitle: courtCase?.caseTitle,
      },
      (response: RazorpayResponse) => {
        // Payment successful
        console.log('Payment successful:', response);
        setIsProcessing(false);
        setShowSuccess(true);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate(`/court-cases/${id}`);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!courtCase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>Court case not found</AlertDescription>
            </Alert>
            <Button 
              onClick={() => navigate('/court-cases')} 
              className="mt-4 w-full"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Court Cases
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              Your contribution of ₹{getSelectedAmount()} has been received successfully.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you back to the case details...
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
            onClick={() => navigate(`/court-cases/${id}`)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Details
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
                <CardTitle className="text-2xl">Contribute to This Case</CardTitle>
                <CardDescription>
                  Your contribution helps support legal proceedings for temple protection
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
                    Your contribution is secure and will be used for legal proceedings
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Case Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Case Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courtCase.imageUrl && (
                  <img
                    src={courtCase.imageUrl}
                    alt={courtCase.caseTitle}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {courtCase.caseTitle}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Case No: {courtCase.caseNumber}
                  </p>
                </div>

                {courtCase.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {courtCase.description}
                  </p>
                )}

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-gray-900">{courtCase.status}</span>
                  </div>
                  {courtCase.courtName && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Court:</span>
                      <span className="font-semibold text-gray-900">{courtCase.courtName}</span>
                    </div>
                  )}
                </div>

                <Alert>
                  <AlertDescription className="text-xs">
                    Your contribution helps cover legal fees, court costs, and advocacy efforts to protect our temples and heritage.
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

export default Contribute;
