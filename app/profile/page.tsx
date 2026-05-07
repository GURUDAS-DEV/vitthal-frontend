"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Building2,
  LogOut,
  ChevronRight,
  Package,
  Edit2,
  Camera,
  X,
  Check,
  MapPin,
  Heart,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

type Address = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude: number;
  longitude: number;
};

type ClientDetails = {
  user_id: string;
  user_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
};

export default function ProfilePage() {
  const { user, fetchUser, logout } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Client details from backend
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  // Setup Prompt State
  const [isSetupComplete, setIsSetupComplete] = useState(true);

  // Address management (Single address for client)
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    latitude: null as number | null,
    longitude: null as number | null,
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Fetch client details from backend
  useLayoutEffect(() => {
    async function fetchClientDetails() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/client/clientDetails`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "x-request-from": "client",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setClientDetails(data.data);

          if (data.data?.phone) setEditPhone(data.data.phone);

          if (data.data?.address) {
            setAddressForm({
              address: data.data.address,
              city: data.data.city,
              state: data.data.state,
              country: data.data.country,
              pincode: data.data.pincode,
              latitude: data.data.latitude || null,
              longitude: data.data.longitude || null,
            });
          }
        } else if (response.status === 404) {
          // If client details not found, it means they haven't set up their profile
          setIsSetupComplete(false);
        }
      } catch (error) {
        console.error("Failed to fetch client details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchClientDetails();
  }, []);

  useEffect(() => {
    if (user) {
      setEditName(user.username);
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
    setEditPhone(clientDetails?.phone || "");
  }

  async function handleSave() {
    if (!isSetupComplete) {
      toast.error("Please set up your profile first");
      return;
    }

    try {
      let updated = false;

      if (editPhone !== clientDetails?.phone) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/client/updateClientNumber`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-request-from": "client",
            },
            credentials: "include",
            body: JSON.stringify({ phone: editPhone }),
          },
        );

        if (!response.ok) throw new Error("Failed to update phone number");

        setClientDetails((prev) =>
          prev ? { ...prev, phone: editPhone } : null,
        );
        updated = true;
      }

      if (editName !== user?.username) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-name`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-request-from": "client",
            },
            credentials: "include",
            body: JSON.stringify({ name: editName }),
          },
        );

        if (!response.ok) throw new Error("Failed to update name");

        await fetchUser();
        setClientDetails((prev) =>
          prev ? { ...prev, user_name: editName } : null,
        );
        updated = true;
      }

      setIsEditing(false);
      if (updated) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAddressForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setIsGettingLocation(false);
        toast.success("Location captured successfully!");
      },
      (error) => {
        setIsGettingLocation(false);
        toast.error("Failed to get location. Please enable location services.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  async function handleUpdateAddress() {
    try {
      if (
        !addressForm.address ||
        !addressForm.city ||
        !addressForm.state ||
        !addressForm.country ||
        !addressForm.pincode
      ) {
        toast.error("All address fields are required");
        return;
      }

      if (addressForm.latitude === null || addressForm.longitude === null) {
        toast.error("Please capture your location coordinates");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/client/updateClientAddress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-request-from": "client",
          },
          credentials: "include",
          body: JSON.stringify(addressForm),
        },
      );

      if (response.ok) {
        toast.success("Address updated successfully");
        const data = await response.json();

        setClientDetails((prev) =>
          prev
            ? {
                ...prev,
                address: data.address.address,
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                pincode: data.address.pincode,
                latitude: data.address.latitude,
                longitude: data.address.longitude,
              }
            : null,
        );

        setIsEditingAddress(false);
      } else {
        toast.error("Failed to update address");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
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

  if (isLoading) {
    return (
      <div className="flex-1 bg-zinc-50 flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#1d4ed8]" />
      </div>
    );
  }

  return (
    <main className="flex-1 bg-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800 font-medium">My Profile</span>
        </nav>

        {!isSetupComplete && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-600 mt-1 sm:mt-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  Complete Your Profile
                </h3>
                <p className="text-sm text-zinc-600 mt-1">
                  You haven't set up your profile yet. Please set it up to add
                  your phone number and delivery address.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/profile/setup")}
              className="whitespace-nowrap px-6 py-2.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-sm"
            >
              Set Up Profile
            </button>
          </div>
        )}

        {/* Orders & Saved Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link
            href="/orders"
            className="flex items-center justify-between p-5 rounded-xl border border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                <Package size={24} />
              </div>
              <div>
                <p className="font-semibold text-zinc-900">My Orders</p>
                <p className="text-xs text-zinc-500">View your order history</p>
              </div>
            </div>
            <ChevronRight
              size={20}
              className="text-zinc-400 group-hover:text-zinc-600"
            />
          </Link>

          <Link
            href="/wishlist"
            className="flex items-center justify-between p-5 rounded-xl border border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-100 transition-colors">
                <Heart size={24} />
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Saved Products</p>
                <p className="text-xs text-zinc-500">Your wishlist items</p>
              </div>
            </div>
            <ChevronRight
              size={20}
              className="text-zinc-400 group-hover:text-zinc-600"
            />
          </Link>
        </div>

        {/* Profile Header Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="h-28 bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6]" />

          <div className="px-6 pb-6 sm:px-8">
            {/* Avatar + Info Row */}
            <div className="-mt-14 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
              <div className="relative group">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-zinc-100 text-zinc-600 shadow-lg overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={40} />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={20} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1 text-center sm:text-left pb-5">
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-xl font-bold text-white border-b-2 border-white/50 focus:border-white focus:outline-none bg-transparent text-center sm:text-left w-full sm:w-auto placeholder-white/50"
                    placeholder="Your Name"
                  />
                ) : (
                  <h1 className="text-xl font-bold text-white">
                    {user?.username || "Guest User"}
                  </h1>
                )}
                <p className="text-sm text-zinc-500 mt-0.5">
                  {user?.email || "—"}
                </p>
              </div>

              <button
                onClick={isEditing ? handleSave : handleEdit}
                disabled={!isSetupComplete}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            {/* Account Information */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-zinc-900">
                  Account Details
                </h2>
                {isEditing && isSetupComplete && (
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors text-sm"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                )}
              </div>

              {!isSetupComplete && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    Please{" "}
                    <Link
                      href="/profile/setup"
                      className="font-semibold underline hover:text-amber-900"
                    >
                      set up your profile
                    </Link>{" "}
                    first to edit your account details.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                    <User size={14} />
                    Full Name
                  </div>
                  {isEditing && isSetupComplete ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full text-sm font-medium text-zinc-900 border-b border-zinc-300 focus:outline-none focus:border-[#1d4ed8] bg-transparent py-1"
                      placeholder="Your Name"
                    />
                  ) : (
                    <p className="text-sm font-medium text-zinc-900">
                      {user?.username || "—"}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                    <Mail size={14} />
                    Email Address
                  </div>
                  <p className="text-sm font-medium text-zinc-900">
                    {user?.email || "—"}
                  </p>
                </div>

                {/* Phone */}
                <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                    <Phone size={14} />
                    Phone Number
                  </div>
                  {isEditing && isSetupComplete ? (
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full text-sm font-medium text-zinc-900 border-b border-zinc-300 focus:outline-none focus:border-[#1d4ed8] bg-transparent py-1"
                      placeholder="Add phone number"
                    />
                  ) : (
                    <p className="text-sm font-medium text-zinc-900">
                      {clientDetails?.phone || "—"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-6 pt-6 border-t border-zinc-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-zinc-900">
                  Delivery Address
                </h2>
                {isSetupComplete && !isEditingAddress && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors text-sm"
                  >
                    <Edit2 size={14} />
                    Edit Address
                  </button>
                )}
              </div>

              {/* Edit Address Form */}
              {isEditingAddress && isSetupComplete ? (
                <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 space-y-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-zinc-900">
                      Update Address
                    </h3>
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="p-1 rounded hover:bg-zinc-200 text-zinc-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 mb-1 block">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={addressForm.address}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-[#1d4ed8]"
                      placeholder="Enter street address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">
                        City
                      </label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-[#1d4ed8]"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">
                        State
                      </label>
                      <input
                        type="text"
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-[#1d4ed8]"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">
                        Country
                      </label>
                      <input
                        type="text"
                        value={addressForm.country}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-[#1d4ed8]"
                        placeholder="Country"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={addressForm.pincode}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            pincode: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-[#1d4ed8]"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 mb-1 block">
                      Location Coordinates
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={isGettingLocation}
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                      >
                        {isGettingLocation ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <MapPin size={16} />
                        )}
                        {addressForm.latitude
                          ? "Update Location"
                          : "Capture Location"}
                      </button>
                    </div>
                    {addressForm.latitude && addressForm.longitude && (
                      <p className="mt-2 text-xs text-green-600 font-medium">
                        Coordinates: {addressForm.latitude.toFixed(6)},{" "}
                        {addressForm.longitude.toFixed(6)}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleUpdateAddress}
                      className="flex-1 py-2 rounded-lg bg-[#1d4ed8] text-white text-sm font-medium hover:bg-[#1e40af] transition-colors"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : clientDetails?.address ? (
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">
                        {clientDetails.address}
                      </p>
                      <p className="text-sm text-zinc-600 mt-0.5">
                        {clientDetails.city}, {clientDetails.state} -{" "}
                        {clientDetails.pincode}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {clientDetails.country}
                      </p>
                      {clientDetails.latitude && clientDetails.longitude && (
                        <p className="text-xs text-zinc-400 mt-1">
                          📍 {clientDetails.latitude}, {clientDetails.longitude}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center">
                  <MapPin size={32} className="mx-auto text-zinc-300 mb-2" />
                  <p className="text-sm text-zinc-500">No address saved yet</p>
                  <button
                    onClick={() => router.push("/profile/setup")}
                    className="mt-2 text-[#1d4ed8] text-sm font-medium hover:underline"
                  >
                    Set up your profile to add address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium text-sm"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </main>
  );
}
