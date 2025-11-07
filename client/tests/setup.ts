import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
