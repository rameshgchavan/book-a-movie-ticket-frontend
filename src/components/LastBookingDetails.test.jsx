import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import LastBookingDetails from "./LastBookingDetails";

afterEach(cleanup);

describe("LastBooking", () => {
    test("When LastBooking renders elements", () => {
        render(<LastBookingDetails />);

        // ACT
        const lastBookingTitle = screen.getByTestId("title");

        // ASSERT
        expect(lastBookingTitle).toHaveTextContent("Last Booking Details:");
    });
});