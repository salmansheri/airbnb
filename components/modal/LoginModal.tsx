"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from 'next-auth/react'; 

import useLoginModal from "@/hooks/userLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "./Button";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from 'next/navigation'; 

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal(); 
  const router = useRouter() 

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    // await axios
    //   .post("http://localhost:3000/api/register",data
    //   )
    //   .then(() => {
    //     registerModal.onClose();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Something went Wrong");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    signIn('credentials', {
      ...data, 
      redirect: false,
    }).then((callback) => {
      setIsLoading(false); 
      if(callback?.ok) {
        toast.success("Login successfull")
        
        loginModal.onClose(); 
        router.refresh(); 

        
      }

      if(callback?.error) {
        toast.error(callback.error); 
        
      }
    })
  };

  const Toggle = useCallback(() => {
    loginModal.onClose(); 
    registerModal.onOpen(); 


  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your Account" />

     
      <Input
        type="email"
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />

      <Input
        type="password"
        id="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <h4 />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">

      </div>
      <div className="flex flex-row items-center gap-2 text-center">

        <div>
           First time using Airbnb? 
        </div>
        <div onClick={Toggle} className='text-neutral-800 cursor-pointer hover:underline'>
           Register
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
