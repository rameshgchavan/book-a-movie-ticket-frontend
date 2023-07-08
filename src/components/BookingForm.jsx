import { Button, Form } from 'react-bootstrap';
import { movies, slots, seats } from "./data";
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import _ from 'lodash'

import { LastBookingContext } from '../contextAPI/lastBooking';

const BookingFrom = () => {
    const { setLastBooking } = useContext(LastBookingContext)

    const [movieIndex, setMovieIndex] = useState();
    const [slotIndex, setSlotIndex] = useState();
    const [seatTypeIndex, setSeatTypeIndex] = useState();

    let zeroSeats = {};
    seats.map((key) => {
        zeroSeats = { ...zeroSeats, [key]: 0 }
    })
    const [seatsDetails, setSeatsDetails] = useState(zeroSeats);

    useEffect(() => {
        const selection = JSON.parse(localStorage.getItem('selection'));

        selection && setMovieIndex(selection.selectedMovie);
        selection && setSlotIndex(selection.selectedSlot);
        selection && setSeatsDetails(selection.selectedSeats);
    }, [])

    const storeMovieSelection = (selectedMovie, selectedSlot, selectedSeats) => {
        setMovieIndex(selectedMovie);
        setSlotIndex(selectedSlot);
        setSeatsDetails(selectedSeats);

        localStorage.setItem("selection",
            JSON.stringify({
                selectedMovie, selectedSlot, selectedSeats
            })
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (movieIndex === undefined) {
            alert("Please select movie.");
            return;
        }

        if (slotIndex === undefined) {
            alert("Please select time slot.");
            return;
        }

        if (_.isEqual(seatsDetails, zeroSeats)) {
            alert("Please select at leat one seat.");
            return;
        }

        const respose = await axios("/api/booking", {
            method: "post",
            data: {
                movie: movies[movieIndex],
                slot: slots[slotIndex],
                seats: seatsDetails
            }
        });

        setLastBooking(respose.data);

        alert("Movie booked successfully.");

        localStorage.clear();

        setMovieIndex(-1);
        setSlotIndex(-1);
        setSeatTypeIndex(-1);
        setSeatsDetails(zeroSeats);
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}      >
            <div >
                <div className='movie-row border border-dark rounded mb-2 p-2 fs-5 '>
                    Select a Movie
                    <div className='d-flex flex-wrap mt-2'>
                        {
                            movies.map((movie, index) => {
                                return (
                                    <div key={index}
                                        className={`${movieIndex == index ? 'movie-column-selected' : 'movie-column'} border border-dark rounded mb-2 me-2 p-2 fs-6 text-sm-nowrap`}
                                        onClick={(e) => { storeMovieSelection(index, slotIndex, seatsDetails); }}
                                    >
                                        {movie}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='slot-row border border-dark rounded mb-2 p-2 fs-5 '>
                    Select a Time slot
                    <div className='d-flex flex-wrap mt-2'>
                        {
                            slots.map((slot, index) => {
                                return (
                                    <div key={index}
                                        className={`${slotIndex == index ? 'slot-column-selected' : 'slot-column'} border border-dark rounded mb-2 me-2 p-2 fs-6 text-sm-nowrap`}
                                        onClick={(e) => { storeMovieSelection(movieIndex, index, seatsDetails); }}
                                    >
                                        {slot}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='seat-row border border-dark rounded mb-2 p-2 fs-5 '>
                    Select the seats
                    <div className='d-flex flex-wrap mt-2'>
                        {
                            seats.map((seat, index) => {
                                return (
                                    <div key={index}
                                        className={`${seatTypeIndex == index || seatsDetails[seat] > 0 ? 'seat-column-selected' : 'seat-column'} border border-dark rounded mb-2 me-2 p-2 fs-6 text-sm-nowrap`}
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