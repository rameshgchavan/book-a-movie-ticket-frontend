// Imported react hooks
import { useContext, useEffect } from "react";
// Imported array from data file
import { seats } from "./data";
// Imported last movie booking contextapi
import { LastBookingContext } from "../contextAPI/lastBooking";
// Imported axios to handle http requests
import axios from "axios";

const LastBookingDetails = () => {
    // Destructured value of contextapi
    const { lastBooking, setLastBooking } = useContext(LastBookingContext);

    useEffect(() => {
        getLastBooking();
    })

    // Arrow function to get data
    const getLastBooking = async () => {
        // axios http request to backend to get data
        const respose = await axios("/api/booking", {
            method: "get"
        });
        // Set response received from http request
        setLastBooking(respose.data);
    }

    return (
        <div className='col-lg-3 border border-dark rounded mt-lg-0 mt-2 p-2 text-md-nowrap'
            style={{ fontSize: 'small' }}>

            <span className="fs-5" data-testid="title">
                Last Booking Details:
            </span>

            {/*If last movie booking found show it or show message "no previous booking found" */}
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

export default LastBookingDetails