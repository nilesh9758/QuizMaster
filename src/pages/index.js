import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
          Welcome to <span className="text-blue-500">QuizMaster</span>
        </h1>

        <div className="flex gap-6 justify-center mt-8">
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="bg-gray-100 text-blue-700 hover:bg-white px-6 py-3 rounded-lg shadow-lg transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
