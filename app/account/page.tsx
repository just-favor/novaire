"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Package, MapPin, Lock, LogOut, ArrowRight,
  Check, Edit2, Heart, ShoppingBag, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Container from "@/components/Layout/Container";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

type Tab = "profile" | "orders" | "addresses" | "security";

const mockOrders = [
  { id: "NV-482910", date: "12 May 2025", status: "Delivered", total: 1240, items: 2 },
  { id: "NV-371845", date: "3 April 2025", status: "Delivered", total: 890, items: 1 },
  { id: "NV-290034", date: "18 February 2025", status: "Delivered", total: 2150, items: 3 },
];

const statusColor: Record<string, string> = {
  Delivered: "text-[#ffbf50]/70 bg-[#ffbf50]/10 border-[#ffbf50]/20",
  Processing: "text-blue-400/70 bg-blue-400/10 border-blue-400/20",
  Shipped: "text-green-400/70 bg-green-400/10 border-green-400/20",
  Cancelled: "text-red-400/70 bg-red-400/10 border-red-400/20",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number] },
  }),
};

export default function AccountPage() {
  const { user, loading, logout, updateProfile } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");

  // Profile edit state
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", email: "" });
  const [profileSaved, setProfileSaved] = useState(false);

  // Address state
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", line1: "47 Rue de la Paix", city: "Paris", zip: "75002", country: "France", isDefault: true },
  ]);
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", line1: "", city: "", zip: "", country: "France" });

  // Security state
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaved, setPwSaved] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) setProfileForm({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <span className="h-6 w-6 rounded-full border border-[#ffbf50]/40 border-t-transparent animate-spin" />
      </div>
    );
  }

  const handleProfileSave = () => {
    updateProfile(profileForm);
    setEditing(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) return;
    setPwLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPwLoading(false);
    setPwSaved(true);
    setPwForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 2500);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses((prev) => [...prev, { ...newAddress, id: Date.now(), isDefault: false }]);
    setNewAddress({ label: "", line1: "", city: "", zip: "", country: "France" });
    setAddingAddress(false);
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffbf50] selection:text-black">
      <Navbar />

      <div className="pt-28 pb-20">
        <Container>
          {/* Header */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
            <span className="block text-[10px] uppercase tracking-[0.5em] text-[#ffbf50]/60 mb-2">My Account</span>
            <h1 className="font-heading text-3xl sm:text-4xl tracking-[0.2em] text-white/90">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mt-1 text-xs tracking-[0.15em] text-white/30">{user.email}</p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial="hidden" animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
          >
            {[
              { icon: Package, label: "Orders", value: mockOrders.length, href: undefined, onClick: () => setTab("orders") },
              { icon: Heart, label: "Wishlist", value: wishlistCount, href: "/wishlist", onClick: undefined },
              { icon: ShoppingBag, label: "Bag", value: cartCount, href: undefined, onClick: undefined },
              { icon: MapPin, label: "Addresses", value: addresses.length, href: undefined, onClick: () => setTab("addresses") },
            ].map(({ icon: Icon, label, value, href, onClick }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={i}
                onClick={onClick}
                className={`rounded-xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-3 transition-all duration-300 hover:border-[#ffbf50]/20 hover:bg-[#ffbf50]/[0.03] ${onClick || href ? "cursor-pointer" : ""}`}
              >
                {href ? (
                  <Link href={href} className="flex items-center gap-3 w-full">
                    <Icon className="h-4 w-4 text-[#ffbf50]/50" strokeWidth={1.5} />
                    <div>
                      <p className="font-mono text-lg text-white/80">{value}</p>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">{label}</p>
                    </div>
                  </Link>
                ) : (
                  <>
                    <Icon className="h-4 w-4 text-[#ffbf50]/50" strokeWidth={1.5} />
                    <div>
                      <p className="font-mono text-lg text-white/80">{value}</p>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">{label}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            {/* Sidebar tabs */}
            <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <nav className="space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                      tab === id
                        ? "bg-[#ffbf50]/10 border border-[#ffbf50]/25 text-[#ffbf50]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {label}
                    {tab === id && <ChevronRight className="h-3 w-3 ml-auto" />}
                  </button>
                ))}

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button
                    onClick={() => { logout(); router.push("/"); }}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs tracking-[0.2em] uppercase text-white/25 hover:text-red-400/70 transition-colors"
                  >
                    <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    Sign Out
                  </button>
                </div>
              </nav>
            </motion.aside>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {/* PROFILE */}
              {tab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Profile Information</h2>
                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-[#ffbf50]/60"
                      >
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                    )}
                  </div>

                  {profileSaved && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-xl border border-[#ffbf50]/20 bg-[#ffbf50]/5 px-4 py-3"
                    >
                      <Check className="h-3.5 w-3.5 text-[#ffbf50]" />
                      <span className="text-[11px] tracking-[0.2em] text-[#ffbf50]/70">Profile updated successfully</span>
                    </motion.div>
                  )}

                  {editing ? (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[
                          { label: "First Name", key: "firstName" },
                          { label: "Last Name", key: "lastName" },
                        ].map(({ label, key }) => (
                          <div key={key} className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">{label}</label>
                            <Input
                              value={profileForm[key as keyof typeof profileForm]}
                              onChange={(e) => setProfileForm((p) => ({ ...p, [key]: e.target.value }))}
                              className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Email</label>
                        <Input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                          className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={handleProfileSave}
                          className="flex items-center gap-2 rounded-xl border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-6 py-2.5 text-[11px] uppercase tracking-[0.3em] text-[#ffbf50] transition-all hover:bg-[#ffbf50]/20"
                        >
                          <Check className="h-3.5 w-3.5" /> Save
                        </button>
                        <button
                          onClick={() => { setEditing(false); setProfileForm({ firstName: user.firstName, lastName: user.lastName, email: user.email }); }}
                          className="px-6 py-2.5 text-[11px] uppercase tracking-[0.3em] text-white/25 transition-colors hover:text-white/50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[
                        { label: "First Name", value: user.firstName },
                        { label: "Last Name", value: user.lastName },
                        { label: "Email", value: user.email },
                        { label: "Member Since", value: "May 2025" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">{label}</span>
                          <span className="text-xs tracking-[0.12em] text-white/60">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ORDERS */}
              {tab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Order History</h2>
                  {mockOrders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm tracking-wider text-white/80">{order.id}</span>
                          <span className={`rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] ${statusColor[order.status]}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/30">
                          <span>{order.date}</span>
                          <span>·</span>
                          <span>{order.items} {order.items === 1 ? "item" : "items"}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm tracking-wider text-white/60">${order.total.toLocaleString()}</span>
                        <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/25 transition-colors hover:text-[#ffbf50]/60">
                          Details <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {mockOrders.length === 0 && (
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-12 text-center">
                      <Package className="mx-auto h-8 w-8 text-white/10 mb-3" strokeWidth={1} />
                      <p className="text-xs tracking-[0.2em] text-white/25">No orders yet</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ADDRESSES */}
              {tab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Saved Addresses</h2>
                    <button
                      onClick={() => setAddingAddress(true)}
                      className="text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-[#ffbf50]/60"
                    >
                      + Add New
                    </button>
                  </div>

                  {addresses.map((addr, i) => (
                    <motion.div
                      key={addr.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium tracking-[0.15em] text-white/70">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="rounded-full border border-[#ffbf50]/20 bg-[#ffbf50]/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#ffbf50]/60">Default</span>
                          )}
                        </div>
                        <p className="text-xs tracking-[0.1em] text-white/35 leading-relaxed">
                          {addr.line1}<br />{addr.city}, {addr.zip}<br />{addr.country}
                        </p>
                      </div>
                      <button
                        onClick={() => setAddresses((prev) => prev.filter((a) => a.id !== addr.id))}
                        className="text-[10px] uppercase tracking-[0.25em] text-white/20 transition-colors hover:text-red-400/60 shrink-0"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))}

                  {/* Add address form */}
                  <AnimatePresence>
                    {addingAddress && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleAddAddress}
                        className="overflow-hidden rounded-2xl border border-[#ffbf50]/15 bg-[#ffbf50]/[0.03] p-6 space-y-4"
                      >
                        <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">New Address</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {[
                            { label: "Label", key: "label", placeholder: "Home / Office" },
                            { label: "Street Address", key: "line1", placeholder: "47 Rue de la Paix" },
                            { label: "City", key: "city", placeholder: "Paris" },
                            { label: "Postal Code", key: "zip", placeholder: "75002" },
                          ].map(({ label, key, placeholder }) => (
                            <div key={key} className="space-y-2">
                              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30">{label}</label>
                              <Input
                                required
                                placeholder={placeholder}
                                value={newAddress[key as keyof typeof newAddress]}
                                onChange={(e) => setNewAddress((p) => ({ ...p, [key]: e.target.value }))}
                                className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button type="submit" className="flex items-center gap-2 rounded-xl border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-6 py-2.5 text-[11px] uppercase tracking-[0.3em] text-[#ffbf50] transition-all hover:bg-[#ffbf50]/20">
                            <Check className="h-3.5 w-3.5" /> Save Address
                          </button>
                          <button type="button" onClick={() => setAddingAddress(false)} className="px-6 py-2.5 text-[11px] uppercase tracking-[0.3em] text-white/25 transition-colors hover:text-white/50">
                            Cancel
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* SECURITY */}
              {tab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 space-y-6"
                >
                  <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Change Password</h2>

                  {pwSaved && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-xl border border-[#ffbf50]/20 bg-[#ffbf50]/5 px-4 py-3"
                    >
                      <Check className="h-3.5 w-3.5 text-[#ffbf50]" />
                      <span className="text-[11px] tracking-[0.2em] text-[#ffbf50]/70">Password updated successfully</span>
                    </motion.div>
                  )}

                  <form onSubmit={handlePasswordSave} className="space-y-4">
                    {[
                      { label: "Current Password", key: "current", placeholder: "••••••••" },
                      { label: "New Password", key: "next", placeholder: "••••••••" },
                      { label: "Confirm New Password", key: "confirm", placeholder: "••••••••" },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">{label}</label>
                        <Input
                          type="password"
                          required
                          placeholder={placeholder}
                          value={pwForm[key as keyof typeof pwForm]}
                          onChange={(e) => setPwForm((p) => ({ ...p, [key]: e.target.value }))}
                          className={`border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em] ${
                            key === "confirm" && pwForm.confirm.length > 0 && pwForm.confirm !== pwForm.next ? "border-red-400/40" : ""
                          }`}
                        />
                      </div>
                    ))}

                    <button
                      type="submit"
                      disabled={pwLoading || (pwForm.confirm.length > 0 && pwForm.confirm !== pwForm.next)}
                      className="group flex items-center gap-3 rounded-xl border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-3 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {pwLoading ? (
                        <span className="flex items-center gap-3">
                          <span className="h-3.5 w-3.5 rounded-full border border-[#ffbf50]/60 border-t-transparent animate-spin" />
                          Updating...
                        </span>
                      ) : (
                        <>Update Password <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></>
                      )}
                    </button>
                  </form>

                  <div className="border-t border-white/5 pt-6 space-y-3">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/20">Danger Zone</h3>
                    <button
                      onClick={() => { logout(); router.push("/"); }}
                      className="flex items-center gap-2 text-xs tracking-[0.2em] text-red-400/40 transition-colors hover:text-red-400/70"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign out of all devices
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
}
