import { convertCron } from "../src/main";

test("check", () => {
  const ret = convertCron("2023/01/01");
  expect(ret).toBe("* * 31 12 *");
});
  