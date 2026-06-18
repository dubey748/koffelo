"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";
import toast from "react-hot-toast";
import Nav from "../components/nav";

const addressTypes = ["Home", "Work", "Other"];

export default function AccountPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("Home");

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get(ENDPOINT.GET_ADDRESS);
      setAddresses(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEdit = (address: any) => {
    setEditingId(address.addressId);
    setEditData({ ...address });
    setSelectedType(address.addressType || "Home");
  };

  const handleEditChange = (e: any) => {
    setEditData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (id: any) => {
    // Validation (same as dialog)
    if (!editData.name || editData.name.trim().length < 2) {
      toast.error("Please enter a valid name.");
      return;
    }
    if (!editData.phoneNo || editData.phoneNo.trim().length < 2) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!editData.addressLine1 || editData.addressLine1.trim().length < 2) {
      toast.error("Please enter a valid house/building number.");
      return;
    }
    if (!editData.addressLine2 || editData.addressLine2.trim().length < 2) {
      toast.error("Please enter a valid road/area/colony name.");
      return;
    }
    if (!editData.city || editData.city.trim().length < 2) {
      toast.error("Please enter a valid city name.");
      return;
    }
    if (!editData.state || editData.state.trim().length < 2) {
      toast.error("Please enter a valid state name.");
      return;
    }
    if (!editData.postalCode || !/^\d{6}$/.test(editData.postalCode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!editData.country || editData.country.trim().length < 2) {
      toast.error("Please enter a valid country name.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: editData.name,
        phoneNo: editData.phoneNo,
        addressLine1: editData.addressLine1,
        addressLine2: editData.addressLine2,
        city: editData.city,
        state: editData.state,
        postalCode: editData.postalCode,
        country: editData.country,
        isDefault: true,
        type: selectedType,
      };
      await axiosInstance.put(`${ENDPOINT.GET_ADDRESS}/${id}`, payload);
      toast.success("Address updated");
      setEditingId(null);
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;
    setLoading(true);
    try {
      await axiosInstance.delete(`${ENDPOINT.GET_ADDRESS}/${id}`);
      toast.success("Address deleted");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1E9]">
      <Nav />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#4A4A4A]">My Address</h1>
        {addresses.length === 0 && (
          <div className="text-gray-500">No addresses found.</div>
        )}
        {addresses.map((address: any) => {
          const id = address.addressId;
          const isEditing = editingId === id;
          return (
            <div
              key={id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6"
            >
              {isEditing ? (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(id);
                  }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm text-[#523A3C] font-medium">
                      Save as *
                    </span>
                    <div className="flex items-center space-x-3">
                      {addressTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`px-4 py-2 rounded-md text-sm font-medium border ${
                            selectedType === type
                              ? "bg-[#8B7355] text-white border-[#8B7355]"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                          disabled={loading}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={editData.name || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="Name *"
                    disabled={loading}
                    maxLength={255}
                  />
                  <input
                    type="tel"
                    name="phoneNo"
                    value={editData.phoneNo || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="Phone No. *"
                    maxLength={15}
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="addressLine1"
                    value={editData.addressLine1 || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="House No., Building Name *"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={editData.addressLine2 || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="Road Name, Area, Colony *"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="city"
                    value={editData.city || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="City *"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="state"
                    value={editData.state || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="State *"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={editData.postalCode || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="Pincode *"
                    maxLength={6}
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="country"
                    value={editData.country || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 text-base border rounded-md"
                    style={{ borderColor: "#8B7355" }}
                    placeholder="Country *"
                    disabled={loading}
                  />
                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="bg-[#8B5E3C] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition font-semibold"
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition font-semibold"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm text-[#523A3C] font-medium">
                      Saved as:
                    </span>
                    <span className="px-4 py-2 rounded-md text-sm font-medium border bg-[#8B7355] text-white border-[#8B7355]">
                      {address.type || "Home"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        Name
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.name || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        Phone No.
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.phoneNo || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        House/Building No.
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.addressLine1 || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        Road/Area/Colony
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.addressLine2 || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        City
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.city || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        State
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.state || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        Pincode
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.postalCode || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">
                        Country
                      </span>
                      <span className="text-base text-[#4A4A4A]">
                        {address.country || (
                          <span className="text-gray-300">-</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(address)}
                      className="bg-[#8B5E3C] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition font-semibold"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition font-semibold"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
