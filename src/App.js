import './App.css';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

// Imported components
import LastBookingDetails from './components/LastBookingDetails';
import BookingForm from './components/BookingForm';
// Imported contextAPI
import { LastBookingContext } from "./contextAPI/lastBooking"

function App() {
  // last booking state created using hook
  const [lastBooking, setLastBooking] = useState();

  return (
    <Container className="App shadow p-3">
      <h4>Book that show!!</h4>

      <div className="d-lg-flex flex-lg-row gap-lg-3 align-items-start fw-bold">
        {/* Wrapped components inside contextAPI to handle last movie booking */}
        <LastBookingContext.Provider value={{ lastBooking, setLastBooking }}>
          <BookingForm />
          <LastBookingDetails />
        </LastBookingContext.Provider>
      </div>
    </Container>
  );
}

export default App;
