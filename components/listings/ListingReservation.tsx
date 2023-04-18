'use client'; 

import { Range } from 'react-date-range'; 
import Calendar from '../inputs/Calendar';
import Button from '../modal/Button';

interface ListingReservationProps {
    price: number; 
    dateRange: Range; 
    totalPrice: number; 
    onChangeDate: (value : Range) => void; 
    disabled?: boolean; 
    disabledDates: Date[]; 
    onSubmit: () => void; 
}


const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    disabled,
    disabledDates,
    onSubmit,
}) => {
    return(
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-col gap-1 p-4">
                <div className="text-2xl font-semibold">
                    $ {price}
                </div>

                <div className="font-light text-neutral-600">
                    night

                </div>
                <hr />
                <Calendar 
                    value={dateRange}
                    disabledDates={disabledDates}
                    onChange={(value) => onChangeDate(value.selection)}
                />
                <hr />
                <div className="p-4">
                    <Button 
                        disabled={disabled}
                        label="Reserve"
                        onClick={onSubmit}


                        />

                </div>

                <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                    <div>
                        Total
                    </div>
                    <div>
                        $ {totalPrice}
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ListingReservation; 