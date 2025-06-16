export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-500 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-500 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
