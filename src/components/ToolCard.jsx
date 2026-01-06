import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

export default function ToolCard({ tool }) {
    // Use first image or a placeholder
    const displayImage = tool.imageUrls && tool.imageUrls.length > 0
        ? tool.imageUrls[0]
        : 'https://placehold.co/400x300?text=No+Image';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                    src={displayImage}
                    alt={tool.toolName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold text-slate-800 shadow-sm">
                    ${tool.pricePerDay}/day
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center text-xs text-blue-600 font-medium mb-1">
                    <Tag size={12} className="mr-1" />
                    {tool.category}
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{tool.toolName}</h3>

                <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
                    {tool.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <Link
                        to={`/tools/${tool.id}`}
                        className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded-lg transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
