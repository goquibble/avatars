import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import debounce from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call the function after delay", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("arg1");

    // function shouldnt be called immediately
    expect(fn).not.toHaveBeenCalled();

    // fast-forward timers by 100ms
    vi.advanceTimersByTime(100);
    // now fn should be called once with args
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("arg1");
  });

  it("should only call once when called rapidly multiple times", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("arg1");
    debounced("arg2");
    debounced("arg3");

    // function shouldnt be called immediately
    expect(fn).not.toHaveBeenCalled();
    // fast-forward timers by 100ms
    vi.advanceTimersByTime(100);
    // now fn should be called once with args
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("arg3");
  });
});
