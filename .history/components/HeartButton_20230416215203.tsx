'use client';

import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


 

interface HeartButtonProps {
    listingId: String; 
    currentUser?:SafeUser | null; 


}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId, 
    currentUser,
}) => {
    const hasFavorite = false; 
    const toggleFavorite = () => {}; 

    return (
        <div className="relative hover:opacity-80 transition cursor-pointer" onClick={toggleFavorite}>
            <AiOutlineHeart 
                size={28}
                className="fill-rose-500 absolute -top-[2px] -right-[2px]"
                />
                <AiFillHeart
                    size={24}
                />
        </div>
    )
}

export default HeartButton; 
