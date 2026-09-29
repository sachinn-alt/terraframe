import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Terraframe AI — Impact & Sustainability Media Platform',
  description: 'AI-powered media intelligence platform powered by Cloudinary. Transforming field photos and videos into verifiable environmental evidence, measurable before/after impact, and ESG audit reports.',
  keywords: ['Terraframe', 'Cloudinary', 'Sustainability', 'ESG Audit', 'Environmental Intelligence', 'Before After Verification', 'UN SDG'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
