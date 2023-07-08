import './App.css';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

import LastBookingDetails from './components/LastBookingDetails';
import BookingForm from './components/BookingForm';

import { LastBookingContext } from "./contextAPI/lastBooking"

function App() {
  const [lastBooking, setLastBooking] = useState();

  return (
    <Container className="App shadow p-3">
      <h4> Book that show!!</h4>

      <div className="d-lg-flex flex-lg-row gap-lg-3 align-items-start fw-bold">
        <LastBookingContext.Provider value={{ lastBooking, setLastBooking }}>
          <BookingForm />
          <LastBookingDetails />
        </LastBookingContext.Provider>
      </div>
    </Container>
  );
}

export default App;
