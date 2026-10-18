import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationDashboard } from "../components/FoundationLearning";
import { createEmptyLearnerProfile } from "../services/foundationAssessment";

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

describe("FoundationDashboard", () => {
  it("invites a new learner to start placement", async () => {
    const handlers = await renderDashboard();

    await fireEvent.press(screen.getByText("Start placement"));

    expect(screen.getByText("Start with a real placement check")).toBeTruthy();
    expect(handlers.onStartPlacement).toHaveBeenCalledTimes(1);
  });

  it("offers a retake once placement is finished", async () => {
    await renderDashboard({ ...createEmptyLearnerProfile(), assessmentCompleted: true, totalQuestionsAnswered: 10 });

    expect(screen.getByText("Your foundation map")).toBeTruthy();
    expect(screen.getByText("Retake placement")).toBeTruthy();
  });

  it("opens mistake review", async () => {
    const handlers = await renderDashboard();

    await fireEvent.press(screen.getByText("Mistake review"));

    expect(handlers.onStartReview).toHaveBeenCalledTimes(1);
  });
});
