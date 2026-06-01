import type { ReactNode } from 'react';
import { UserContext } from '@/context/UserContext';
import { CART_KEY, FAVORITES_KEY, MOVIE_GENRES_KEY, TV_GENRES_KEY, USERNAME_KEY, type ImageCell } from '@/core';
import { useLocalStorage } from '@/hooks';

type UserProviderProps = {
    children: ReactNode;
};

//store user name
export const UserProvider = ({ children }: UserProviderProps) => {
    const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, 'User');

    //store favorites
    const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
        serialize: (map) => Array.from(map.entries()),
        deserialize: (entries) => new Map(entries),
    });

    //cart sotrage
    const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
        serialize: (map) => Array.from(map.entries()),
        deserialize: (entries) => new Map(entries),
    });
    //genre storage
    const [movieGenres, setMovieGenres] = useLocalStorage<number[], number[]>(MOVIE_GENRES_KEY, []);
    const [tvGenres, setTvGenres] = useLocalStorage<number[], number[]>(TV_GENRES_KEY, []);

    //toggle favorite 
    const toggleFavorite = (image: ImageCell) => {
        setFavorites((prev) => {
            const cloned = new Map(prev);

            if (cloned.has(image.id)) {
                cloned.delete(image.id);
            } else {
                if (cart.has(image.id)) return cloned;
                cloned.set(image.id, image);
            }

            return cloned;
        });
    };

    //toggle cart
    const toggleCart = (image: ImageCell) => {
        setCart((prev) => {
            const cloned = new Map(prev);

            if (cloned.has(image.id)) {
                cloned.delete(image.id);
            } else {
                if (favorites.has(image.id)) return cloned;
                cloned.set(image.id, image);
            }

            return cloned;
        });
    };

    return (
        <UserContext.Provider
            value={{
                userName,
                favorites,
                cart,
                movieGenres,
                tvGenres,
                setUserName,
                toggleFavorite,
                toggleCart,
                setMovieGenres,
                setTvGenres,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};