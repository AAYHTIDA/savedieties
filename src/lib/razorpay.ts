// Razorpay Payment Integration

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export interface PaymentOptions {
  amount: number;
  currency?: string;
  name: string;
  email: string;
  phone: string;
  description?: string;
  caseId?: string;
  caseTitle?: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create Razorpay order
export const createOrder = async (amount: number, notes?: any): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: notes || {},
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }

    return data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
};

// Verify payment
export const verifyPayment = async (paymentData: RazorpayResponse): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Payment verification failed');
    }

    return data;
  } catch (error) {
    console.error('Verify payment error:', error);
    throw error;
  }
};

// Initialize Razorpay payment
export const initiatePayment = async (
  options: PaymentOptions,
  onSuccess: (response: RazorpayResponse) => void,
  onFailure: (error: any) => void
): Promise<void> => {
  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    // Create order
    const orderData = await createOrder(options.amount, {
      name: options.name,
      email: options.email,
      phone: options.phone,
      caseId: options.caseId,
      caseTitle: options.caseTitle,
    });

    // Razorpay options
    const razorpayOptions = {
      key: orderData.key_id,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: 'Save Deities',
      description: options.description || 'Contribution for Temple Protection',
      order_id: orderData.order.id,
      prefill: {
        name: options.name,
        email: options.email,
        contact: options.phone,
      },
      theme: {
        color: '#ea580c', // Orange color matching your theme
      },
      handler: async function (response: RazorpayResponse) {
        try {
          // Verify payment on backend
          await verifyPayment(response);
          onSuccess(response);
        } catch (error) {
          onFailure(error);
        }
      },
      modal: {
        ondismiss: function () {
          onFailure(new Error('Payment cancelled by user'));
        },
      },
    };

    // Open Razorpay checkout
    const razorpay = new (window as any).Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Payment initiation error:', error);
    onFailure(error);
  }
};
