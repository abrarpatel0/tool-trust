import React, { useEffect, useState } from 'react';
import { getAllTools } from '../services/firestore';
import ToolCard from '../components/ToolCard';
import { Search, Filter } from 'lucide-react';

export default function ToolList() {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const categories = [
        'Power Tools',
        'Hand Tools',
        'Gardening',
        'Automotive',
        'Cleaning',
        'Ladders & Scaffolding',
        'Other'
    ];

    useEffect(() => {
        async function fetchTools() {
            try {
                const allTools = await getAllTools();
                setTools(allTools);
            } catch (error) {
                console.error('Error loading tools:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTools();
    }, []);

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? tool.category === categoryFilter : true;

        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <div className="bg-slate-900 text-white p-8 rounded-2xl mb-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Find the Right Tool</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-slate-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="md:w-1/4 relative">
                        <Filter className="absolute left-3 top-3 text-slate-400 h-5 w-5" />
                        <select
                            className="w-full pl-10 pr-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-lg text-slate-500">Loading tools...</p>
                </div>
            ) : (
                <>
                    <p className="text-slate-500 mb-6">Showing {filteredTools.length} results</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTools.length > 0 ? (
                            filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                                <p className="text-xl text-slate-600 font-medium">No tools found matching your criteria.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setCategoryFilter(''); }}
                                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
