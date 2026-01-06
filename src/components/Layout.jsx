import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
            <Toaster position="bottom-right" />
        </div>
    );
}
