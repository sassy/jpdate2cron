import { convertCron, convertISODate } from "../src/main";

test("check", () => {
  const ret = convertCron("2023/01/01 12:00");
  expect(ret).toBe("* * 1 1 *");
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


