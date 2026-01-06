import React from 'react';
import { Apple, Truck, ShieldCheck, HeartPulse } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-green-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Бидний зорилго: <span className="text-green-600">Шинэхэн жимсийг</span> айл бүрт
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Fruit Market нь Улаанбаатар хотын оршин суугчдад дэлхийн стандартын, 
            эрүүл ахуйн шаардлага хангасан шинэхэн жимсийг хамгийн богино хугацаанд 
            хүргэх зорилготойгоор байгуулагдсан.
          </p>
        </div>
      </section>

      {/* 2. Our Story / Detail Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Яагаад биднийг сонгох вэ?</h2>
            <p className="text-slate-600 leading-relaxed">
              Монгол орны нөхцөлд жимс жимсгэний шинжилгээ, тээвэрлэлт, хадгалалт нь хамгийн чухал байдаг. 
              Бид импортын жимсийг ирсэн даруйд нь чанарын хяналт хийж, зориулалтын хөргүүртэй 
              агуулахад хадгалдаг.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Таны захиалсан багц бүрийг манай ажилчид нэг бүрчлэн шалгаж, хамгийн шинэ, 
              амттайг нь сонгон савлаж, таны хаалган дээр хүргэж өгөх болно.
            </p>
          </div>
          {/* Placeholder for an Image */}
          <div className="bg-slate-200 rounded-3xl h-80 flex items-center justify-center text-slate-500 italic">
            [Агуулах эсвэл шинэ жимсний зураг]
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Бидний үнэт зүйлс</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-green-600 mb-4">{value.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-green-600 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Өнөөдөр эрүүл мэнддээ хөрөнгө оруулалт хий</h2>
          <p className="mb-8 opacity-90">Манай багц болон жимснүүдээс сонголтоо хийж, хүргүүлээд аваарай.</p>
          <div className="flex justify-center gap-4">
            <a href="/fruit" className="bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition">
              Жимс үзэх
            </a>
            <a href="/bundle" className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition border border-green-500">
              Багц үзэх
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const values = [
  {
    icon: <Apple size={40} />,
    title: "Дээд зэргийн чанар",
    desc: "Бид зөвхөн хамгийн шинэ, амт чанар сайтай жимсийг сонгож хэрэглэгчиддээ хүргэдэг."
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Аюулгүй байдал",
    desc: "Хүнсний аюулгүй байдал, эрүүл ахуйн стандартыг чанд баримтлан ажилладаг."
  },
  {
    icon: <Truck size={40} />,
    title: "Хурдан хүргэлт",
    desc: "Улаанбаатар хот дотор таны захиалгыг 24 цагийн дотор найдвартай хүргэж өгнө."
  },
  {
    icon: <HeartPulse size={40} />,
    title: "Эрүүл мэнд",
    desc: "Гэр бүлийнхээ эрүүл мэндэд анхаарч буй хүн бүрт хамгийн сайн туслагч байна."
  }
];

export default AboutPage;