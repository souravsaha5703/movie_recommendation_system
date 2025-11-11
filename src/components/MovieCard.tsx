import React from 'react';
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MovieCardProps {
    title: string;
    rating: number;
    posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, rating, posterUrl }) => {
    return (
        <Card className="w-52 h-96 p-0 overflow-hidden bg-neutral-800 border-0 rounded-md cursor-pointer">
            <div className="w-full h-80 overflow-hidden">
                <img
                    src={posterUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="px-4 py-2 flex flex-col items-start justify-start">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium font-noto">{rating}</span>
                    </div>
                </div>
                <h3 className="font-medium text-base font-noto text-slate-50 mb-2 line-clamp-1">{title}</h3>
            </div>
        </Card>
    )
}

export default MovieCard;