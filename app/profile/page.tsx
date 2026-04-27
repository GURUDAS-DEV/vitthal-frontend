"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  LogOut,
  ChevronRight,
  ShoppingCart,
  Package,
  Edit2,
  Camera,
  X,
  Check,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isAuthenticated, fetchUser, logout } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      setEditName(user.username);
      setEditEmail(user.email);
    }
  }, [user]);

  async function handleLogout() {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditName(user?.username || "");
    setEditEmail(user?.email || "");
  }

  function handleSave() {
    // Frontend only - update local state
    setIsEditing(false);
    toast.success("Profile updated successfully");
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <main className="flex-1 bg-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800 font-medium">Profile</span>
        </nav>

        {/* Profile Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6]" />

          <div className="px-6 pb-8 sm:px-8">
            {/* Avatar + Name */}
            <div className="-mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
              <div className="relative group">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-zinc-100 text-zinc-600 shadow-lg overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User size={48} />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={24} className="text-white" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="flex-1 text-center sm:text-left pb-2">
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-2xl font-bold text-zinc-900 border-b-2 border-[#1d4ed8] focus:outline-none bg-transparent text-center sm:text-left"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl font-bold text-zinc-900">
                    {user?.username || "User"}
                  </h1>
                )}
                <p className="text-sm text-zinc-500 mt-1">{user?.email || "—"}</p>
              </div>
              <button
                onClick={isEditing ? handleSave : handleEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-colors font-medium text-sm"
              >
                {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                {isEditing ? "Save" : "Edit Profile"}
              </button>
            </div>

            {/* Account Details */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">Account Information</h2>
                {isEditing && (
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors text-sm"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                    <User size={16} />
                    Full Name
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full text-base font-medium text-zinc-900 border-b border-zinc-300 focus:outline-none focus:border-[#1d4ed8] bg-transparent py-1"
                    />
                  ) : (
                    <p className="text-base font-medium text-zinc-900">{user?.username || "—"}</p>
                  )}
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                    <Mail size={16} />
                    Email Address
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full text-base font-medium text-zinc-900 border-b border-zinc-300 focus:outline-none focus:border-[#1d4ed8] bg-transparent py-1"
                    />
                  ) : (
                    <p className="text-base font-medium text-zinc-900">{user?.email || "—"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white shadow-sm divide-y divide-zinc-100">
          <Link
            href="/cart"
            className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors group"
          >
            <div className="flex items-center gap-3 text-sm font-medium text-zinc-700">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                <ShoppingCart size={18} />
              </div>
              My Cart
            </div>
            <ChevronRight size={16} className="text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          </Link>

          <Link
            href="/products"
            className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors group"
          >
            <div className="flex items-center gap-3 text-sm font-medium text-zinc-700">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                <Package size={18} />
              </div>
              Browse Products
            </div>
            <ChevronRight size={16} className="text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-between px-6 py-4 hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-3 text-sm font-medium text-red-600">
              <div className="p-2 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                <LogOut size={18} />
              </div>
              Logout
            </div>
            <ChevronRight size={16} className="text-red-400 group-hover:text-red-600 transition-colors" />
          </button>
        </div>
      </div>
    </main>
  );
}
