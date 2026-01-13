import {User, Phone, MapPin, MessageSquare} from "lucide-react"
import React from "react";
import { ChangeEvent } from "react";

type FormChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

interface DeliveryFormProps{
    formData:{
        name:string;
        phone:string;
        district:string;
        address: string;
        note:string;
    };
    handleInputChange:(e:FormChangeEvent) => void;
    isPickUp: boolean;
    setIsPickup: (val: boolean) => void;
}

export default function DeliveryForm({
    formData,
    handleInputChange,
    isPickUp,
    setIsPickup,
}:DeliveryFormProps){
     return (
    <section>
      <div className="flex items-baseline mb-6 border-b border-stone-100 pb-4">
        <h2 className="text-2xl font-black text-slate-900">2. Хүлээн авах мэдээлэл</h2>
      </div>

      {/* Pickup/Delivery Toggle */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setIsPickup(false)}
          className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
            !isPickUp ? "border-slate-900 bg-slate-900 text-white" : "border-stone-100 bg-stone-50 text-stone-500"
          }`}
        >
          Хүргүүлж авах
        </button>
        <button
          onClick={() => setIsPickup(true)}
          className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
            isPickUp ? "border-slate-900 bg-slate-900 text-white" : "border-stone-100 bg-stone-50 text-stone-500"
          }`}
        >
          Очиж авах
        </button>
      </div>

      {/* Input Fields */}
      <div className="bg-stone-50/50 p-8 rounded-[2rem] border border-stone-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2">
              <User size={14} /> Хүлээн авагчийн нэр
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Нэрээ оруулна уу"
              className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2">
              <Phone size={14} /> Утасны дугаар
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="88******"
              className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-white"
            />
          </div>
        </div>

        {/* Address Logic */}
        {!isPickUp ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2">
                <MapPin size={14} /> Дүүрэг
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option>Сүхбаатар</option>
                <option>Баянзүрх</option>
                <option>Чингэлтэй</option>
                <option>Хан-Уул</option>
                <option>Баянгол</option>
                <option>Сонгинохайрхан</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2">
                <MapPin size={14} /> Дэлгэрэнгүй хаяг
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                placeholder="Байр, орц, тоот..."
                className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>
          </div>
        ) : (
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-sm text-green-800">
            <p className="font-bold mb-1">Очиж авах хаяг:</p>
            <p>Сүхбаатар дүүрэг, Саруул захын 1-р давхар, 3-р павильон</p>
          </div>
        )}

        <div className="space-y-2 pt-2 border-t border-stone-100">
          <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2">
            <MessageSquare size={14} /> Нэмэлт тэмдэглэл (заавал биш)
          </label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder="Код, хаалганы мэдээлэл г.м"
            className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
          />
        </div>
      </div>
    </section>
  );
}