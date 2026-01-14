import { useEffect } from "react";

function DeletePopup({ setShowDeletePopup }) {


  useEffect(() => {
    const timer = setTimeout(() => setShowDeletePopup(false), 3000);
    return () => clearTimeout(timer);
  }, [setShowDeletePopup]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center gap-4 relative w-80 sm:w-96 animate-scale-in">

        {/* Check Icon */}
        <div className="bg-red-100 rounded-full p-4 flex items-center justify-center">
          <img src="images/check.png" alt="Success" className="w-10 h-10" />
        </div>

        {/* Message */}
        <p className="text-center text-gray-900 font-medium text-sm sm:text-base">
          Product removed from cart successfully
        </p>

        {/* Close Button */}
        <button
          onClick={() => setShowDeletePopup(false)}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
        >
          <img src="images/close.png" alt="Close" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default DeletePopup;
