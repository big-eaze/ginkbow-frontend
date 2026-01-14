import { useContext, useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import { MenuContext } from '../utils/MenuContext';


function Tracking() {

  const { tracking, cart, setFilteredProducts, products, cartQuantity } = useContext(MenuContext);
  const [iscopied, setIsCopied] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  if (!tracking) {
    return (
      <>
        <Header cartQuantity={cartQuantity} />

        <div className="tracking-container">
          <p>Loading tracking information...</p>
        </div>
      </>
    );
  }



  const getStepClass = (stepName) => {
    const statusOrder = [
      'Order Placed',
      'Processing',
      'Shipped',
      'Out for Delivery',
      'Delivered'
    ];
    const currentIndex = statusOrder.indexOf(tracking.status);
    const stepIndex = statusOrder.indexOf(stepName);

    if (stepIndex === currentIndex) return 'current';
    if (stepIndex < currentIndex) return 'completed';
    return 'upcoming';
  };


  console.log(tracking);

  return (
    <>
      <Header
        cart={cart}
        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Order ID: <span className="text-indigo-600">{tracking.order_id}</span>
          </h2>
          <p className="text-sm text-gray-500">
            <strong>Estimated Delivery:</strong>{' '}
            {new Date(tracking.estimated_delivery_time_ms).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
          {['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, idx) => {
            const stepClass = getStepClass(step);
            const isCompleted = stepClass === 'completed';
            const isCurrent = stepClass === 'current';

            return (
              <div key={step} className="flex-1 flex items-center last:flex-none">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${isCompleted
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : isCurrent
                        ? 'bg-indigo-100 border-indigo-400 text-indigo-600'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                      } font-semibold text-xs`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${isCompleted
                      ? 'text-indigo-600'
                      : isCurrent
                        ? 'text-indigo-600'
                        : 'text-gray-400'
                      }`}
                  >
                    {step}
                  </span>
                </div>

                {/* Connector Line */}
                {idx < 4 && (
                  <div
                    className={`flex-1 h-1 ${isCompleted ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Tracking Details */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <p className="text-sm text-gray-500">
            <strong>Carrier:</strong> {tracking.carrier}
          </p>
          <p className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
            <strong>Tracking Number:</strong> {tracking.tracking_number}{' '}
            <button
              onClick={() => {
                if (timeoutId.current) clearTimeout(timeoutId.current);
                navigator.clipboard.writeText(tracking.tracking_number);
                setIsCopied(true);
                timeoutId.current = setTimeout(() => setIsCopied(false), 2000);
              }}
              className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition"
            >
              {iscopied ? 'Copied!' : 'Copy'}
            </button>
          </p>
          <p className="text-sm text-gray-500">
            <strong>Status:</strong> {tracking.status}
          </p>
        </div>
      </div>

    </>
  );
}

export default Tracking;
