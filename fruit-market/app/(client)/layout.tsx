// app/(client)/layout.tsx
import NavBar from "@/components/shared/navbar/navbar";
import Footer from "@/components/shared/footer/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main>
        {children}
      </main>
      {/* You can add a Footer here later */}
      <Footer></Footer>
    </>
  );
}