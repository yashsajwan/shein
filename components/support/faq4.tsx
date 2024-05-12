import React from "react";

const Faq4 = () => {
  return (
    <div className="ml-3">
      <p className="mt-2 mb-1">
        <strong>1 What all payments methods accepted ?</strong>
      </p>
      <p>The payment options we support are:</p>
      <ul className="list-disc ml-5">
        <li>Credit Card</li>
        <li>Debit Card</li>
        <li>Net Banking</li>
        <li>Paytm Wallet</li>
        <li>UPI</li>
        <li>Google Pay</li>
        <li>Credit points/Bonus Points</li>
      </ul>
      <p>
        We process all online payments through Paytm which provides secure,
        encrypted connections for all credit card, debit card and Net Banking
        transactions..
      </p>

      <p className="mt-2 mb-1">
        <strong>2 What should I do if my payment fails?</strong>
      </p>
      <p>
        In case there is a failure in payment, please retry and keep the
        following things in mind:
      </p>
      <ul className="list-disc ml-5">
        <li>
          Please confirm if the information you’ve provided is correct i.e.
          account details, billing address, and password (for Net Banking); and
          that your internet connection wasn’t disrupted during the process.
        </li>
        <li>
          If your account has been debited even after a payment failure, it is
          normally rolled back to your bank account within 10 business days. For
          any further clarification, you can email us at
          ordersupport@sheinindias.com.
        </li>
      </ul>

      <p className="mt-2 mb-1">
        <strong>
          3 My account has been debited but order not confirmed ? What should i
          do ?
        </strong>
      </p>
      <ul className="list-disc ml-5">
        <li>
          We ensure that an Order ID is confirmed only once our bank receives
          the payment from your bank. Sometimes, due to unforeseen reasons, the
          amount might be debited from your side but wouldn't have been received
          by us yet. Please wait for 24 hours to check if the order has been
          confirmed or if the amount is credited back to you. If neither
          happens, please drop us a mail and we’ll help you further.
        </li>
      </ul>
    </div>
  );
};

export default Faq4;
