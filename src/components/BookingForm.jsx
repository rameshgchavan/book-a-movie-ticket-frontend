// Imported react hooks
import { useEffect, useState, useContext } from 'react';
// Imported bootstrap comonents
import { Button, Form } from 'react-bootstrap';
// Imported array from data file
import { movies, slots, seats } from "./data";
// Imported axios to handle http requests
import axios from 'axios';
// Imported lodash to compare array
import _ from 'lodash'
// Imported last movie booking contextapi
import { LastBookingContext } from '../contextAPI/lastBooking';

const BookingFrom = () => {
    // Destructed value of contextapi
    const { setLastBooking } = useContext(LastBookingContext)
    // To store index of array useState hook is used
    const [movieIndex, setMovieIndex] = useState();
    const [slotIndex, setSlotIndex] = useState();
    const [seatTypeIndex, setSeatTypeIndex] = useState();

    // Object created to store seats value with zero
    let zeroSeats = {};
    seats.map((key) => {
        zeroSeats = { ...zeroSeats, [key]: 0 }
    })
    // Created state to store object
    const [seatsDetails, setSeatsDetails] = useState(zeroSeats);

    useEffect(() => {
        // To get data from local storage on this (BookingFrom) component loads
        const selection = JSON.parse(localStorage.getItem('selection'));
        // Set values retrieved from local storage
        selection && setMovieIndex(selection.selectedMovie);
        selection && setSlotIndex(selection.selectedSlot);
        selection && setSeatsDetails(selection.selectedSeats);
    }, [])

    // Arrow function to store and set data received from user
    const storeMovieSelection = (selectedMovie, selectedSlot, selectedSeats) => {
        // Set values received from user
        setMovieIndex(selectedMovie);
        setSlotIndex(selectedSlot);
        setSeatsDetails(selectedSeats);
        // To store data on local storage 
        localStorage.setItem("selection",
            JSON.stringify({
                selectedMovie, selectedSlot, selectedSeats
            })
        );
    }

    // Arrow function to handle data received from user
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Insisted user to select at least one value from each row
        if (movieIndex === undefined) {
            alert("Please select movie.");
            return;
        }

        if (slotIndex === undefined) {
            alert("Please select time slot.");
            return;
        }
        //  Check user selected at least one seat greater than zero
        if (_.isEqual(seatsDetails, zeroSeats)) {
            alert("Please select at leat one seat.");
            return;
        }
        // axios http request to send data to backend those will be saved into database
        const respose = await axios("/api/booking", {
            method: "post",
            data: {
                movie: movies[movieIndex],
                slot: slots[slotIndex],
                seats: seatsDetails
            }
        });
        // Set response received from http request
        setLastBooking(respose.data);

        alert("Movie booked successfully.");

        // Clear local storage to clear user selections
        localStorage.clear();
        // Setting index to -1 and seats to zero to clear user selections
        setMovieIndex(-1);
        setSlotIndex(-1);
        setSeatTypeIndex(-1);
        setSeatsDetails(zeroSeats);
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}      >
            <div >
                {/* Movie row */}
                <div className='movie-row border border-dark rounded mb-2 p-2 fs-5 '>
                    Select a Movie
                    <div className='d-flex flex-wrap mt-2'>
                        {
                            movies.map((movie, index) => {
                                return (
                                    <div key={index}
                                        className={`${movieIndex == index ? 'movie-column-selected' : 'movie-column'}
                                         border border-dark rounded mb-2 me-2 p-2 fs-6 text-sm-nowrap`}
                                        onClick={(e) => { storeMovieSelection(index, slotIndex, seatsDetails); }}
                                    >
                                        {movie}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Slot row */}
                <div className='slot-row border border-dark rounded mb-2 p-2 fs-5 '>
                    Select a Time slot
                    <div className='d-flex flex-wrap mt-2'>
                        {
                            slots.map((slot, index) => {
                                return (
                                    <div key={index}
                                        className={`${slotIndex == index ? 'slot-column-selected' : 'slot-column'} \
                                        border border-dark rounded mb-2 me-2 p-2 fs-6 text-sm-nowrap`}
                                        onClick={(e) => { storeMovieSelection(movieIndex, index, seatsDetails); }}
                                    >
                                        {slot}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Seat row */}
                <div className='seat-row border border-dark rounded mb-2 p-2 fs-5 '>
                    Select the seats
                    <div className='d-flex flex-wrap mt-2'>
                        {
                            seats.map((seat, index) => {
                                return (
                                    <div key={index}
                                        className={`${seatTypeIndex == index || seatsDetails[seat] > 0 ? 'seat-column-selected' : 'seat-column'}
                                        border border-dark rounded mb-2 me-2 p-2 fs-6 text-sm-nowrap`}
                                        onClick={(e) => { setSeatTypeIndex(index); }}
                                    >
                                        Type {seat} <br />
                                        <input id={`seat-${seat}`} type='number' min={0} style={{ width: "2.5rem", height: "1.2rem", fontSize: "small" }} className="mt-1"
                                            value={seatsDetails[seat]}
                                            onChange={(e) => { storeMovieSelection(movieIndex, slotIndex, { ...seatsDetails, [seat]: Number(e.target.value) }); }}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <Button type='submit'>Book Now</Button>
            </div>
        </Form>
    )
}

export default BookingFrom