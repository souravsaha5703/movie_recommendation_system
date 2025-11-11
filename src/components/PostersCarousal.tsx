import React from 'react';
import { motion } from 'motion/react';
import { cn } from "@/lib/utils";
import PosterCards from '@/components/PosterCards';
import image1 from '@/assets/images/image1.jpg';
import image2 from '@/assets/images/image2.jpg';
import image3 from '@/assets/images/image3.jpg';
import image4 from '@/assets/images/image4.jpg';
import image5 from '@/assets/images/image5.jpg';
import image6 from '@/assets/images/image6.jpg';
import image7 from '@/assets/images/image7.jpg';
import image8 from '@/assets/images/image8.jpg';
import image9 from '@/assets/images/image9.jpg';
import image10 from '@/assets/images/image10.jpg';

interface PostersCarousalProps {
    className?: string;
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
}

const samplePoster: string[] = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

const PostersCarousal: React.FC<PostersCarousalProps> = ({ className, direction = "left", speed = "normal", }) => {

    const speedMap = {
        slow: 40,
        normal: 30,
        fast: 20,
    };

    const duplicatedPosters = [...samplePoster, ...samplePoster];

    return (
        <div className={cn("relative flex w-full overflow-hidden py-6", className)}>
            <motion.div
                className="flex gap-4"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speedMap[speed],
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                {duplicatedPosters.map((poster, index) => (
                    <PosterCards key={index} posterUrl={poster} />
                ))}
            </motion.div>
        </div>
    );
}

export default PostersCarousal;