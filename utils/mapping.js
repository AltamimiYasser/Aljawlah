const reMap = (rents) => {
  const reMapped = rents.map((rent) => {
    return mapOne(rent);
  });
  return reMapped;
};

const mapOne = (rent) => {
  let fName, lName, phone, customerId;
  if (!rent.customer) {
    fName = '';
    lName = '';
    phone = '';
    customerId = '';
  } else {
    fName = rent.customer.fName;
    lName = rent.customer.lName;
    phone = rent.customer.phone;
    customerId = rent.customer._id;
  }
  let bikes = [];
  if (rent.bikes) {
    bikes = rent.bikes.map((bike) => ({
      size: bike.size,
      id: bike._id,
      isOut: bike.isOut,
      color: bike.color,
    }));
  }
  const startTime = rent.startTime;
  const endTime = rent.endTime;
  const id = rent._id;
  const {
    lastStartTime,
    hasStarted,
    isPaused,
    hasEnded,
    timeOut,
    price,
    timerRunning,
    createdAt,
    neverPaused,
  } = rent;
  return {
    name: `${fName} ${lName}`,
    phone,
    customerId,
    bikes,
    startTime,
    endTime,
    id,
    lastStartTime,
    hasStarted,
    isPaused,
    hasEnded,
    timeOut,
    price,
    timerRunning,
    createdAt,
    neverPaused,
  };
};

module.exports = {
  reMap,
  mapOne,
};
