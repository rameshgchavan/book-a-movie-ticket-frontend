# Book a movie ticket App

## About app

The purpose of this app is to book movie ticket

## Project description

In this project I have created two component as following

/src/components

### `Components`
#### BookingForm.jsx
In this component I have given 3 rows movie, slot and seat that user can select as his choice.
User have to select a movie, a slot and at least one seat. 
If user accidently refresh the page the selection remains as it was.
After selection user can hit Book Now button to save his selected movie according slot and number of seats he selected.

#### LastBookingDetails.jsx
This component has been created to show last movie booking details. 
If previous movie booking found it shows the number of seats, a slot and a movie if not then it shows no previous booking found message.

### `Data`
#### Data.js
/src/

This file contains array of movies, slots and seats which I have used to show elements (draws columns).

### `Context API`
/src/contextAPI

#### lastBooking.js
I have used context API to pass respose received from axios http request in BookingForm.jsx component to LastBookingDetails.jsx

### `axios`
I have used axios http requests to get data from and post data to backend.

Here, data is movie name, slot and number of seats.

Read more: [axios](https://www.npmjs.com/package/axios)

### `bootstrap`

I have used bootstrap and react bootstrap to decorate app and make responsive design.

Read more: [bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

### `react testing library`

To test components BookingForm, LastBookingDetails and App I have used react testing library.

Respective file name with .test.js extentions are testing files.

Read more: [react testing library](https://testing-library.com/docs/react-testing-library/intro/)

### `Project files structure`
![image](https://github.com/rameshgchavan/book-a-movie-ticket-frontend/assets/109573381/17cbaad4-cdb9-40b7-8775-14eb4f378f9d)



## Project flow:

-> App is parent component that contains BookingForm and LastBookingDetails components which are warpped inside context API.

-> BookingForm component that contains three rows 

1. List of Movie name columns.
2. List Slot name columns and
3. List of Seats Types columns

-> LastBookingDetails shows last movie booking details


## Script to run and test app

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.


## About me
- Ramesh Chavan, AlmaBetter Full Stack Web Development enthusiast.
    - Email: ramesh7452@gmail.com.

### Thanks! AlmaBetter and team.

