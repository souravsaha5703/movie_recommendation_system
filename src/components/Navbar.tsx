import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github } from 'lucide-react';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header className='w-full fixed top-5 left-0 flex items-center justify-center z-50'>
                <motion.nav
                    transition={{ duration: 0.5, ease: "linear" }}
                    className={`w-[800px] py-4 px-7 ${isScrolled ? "bg-slate-100/15 backdrop-blur-md shadow-md rounded-3xl" : "bg-transparent"}`}>
                    <div className='w-full flex items-center justify-between'>
                        <div className='flex gap-2 items-center justify-center'>
                            <Film className='text-slate-50' />
                            <Link to={'/'} target='' className='font-oswald font-bold text-slate-50 text-2xl cursor-pointer'>CineMatch</Link>
                        </div>
                        <a target='_blank' href={"https://github.com/souravsaha5703/hear-medicine"}><Github className='text-slate-50 cursor-pointer' /></a>
                    </div>
                </motion.nav>
            </header >
        </>
    )
}

export default Navbar;