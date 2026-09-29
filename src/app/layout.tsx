import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Terraframe AI — Impact & Sustainability Media Platform',
  description: 'AI-powered media intelligence platform powered by Cloudinary. Transforming field photos and videos into verifiable environmental evidence, measurable before/after impact, and ESG audit reports.',
  keywords: ['Terraframe', 'Cloudinary', 'Sustainability', 'ESG Audit', 'Environmental Intelligence', 'Before After Verification', 'UN SDG', 'Wise Design'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#ffffff] text-[#454745] font-sans antialiased selection:bg-[#9fe870] selection:text-[#163300]">
        {children}
      </body>
    </html>
  );
}
