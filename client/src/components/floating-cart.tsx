import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

interface FloatingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FloatingCart({ isOpen, onClose }: FloatingCartProps) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity({ id: itemId, quantity: newQuantity });
    }
  };

  const handleProceedToCheckout = () => {
    alert('Checkout functionality would be implemented here with payment processing integration.');
  };

  return (
    <div className={`fixed top-24 right-6 z-40 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Shopping Cart</span>
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate">{item.product.name}</h4>
                    <p className="text-sm text-slate-600">${item.product.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-6 h-6 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-6 h-6 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Total:</span>
                <span className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-shadow duration-300"
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => clearCart()}
                  className="w-full text-slate-600 hover:text-slate-800"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
