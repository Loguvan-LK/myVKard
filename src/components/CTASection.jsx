import React from "react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

const CTASection = () => {
  const { addToCart, setCartOpen } = useCartStore();

  const handleAddToCart = () => {
    const product = {
      id: "nfc-001",
      name: "NFC Business Card",
      price: 25,
      quantity: 1,
    };
    addToCart(product);
    setCartOpen(true);
    toast.success("🎉 Product added to cart!", { duration: 1000 });
  };

  return (
    <section className="bg-[#004672] text-white py-20 text-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <img src="/assets/Logo.svg" alt="MyVkard Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Make Every Connection Count
        </h2>
        <p className="text-lg mb-1">
          Join thousands of professionals using MyVkard to upgrade how they network. Smart. Seamless.
        </p>
        <p className="text-lg mb-8">Paperless.</p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12">
          <div className="w-full md:w-[40%] bg-[#fff5f7] rounded-xl relative shadow-lg flex flex-col justify-start px-6 py-8 min-h-[260px]">
            <div className="text-left text-[#004672] z-10 flex-grow pr-32">
              <h2 className="text-2xl font-bold leading-tight mb-4">
                Join<br />
                <span className="text-[#0d1b2a]">MyVkard</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed font-bold">
                Get your personalized digital business card today and start making memorable first impressions.
              </p>
            </div>
            <div className="absolute right-[-60px] bottom-[-10px] z-0 hidden md:block">
              <img src="/assets/JoinMyVkard.png" alt="Digital Business Card" className="w-[250px] md:w-[270px] rotate-[-5deg] drop-shadow-xl" />
            </div>
            <div className="md:hidden mt-4 flex justify-center">
              <img src="/assets/JoinMyVkard.png" alt="Digital Business Card" className="w-[220px] rotate-[-5deg] drop-shadow-xl" />
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-[#1e1e1e] rounded-xl p-6 shadow-lg text-left text-white flex flex-col justify-between">
            <div>
              <h3 className="text-sm uppercase text-gray-300 mb-2">Lifetime Access</h3>
              <h2 className="text-2xl font-bold text-white mb-3">XYZ</h2>
              <div className="inline-block bg-orange-500 text-xs uppercase font-medium px-2 py-1 rounded mb-4">exclusive</div>
              <ul className="space-y-2 text-sm text-gray-200 bg-[#2a2a2a] p-4 rounded-lg mb-6">
                <li>Premium card design</li>
                <li>Advanced analytics & tap insights</li>
                <li>Unlimited profile edits</li>
                <li>Priority support</li>
              </ul>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-5 py-3 rounded flex items-center gap-2 text-sm font-semibold self-start"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;