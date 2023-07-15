import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import BookingFrom from "./BookingForm"
import { movies, slots, seats } from "./data"

afterEach(cleanup);

describe("BookingFrom", () => {
    test("When rows renders", () => {
        // ARRANGE
        render(<BookingFrom />);

        // ACT
        const movieRowTitle = screen.getByTestId("movie-row");
        const slotRowTitle = screen.getByTestId("slot-row");
        const seatRowTitle = screen.getByTestId("seat-row");

        // ASSERT
        expect(movieRowTitle).toHaveTextContent("Select a Movie");
        expect(slotRowTitle).toHaveTextContent("Select a Time slot");
        expect(seatRowTitle).toHaveTextContent("Select the seats");
    });

    test("Before and after column click", () => {
        // ARRANGE
        render(<BookingFrom />);

        let movieColumn, slotColumn, seatColumn, seat;

        movies.map((seat, index) => {
            // ACT
            movieColumn = screen.getByTestId(`movie-${index}`);
            // ASSERT
            expect(movieColumn).toHaveClass("movie-column");
            // ACT
            fireEvent.click(movieColumn);
            // ASSERT
            expect(movieColumn).toHaveClass("movie-column-selected");
        });

        slots.map((slot, index) => {
            // ACT
            slotColumn = screen.getByTestId(`slot-${index}`);
            // ASSERT
            expect(slotColumn).toHaveClass("slot-column");
            // ACT
            fireEvent.click(slotColumn);
            // ASSERT
            expect(slotColumn).toHaveClass("slot-column-selected");
        });

        seats.map((seat, index) => {
            // ACT
            seatColumn = screen.getByTestId(`seat-${index}`);
            // ASSERT
            expect(seatColumn).toHaveClass("seat-column");
            // ACT
            fireEvent.click(seatColumn);
            // ASSERT
            expect(seatColumn).toHaveClass("seat-column-selected");
        });
    });

    test("Number of initial seat 0 and after increased by 1", () => {
        // ARRANGE
        render(<BookingFrom />);

        let seatElement;

        seats.map((seat, index) => {
            // ACT
            seatElement = screen.getByTestId(`seat-${seat}`);
            // ASSERT
            expect(seatElement).toHaveValue(0);
            // ACT
            fireEvent.change(seatElement, { target: { value: '1' } });
            // ASSERT
            expect(seatElement).toHaveValue(1);
        });
    });
});