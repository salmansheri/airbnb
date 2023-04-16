'use client'; 

import { AiOutlineMenu } from 'react-icons/ai'; 
import Avatar from '../Avatar';
import { useState, useCallback } from 'react'; 
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/userLoginModal';
import { User } from '@prisma/client';
import useRentModal from '@/hooks/useRentModal';

interface UserMenuProps {
    currentUser: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const rentModal = useRentModal(); 


    const [isOpen, setIsOpen] = useState(false); 
    const registerModal = useRegisterModal(); 
    const loginModal = useLoginModal(); 


    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)

    },[])

    const onRent = useCallback(() => {
        // if(!currentUser) {
        //     return loginModal.onOpen(); 
        // }

        rentModal.onOpen(); 
    }, [loginModal, currentUser])
    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb Your Home


                </div>
                <div onClick={toggleOpen} className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />

                    </div>


                </div>

            </div>
            {isOpen && (
                <div className="absolute rounded-sl shadow-md w-[40px] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <>
                        <MenuItem onClick={loginModal.onOpen} label='Login' />
                        <MenuItem onClick={registerModal.onOpen} label='Register' />
                        </>
                        </div>
                    </div>
            )}

        </div>
    )
}

export default UserMenu; 