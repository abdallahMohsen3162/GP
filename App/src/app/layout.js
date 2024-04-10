"use client"
import 'bootstrap/dist/css/bootstrap.min.css';

import "../style/globals.css";
import { Inter } from 'next/font/google'
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []); 
   return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
