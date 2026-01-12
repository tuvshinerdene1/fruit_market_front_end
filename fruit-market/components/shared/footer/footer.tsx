import Link from "next/link"
import { Facebook, Instagram, Phone, MapPin, Clock, Divide } from "lucide-react";

export default function Footer(){
    const currentyear = new Date().getFullYear();
return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Fruit Market</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Шинэхэн жимсийг таны гарт. Бид өдөр бүр хамгийн чанартай, амттай жимсийг Улаанбаатар хот даяар хүргэж байна.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Холбоосууд</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/fruit" className="hover:text-green-600 transition">Бүх жимс</Link></li>
              <li><Link href="/bundle" className="hover:text-green-600 transition">Багцууд</Link></li>
              <li><Link href="/about" className="hover:text-green-600 transition">Бидний тухай</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info (UB Focus) */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Холбоо барих</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-green-600" />
                <a href="tel:97699112233" className="hover:underline">+976 9911-2233</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-green-600 mt-1 shrink-0" />
                <span>Улаанбаатар хот, БЗД, 26-р хороо</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-green-600" />
                <span>09:00 - 21:00 (Өдөр бүр)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Дагаж мөрдөх</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full text-blue-600 hover:bg-blue-50 transition shadow-sm">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full text-pink-600 hover:bg-pink-50 transition shadow-sm">
                <Instagram size={20} />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400 italic">
              Шинэ ургац, хямдралын мэдээллийг цаг алдалгүй аваарай.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {currentyear} Fruit Market MN. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          
          {/* Subtle Staff Link as we discussed */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-4">
              Ажилтны нэвтрэх
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

