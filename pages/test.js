export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">Test Page</h1>
      
      {/* Simple background effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black"></div>
      </div>
    </div>
  );
}
