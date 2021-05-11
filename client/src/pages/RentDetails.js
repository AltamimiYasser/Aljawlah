// {
//   "createdAt": "2021-05-10T06:02:01.282Z",
//   "bikes": [
//     {
//       "rentPrice": 10,
//       "workingHours": 0, TODO: add working time in the backend db
//       "_id": "6094869d81f0a2608564670e",
//       "barcode": "",
//       "color": "not blue",
//       "wheels": 2,
//       "billNumber": "",
//       "dateOfPurchase": null,
//       "model": "",
//       "size": 26,
//       "plate": "",
//       "bikeClass": "",
//       "description": "",
//       "__v": 0
//     }
//   ],
//   "startTime": null,
//   "endTime": null,
//   "lastStartTime": null,
//   "hasStarted": false,
//   "isPaused": true,
//   "hasEnded": false,
//   "timeOut": 0,
//   "price": 0,
//   "timerRunning": false,
//   "_id": "6098cc62421cd0b2edd012c0",
//   "customer": {
//     "rents": [
//       "6097544af41c7c93f4c165fa",
//       "6098b9454658f5ad72b5ffac",
//       "6098bbd86f6cf0ae2efdfbf4",
//       "6098bea3ba9c95aeddb4613e",
//       "6098c64c0b5a7ab0f47e01ae",
//     ],
//     "bikes": [
//       "609485d869db8c605346beb7",
//       "6094869d81f0a2608564670e",
//       "609485d869db8c605346beb7",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e"
//     ],
//     "_id": "6095c23bbb75b773940ffa1f",
//     "fName": "Yasser",
//     "lName": "Tamimi",
//     "phone": "0556636334",
//     "idNumber": "1064417213",
//     "sex": "Male",
//     "__v": 0
//   },
//   "__v": 0
// }

//design a page with taps for user with user details and
// for bikes the users just rented and the rent itself
// in the user's tap display bikes that the users used before
// for that we need to chang the bikes list page to a components
// that accepts data and render the passed
// for the rents and bikes we use something like this in the backend to get
// all the data
//"bikes": [
//       "609485d869db8c605346beb7",
//       "6094869d81f0a2608564670e",
//       "609485d869db8c605346beb7",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e",
//       "6094869d81f0a2608564670e"
//     ],
// to display a list of these bikes we create an end point for custom bikes list
// and in the controller we get the id's array from the req.body
// then we query like this:
//
// model.find({
//     '_id': { $in: [
//         mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
//         mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
//         mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
//     ]}
// }
// then display in it using the bikes list we created before adding a props for
// title and the data

import React from 'react';

const RentDetails = () => {
  return <div></div>;
};

export default RentDetails;
