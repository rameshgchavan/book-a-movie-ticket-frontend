import "@testing-library/jest-dom";
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

describe("App", () => {
  test('When displays heading', () => {
    // ARRANGE
    render(<App />);

    // ACT
    const heading = screen.getByRole("heading");

    // ASSERT
    expect(heading).toHaveTextContent("Book that show!!");
  });
});

