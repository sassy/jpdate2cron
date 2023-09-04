import { convertCron, convertISODate } from "../src/main";

test("check date", () => {
  const ret = convertCron("2023/01/01");
  expect(ret).toBe("* * 1 1 *");
});

test("check time", () => {
  const ret = convertCron(undefined, "11:30");
  expect(ret).toBe("30 2 * * *");
});

test("check date time", () => {
  const ret = convertCron("2023/01/01", "8:30");
  expect(ret).toBe("30 23 31 12 *");
});

test("check convertISODate", () => {
  const ret1 = convertISODate("2023/01/01");
  expect(ret1).toBe("2023-01-01");

  const ret2 = convertISODate("2023-01-01");
  expect(ret2).toBe("2023-01-01");
}); 

test("check convertISODate for not zero padding)", () => {
  const ret1 = convertISODate("2023/1/1");
  expect(ret1).toBe("2023-1-1");
}); 


