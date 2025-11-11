import React from 'react';
import { Card } from './ui/card';

interface PosterCardsCarousalProps {
    posterUrl: string
}

const PosterCards: React.FC<PosterCardsCarousalProps> = ({ posterUrl }) => {
    return (
        <Card className="w-44 h-64 p-0 overflow-hidden bg-card rounded-md">
            <div className="relative w-full h-full overflow-hidden">
                <img
                    src={posterUrl}
                    alt={"Random Movie Poster"}
                    className="w-full h-full object-cover"
                />
            </div>
        </Card>
    )
}

export default PosterCards;