import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
        <Leaf className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">404 - Evidence Not Found</h2>
      <p className="text-sm text-slate-600 mt-2 max-w-md">
        The requested environmental asset or project record could not be located in the VeriTerra registry.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
      >
        Return to Overview Dashboard
      </Link>
    </div>
  );
}
