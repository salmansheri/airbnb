"use client";

import { useMemo, useState } from "react";

import Modal from "./Modal";
import useRentModal from "@/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { FieldValues, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsloading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch('guestCount'); 
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount'); 
  const imageSrc = watch('imageSrc'); 

  
  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location])


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div>
        <Heading
          title="Where is your place located?"
          subtitle="Help Guests find you"
        />
        <div className="mt-5">
          <CountrySelect
          value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <div className='mt-5'>
          <Map
            center={location?.lating}
          />

          </div>

        </div>
      </div>
    );
  }


  if(step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have"
        />

        <Counter title="Guests"
          subtitle="How Many Guests"
          value={guestCount}
         
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter title="Rooms"
          subtitle="How Many Rooms do you have"
          value={roomCount}
         
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter title="Bathrooms"
          subtitle="How Many Bathrooms do you have"
          value={bathroomCount}
         
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />

      </div>
    )
  }

  if(step === STEPS.IMAGES) {
   bodyContent= (
    <div>
      
      <Heading 
        title="Add a Photo of your place"

        subtitle="Show guests what your place looks like!"
      />
      <div className="mt-5">
      <ImageUpload 
        value={imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}

      />

      </div>

      
    </div>
   )
  }


  if(step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="How Would you describe your place?"

          subtitle="Short and sweet works best!"
        />

        <Input 
          id="title"
          label="title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>

    )
  }

  if(step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Now, set Your price"
          subtitle="How much do you charge per night? "
        />

        <Input 
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

      </div>
    )
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onSubmit={onNext}
      title="Airbnb your  home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
