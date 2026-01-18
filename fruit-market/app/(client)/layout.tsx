// app/(client)/layout.tsx
import NavBar from "@/components/shared/navbar/navbar";
import Footer from "@/components/shared/footer/footer";
import MobileNav from "@/components/shared/navbar/mobile-nav"; // Import here

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="bg-[#F8F9FA] min-h-screen pb-20 sm:pb-0"> 
        {/* Added pb-20 to ensure content isn't hidden behind the mobile nav */}
        {children}
      </main>
      <MobileNav /> {/* Add here */}
      <Footer />
    </>
  );
}