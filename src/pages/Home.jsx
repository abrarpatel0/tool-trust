import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTools } from '../services/firestore';
import ToolCard from '../components/ToolCard';
import { ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';

export default function Home() {
    const [recentTools, setRecentTools] = useState([]);

    useEffect(() => {
        async function fetchTools() {
            try {
                const tools = await getAllTools();
                setRecentTools(tools.slice(0, 3)); // Show only 3 recent tools
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        }
        fetchTools();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-blue-600 rounded-3xl overflow-hidden shadow-xl mb-16 relative">
                <div className="absolute inset-0 bg-blue-600/20 pattern-dots"></div>
                <div className="container mx-auto px-6 py-20 relative z-10 text-center md:text-left md:flex items-center justify-between">
                    <div className="md:w-1/2 text-white mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Rent Tools from Your <br /> Neighbors.
                        </h1>
                        <p className="text-blue-100 text-lg mb-8 max-w-lg">
                            Save money by renting tools you need for a fraction of the cost.
                            Or earn extra cash by listing tools collecting dust in your garage.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/tools"
                                className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg flex justify-center items-center"
                            >
                                Browse Tools
                            </Link>
                            <Link
                                to="/add-tool"
                                className="bg-blue-700 hover:bg-blue-800 text-white border border-blue-500 px-8 py-3 rounded-lg font-bold text-lg transition-colors flex justify-center items-center"
                            >
                                List Your Tools
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative hidden md:block">
                        {/* Abstract visual or illustration can go here */}
                        <div className="relative w-full max-w-md mx-auto aspect-square bg-blue-500/30 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <img
                            src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Tool Rental"
                            className="relative rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Tool Trust?</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">We make renting tools simple, secure, and beneficial for everyone involved.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <ShieldCheck className="h-10 w-10 text-emerald-500" />,
                            title: "Secure Rentals",
                            desc: "Verified users and secure payments ensure your peace of mind."
                        },
                        {
                            icon: <Zap className="h-10 w-10 text-amber-500" />,
                            title: "Instant Booking",
                            desc: "Find what you need and book it instantly without the hassle."
                        },
                        {
                            icon: <Heart className="h-10 w-10 text-rose-500" />,
                            title: "Community Driven",
                            desc: "Help your neighbors and build a stronger local community."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-slate-50 rounded-full mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Listings */}
            <section className="mb-20">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Recent Listings</h2>
                        <p className="text-slate-600">Fresh tools just added to the platform.</p>
                    </div>
                    <Link to="/tools" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentTools.length > 0 ? (
                        recentTools.map(tool => <ToolCard key={tool.id} tool={tool} />)
                    ) : (
                        <div className="col-span-3 text-center py-10 bg-slate-50 rounded-lg">
                            <p className="text-slate-500">No tools listed yet. Be the first!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
