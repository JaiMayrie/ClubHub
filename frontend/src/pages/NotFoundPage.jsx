import { Link } from 'react-router-dom';
import NavHeader from '../components/NavHeader';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-8xl font-bold text-purdue-gold mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-purdue-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-purdue-gold-dark transition-colors"
          >
            Go home
          </Link>
          <Link
            to="/clubs"
            className="bg-white text-black px-6 py-3 rounded-lg font-bold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Browse clubs
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;