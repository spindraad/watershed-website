export default function Header() {
  return (
    <div className="h-24 border-b-4 border-b-secondary">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-secondary">
            App
          </a>
        </div>
        <div className="flex items-center">
          <a href="/login" className="text-secondary">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
