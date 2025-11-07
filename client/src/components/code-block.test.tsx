import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CodeBlock from "./code-block";

describe("code-block", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should render children text", () => {
    render(<CodeBlock>console.log("test")</CodeBlock>);
    expect(screen.getByText('console.log("test")')).toBeInTheDocument();
  });

  it("should copy code text to clipboard and show copied state", async () => {
    render(<CodeBlock>copy me</CodeBlock>);
    const copyBtn = screen.getByRole("button");

    fireEvent.click(copyBtn);
    // assert clipboard writeText called with code text
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("copy me");

    const checkmarkPath = copyBtn.querySelector(
      'path[class*="transition-opacity"]',
    );

    // wait for promise resolution that sets copied state
    await act(async () => {
      await Promise.resolve();
    });

    expect(checkmarkPath).toHaveClass("opacity-100");
    // advance timers to allow copied state to reset
    await act(async () => {
      vi.advanceTimersByTime(2500);
    });

    // mark should be invisible
    expect(checkmarkPath).toHaveClass("opacity-0");
  });
});
