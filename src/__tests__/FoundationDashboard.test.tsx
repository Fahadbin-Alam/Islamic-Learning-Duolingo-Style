import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationDashboard } from "../components/FoundationLearning";
import { createEmptyLearnerProfile } from "../services/foundationAssessment";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

async function renderDashboard(profile = createEmptyLearnerProfile()) {
  const handlers = {
    onStartPlacement: jest.fn(),
    onStartReview: jest.fn(),
    onStartDailyChallenge: jest.fn(),
    onSkipAssessment: jest.fn(),
    onExploreFreely: jest.fn()
  };
  await render(<FoundationDashboard profile={profile} {...handlers} />);
  return handlers;
}

// GameButton renders its label in uppercase.
describe("FoundationDashboard", () => {
  it("invites a new learner to start placement or skip", async () => {
    const handlers = await renderDashboard();

    expect(screen.getByText("Find your level")).toBeTruthy();
    await fireEvent.press(screen.getByText("START"));
    await fireEvent.press(screen.getByText("SKIP FOR NOW"));

    expect(handlers.onStartPlacement).toHaveBeenCalledTimes(1);
    expect(handlers.onSkipAssessment).toHaveBeenCalledTimes(1);
    // Review and the daily challenge live on the Practice tab now.
    expect(screen.queryByText("MISTAKE REVIEW")).toBeNull();
    expect(screen.queryByText("DAILY CHALLENGE")).toBeNull();
  });

  it("keeps skills folded for a new learner until asked", async () => {
    await renderDashboard();

    expect(screen.queryByText("Wudu")).toBeNull();
    await fireEvent.press(screen.getByTestId("foundation-skills-toggle"));
    expect(screen.getByText("Wudu")).toBeTruthy();
    expect(screen.getAllByText("New").length).toBeGreaterThan(0);
  });

  it("offers a retake once placement is finished", async () => {
    await renderDashboard({ ...createEmptyLearnerProfile(), assessmentCompleted: true, totalQuestionsAnswered: 10 });

    expect(screen.getByText("Your map")).toBeTruthy();
    expect(screen.getByText("RETAKE")).toBeTruthy();
    expect(screen.queryByText("SKIP FOR NOW")).toBeNull();
    expect(screen.getByText("Shahadah")).toBeTruthy();
  });
});
