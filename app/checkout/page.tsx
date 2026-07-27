import { ShoppingBag, ShieldCheck, Download, ScrollText } from "lucide-react";
import CheckoutNav from "@/components/checkout/CheckoutNav";
import ContactSection from "@/components/checkout/ContactSection";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import BillingAddressSection from "@/components/checkout/BillingAddressSection";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <CheckoutNav />

      <main className="flex-grow max-w-container-max mx-auto w-full px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <ContactSection />
            <PaymentMethodSection />
            <BillingAddressSection />

            <div className="pt-6 border-t-4 border-surface-container-highest">
              <button className="w-full bg-primary text-white font-display text-lg py-6 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 rounded-lg">
                <ShoppingBag size={22} />
                Complete Purchase
              </button>

              <div className="mt-8 flex flex-wrap justify-center gap-8 text-ink-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-secondary" />
                  <span className="text-xs">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download size={20} className="text-secondary" />
                  <span className="text-xs">Instant Digital Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ScrollText size={20} className="text-secondary" />
                  <span className="text-xs">DRM-Free Content</span>
                </div>
              </div>
            </div>
          </div>

          <OrderSummary />
        </div>
      </main>

      <footer className="bg-surface-container-low border-t-4 border-surface-container-highest w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-6 max-w-container-max mx-auto gap-6">
          <span className="text-xl font-display text-ink-rich">Pixelvale</span>
          <div className="flex gap-8 text-xs">
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Help Center
            </a>
          </div>
          <p className="text-ink-muted text-xs text-center md:text-right">
            © 2024 Pixelvale Indie Games. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}