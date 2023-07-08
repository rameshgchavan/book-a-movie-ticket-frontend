import { seats } from "./data";
import { useContext, useEffect } from "react";
import { LastBookingContext } from "../contextAPI/lastBooking";
import axios from "axios";

const LastBooking = () => {
    const { lastBooking, setLastBooking } = useContext(LastBookingContext);

    useEffect(() => {
        getLastBooking();
    }, [])

    const getLastBooking = async () => {
        const respose = await axios("/api/booking", {
            method: "get"
        });

        setLastBooking(respose.data);
    }

    return (
        <div className='col-lg-3 border border-dark rounded mt-lg-0 mt-2 p-2 text-md-nowrap'
            style={{ fontSize: 'small' }}>
                
            <span className="fs-5">Last Booking Details:</span>

            {lastBooking === undefined || lastBooking?.message
                ? <div className="text-danger">{lastBooking?.message}</div>

                : <div>
                    <div>seats:</div>
                    {
                        seats.map((seat, index) => {
                            return (
                                <div key={index}>{seat}:<span className="fw-normal">{lastBooking?.seats[seat]}</span></div>
                            )
                        })
                    }
                    <div>slot: <span className="fw-normal">{lastBooking?.slot}</span></div>
                    <div> movie: <span className="fw-normal">{lastBooking?.movie}</span></div>
                </div>
            }
        </div>
    )
}

export default LastBooking