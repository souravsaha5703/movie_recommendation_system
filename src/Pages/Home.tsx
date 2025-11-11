import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clapperboard } from 'lucide-react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import PostersCarousal from '@/components/PostersCarousal';
import MovieCard from '@/components/MovieCard';
import Loader from '@/components/Loader';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  rating: number;
  posterUrl: string;
}

interface Error {
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [movieName, setMovieName] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMoviesAvailable, setIsMoviesAvailable] = useState<boolean>(false);
  const [erroOccured, setErrorOccured] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRecommendationBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (movieName == '') {
      alert("Please provide a valid movie name")
    } else {
      setErrorOccured(false);
      setIsMoviesAvailable(true);
      setLoading(true);
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOCAL_API}/recommend_movies/${movieName}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          }
        );

        setErrorOccured(false);
        setMovies(response.data.recommendations);
        setLoading(false);
      } catch (error) {
        setError({
          title: "Something went wrong",
          description: "Error in fetching the recommendations"
        });
        setErrorOccured(true);
        setLoading(false);
      }
    }
  }

  return (
    <>
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
          }}
        />
        <div className='relative w-full z-10'>
          <Navbar />
          <section className="relative w-full min-h-screen flex flex-col items-center justify-center space-y-5 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
              className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%">
                <Clapperboard className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ease: 'easeOut', duration: 0.5, delay: 0.1 }}
              className="text-4xl text-center font-noto font-semibold text-slate-50">
              Great Movies Deserve the Right Audience.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ease: 'easeOut', duration: 0.5, delay: 0.2 }}
              className="text-gray-400 font-noto font-normal text-center text-base max-w-2xl mx-auto">
              A visually immersive journey where each recommendation is thoughtfully chosen, capturing the essence of what you love to watch
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ease: 'easeOut', duration: 0.5, delay: 0.3 }}
              className="w-2xl mx-auto"
            >
              <div className="flex gap-3 items-center bg-card/10 backdrop-blur-sm p-2 rounded-lg border border-border/50 shadow-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    placeholder="Search by movie e.g. Top Gun: Maverick"
                    className="pl-12 h-12 bg-background/90 outline-0 border-0 focus-visible:ring-1 focus-visible:ring-slate-950 font-noto font-medium text-black text-lg placeholder:text-slate-600 placeholder:font-normal"
                  />
                </div>
                <Button disabled={loading} onClick={handleRecommendationBtn} className='h-12 bg-slate-950 text-slate-50 font-noto text-sm font-normal cursor-pointer hover:bg-slate-900'>Show Recommendation</Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ ease: 'easeOut', duration: 0.5, delay: 0.4 }}
              className='mx-auto'
            >
              <PostersCarousal />
            </motion.div>
          </section>
          {isMoviesAvailable && <section className="relative w-full max-h-screen flex flex-col items-center justify-center space-y-5 overflow-hidden py-10" id='result'>
            <h1 className='text-center text-slate-50 font-noto text-4xl'>Top Movie Recommendations</h1>
            {loading ? (
              <div className='w-full h-full mt-5 flex flex-col gap-4 items-center justify-center'>
                <Loader />
                <span className='text-xl text-center font-noto text-slate-200'>Your recommendations loading!</span>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {erroOccured ? (
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-slate-100 font-noto text-lg text-center'>{error?.title}</h3>
                    <p className='text-slate-300 font-noto text-base text-center'>{error?.description}</p>
                  </div>
                ) : (
                  movies && movies.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <MovieCard key={movie.id} posterUrl={movie.posterUrl} rating={movie.rating} title={movie.title} />
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </section>}
        </div>
      </div>
    </>
  )
}

export default Home;