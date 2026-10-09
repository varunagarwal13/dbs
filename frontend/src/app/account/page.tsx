"use client";

import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs text-[var(--text-muted)] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> / 
          <Link href="/account" className="hover:text-white transition-colors">Account</Link> / 
          <span className="text-white">Customer profile</span>
        </div>

        <AccountLayout activeTab="profile">
          <div className="mb-12 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your details. Your space.</h1>
              <p className="text-[var(--text-muted)]">Keep your contact information and address up to date.</p>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl">
            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-lg font-bold text-white mb-6">Personal information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">First name</label>
                    <input type="text" defaultValue="Avery" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Last name</label>
                    <input type="text" defaultValue="Morgan" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Email address</label>
                  <input type="email" defaultValue="avery.morgan@example.com" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                  <p className="text-[10px] text-[var(--text-muted)] mt-2">Used for your account and order confirmations.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-lg font-bold text-white mb-6">Contact numbers</h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">Save more than one phone number. Choose a primary number for checkout.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-[var(--text-muted)]">Primary phone</label>
                    <span className="bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold px-2 py-0.5 rounded-sm">Used at checkout</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <input type="text" defaultValue="+1 (202) 555-0147" className="flex-1 bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                    <span className="text-xs text-[var(--text-muted)] w-24">Primary number</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-[var(--text-muted)]">Additional phone</label>
                    <span className="bg-white/5 border border-white/10 text-[var(--text-muted)] text-[10px] font-bold px-2 py-0.5 rounded-sm">Alternate</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <input type="text" defaultValue="+1 (202) 555-0166" className="flex-1 bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                    <div className="flex flex-col gap-1 w-24">
                      <button className="text-[10px] text-white hover:underline text-left">Make primary</button>
                      <button className="text-[10px] text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors text-left">Remove number</button>
                    </div>
                  </div>
                </div>
                
                <button className="text-xs text-white border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  Add phone number +
                </button>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl mb-8">
              <h2 className="text-lg font-bold text-white mb-6">Your address</h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">Your saved address will be prefilled at checkout.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Street address</label>
                  <input type="text" defaultValue="128 Maple Street" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Apartment / suite</label>
                    <input type="text" defaultValue="Apt 4B" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Postal code</label>
                    <input type="text" defaultValue="11201" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">City / postal area</label>
                    <input type="text" defaultValue="Brooklyn" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">State / region</label>
                    <select className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none appearance-none">
                      <option>New York</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Country</label>
                  <select className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:border-[var(--accent)] outline-none appearance-none">
                    <option>United States</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <div className="text-[10px] text-[var(--text-muted)]">Example customer details - No sensitive information</div>
              <div className="flex gap-4">
                <button className="btn-secondary py-2">Cancel</button>
                <button className="bg-[var(--success)] text-white px-6 py-2 rounded-lg font-bold">Save changes ✓</button>
              </div>
            </div>
          </div>
        </AccountLayout>
      </div>
    </main>
  );
}
