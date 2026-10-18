import { showWebAlert } from "../services/webAlert";

describe("showWebAlert", () => {
  it("shows the title and message in a browser alert", () => {
    const win = { alert: jest.fn(), confirm: jest.fn() };

    showWebAlert("Check your email", "Please use a valid email address.", undefined, win);

    expect(win.alert).toHaveBeenCalledWith("Check your email\n\nPlease use a valid email address.");
  });

  it("runs the confirming button only when the learner presses OK", () => {
    const remove = jest.fn();
    const cancel = jest.fn();
    const buttons = [
      { text: "Cancel", style: "cancel", onPress: cancel },
      { text: "Remove", style: "destructive", onPress: remove }
    ];

    showWebAlert("Remove?", undefined, buttons, { alert: jest.fn(), confirm: jest.fn(() => true) });
    showWebAlert("Remove?", undefined, buttons, { alert: jest.fn(), confirm: jest.fn(() => false) });

    expect(remove).toHaveBeenCalledTimes(1);
    expect(cancel).toHaveBeenCalledTimes(1);
  });
});
