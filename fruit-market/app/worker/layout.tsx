export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}