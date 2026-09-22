import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electrical Engineering Fleet',
  description: 'Bridging the Scarcity Gap in Power Engineering',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

