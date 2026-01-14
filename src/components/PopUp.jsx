import { useEffect } from "react";

function PopUp({ setShowPopup }) {

  // Optional: auto-close after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 3000);
    return () => clearTimeout(timer);
  }, [setShowPopup]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      {/* PopUp Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-80 max-w-sm p-6 flex flex-col items-center gap-4 animate-scale-in">

        {/* Animated Checkmark */}
        <div className="bg-green-100 rounded-full p-4 flex items-center justify-center">
          <img
            src="images/check.png"
            alt="Success"
            className="w-10 h-10 animate-bounce-slow"
          />
        </div>

        {/* Message */}
        <p className="text-gray-900 font-semibold text-center text-lg">
          Product added successfully!
        </p>

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <img src="images/close.png" alt="Close" className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}

export default PopUp;
