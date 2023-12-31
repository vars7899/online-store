import { DateTime } from "luxon";

export function getAverageOrderPrice(orders) {
  if (!orders.length) return 0;

  let numOfOrders = orders.length;
  let totalOfOrders = orders.reduce((acc, cur) => Number(acc) + Number(cur.bill.total), 0);

  return totalOfOrders / numOfOrders;
}

export function getAverageOrderPercentageChange(orders) {
  let dt = DateTime.now();
  let lastMonth = dt.minus({ days: 30 }).toISODate();
  let secondLastMonth = dt.minus({ days: 60 }).toISODate();

  let thisMonthOrders = orders.filter((order) => DateTime.fromISO(order.createdAt).toISODate() > lastMonth);
  let lastMonthOrders = orders.filter(
    (order) =>
      DateTime.fromISO(order.createdAt).toISODate() < lastMonth &&
      DateTime.fromISO(order.createdAt).toISODate() > secondLastMonth
  );

  let lastMonthAverage = getAverageOrderPrice(thisMonthOrders).toFixed(2);
  let secondMonthAverage = getAverageOrderPrice(lastMonthOrders).toFixed(2);

  return (((lastMonthAverage - secondMonthAverage) / Math.abs(secondMonthAverage)) * 100).toFixed(2);
}

export function getAverageOrderPriceLifeSpanArray(orders) {
  if (!orders.length) return [];

  let dt = DateTime.now();
  let lastMonth = dt.minus({ days: 30 }).toISODate();
  let dateArray = [];

  for (let x = 30; x >= 0; x--) {
    dateArray.push({ date: dt.minus({ days: x }).toISODate(), count: 0 });
  }

  let thisMonthOrders = orders.filter((order) => DateTime.fromISO(order.createdAt).toISODate() > lastMonth);

  thisMonthOrders.forEach((order) => {
    let current = dateArray.find((el) => DateTime.fromISO(order.createdAt).toISODate() === el.date);
    if (current) {
      current.count += 1;
    }
  });

  let graphData = Array.from(dateArray, (x) => x.count);

  return graphData;
}

export function getTotalRevenue(orders) {
  let totalOfOrders = orders.reduce((acc, cur) => Number(acc) + Number(cur.bill.total), 0);
  return totalOfOrders;
}

export function getUserRoleCount(users) {
  // Admin, customer, other
  let userRoleArray = [0, 0, 0];

  if (!users) return userRoleArray;

  users.forEach((user) => {
    if (user.role === "admin") userRoleArray[0] += 1;
    else if (user.role === "customer") userRoleArray[1] += 1;
    else userRoleArray[2] += 1;
  });

  return userRoleArray;
}

export function getSalesArray(orders) {
  let graphData = Array.from(getSalesGraphData(orders), (x) => x.sale);
  return graphData;
}

export function getSalesGraphData(orders, fromGivenDays) {
  if (!orders.length) return [];

  let dt = DateTime.now();
  let lastMonth = dt.minus({ days: fromGivenDays }).toISODate();
  let dateArray = [];

  for (let x = fromGivenDays; x >= 0; x--) {
    dateArray.push({ date: dt.minus({ days: x }).toISODate(), sale: 0 });
  }

  let thisMonthOrders = orders.filter((order) => DateTime.fromISO(order.createdAt).toISODate() > lastMonth);

  thisMonthOrders.forEach((order) => {
    let current = dateArray.find((el) => DateTime.fromISO(order.createdAt).toISODate() === el.date);
    if (current) {
      current.sale += order.bill.total;
    }
  });

  return dateArray;
}
