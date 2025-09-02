import React from 'react';

function PaymentDetails() {
  const account = {
    name: 'Elena Geo Tech Private Limited',
    bank: 'ICICI Bank, RT Nagar Branch',
    accountNumber: '020405012021',
    ifsc: 'ICIC0000204',
    type: 'Current Account',
  };

  return (
    <div className="flex flex-col bg-white py-3 px-6 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-2xl mx-auto rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-start">
          Payment Details
        </h2>
        <table className="w-full border border-gray-200 rounded shadow-sm">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="font-semibold px-6 py-5 border-r border-gray-200 bg-blue-50 w-1/3">Account Holder</td>
              <td className="px-6 py-3">{account.name}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="font-semibold px-6 py-5 border-r border-gray-200 bg-blue-50">Bank</td>
              <td className="px-6 py-3">{account.bank}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="font-semibold px-6 py-5 border-r border-gray-200 bg-blue-50">Account Number</td>
              <td className="px-6 py-3">{account.accountNumber}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="font-semibold px-6 py-5 border-r border-gray-200 bg-blue-50">IFSC Code</td>
              <td className="px-6 py-3">{account.ifsc}</td>
            </tr>
            <tr>
              <td className="font-semibold px-6 py-5 border-r border-gray-200 bg-blue-50">Account Type</td>
              <td className="px-6 py-3">{account.type}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentDetails;
