import StepperInputsForm from "./index.js";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Perform validations on the input to enable or disable the Next step button", () => {
  test("it renders form with initial input, previous and next buttons", () => {
    //Assemble
    const schema = [
      { name: "fullName", label: "FullName" },
      { name: "mobile", label: "Mobile" },
    ];
    const initialValues = { fullName: "Shubham Bajaj", mobile: "91xxxxx95195" };
    render(<StepperInputsForm schema={schema} initialValues={initialValues} />);

    //Act
    const previous = screen.getByRole("button", { name: /previous/i });
    const next = screen.getByRole("button", { name: /next/i });
    const fullNameInput = screen.getByRole("textbox", { name: /fullname/i });
    const mobileInput = screen.queryByRole("textbox", { name: /mobile/i });
    const userNameInput = screen.queryByRole("textbox", { name: /userName/i });

    //Assert
    expect(previous).toBeInTheDocument();
    expect(next).toBeInTheDocument();
    expect(fullNameInput).toBeInTheDocument();
    expect(mobileInput).toBeNull();
    expect(userNameInput).toBeNull();
    expect(fullNameInput).toHaveValue("Shubham Bajaj");
  });
  test("it validates form input andd enables next and previous button", async () => {
    //Assemble
    const schema = [
      {
        name: "fullName",
        label: "FullName",
        condition: { required: true, minLength: 3, maxLength: 21 },
      },
      { name: "mobile", label: "Mobile" },
    ];
    // fullName: "Shubham Bajaj",
    const initialValues = { mobile: "91xxxxx95195" };
    render(<StepperInputsForm schema={schema} initialValues={initialValues} />);

    //Act
    const previous = screen.getByRole("button", { name: /previous/i });
    const next = screen.getByRole("button", { name: /next/i });
    const fullNameInput = screen.queryByRole("textbox", { name: /fullname/i });

    //Assert
    expect(previous).toBeDisabled();
    expect(next).toBeDisabled();
    expect(fullNameInput).toHaveValue("");

    await userEvent.type(fullNameInput, "A");
    expect(next).toBeDisabled();

    await userEvent.type(fullNameInput, "Shubham Pawan Bajaj  ");

    expect(next).not.toBeDisabled();
    fireEvent.click(next);
    expect(previous).not.toBeDisabled();
  });
  test("it invalidates initial step or form inputs and check is previous button disabled", () => {});
  test("it renders stepper-form and validates next step or form inputs and enables next step button", () => {});
  test("it renders stepper-form and invalidates next step or form inputs and disables next step button and check is previous button disabled", () => {});
  test("it renders transition between forms or steps", () => {});
  test("it renders and validates stepper form", () => {});
});
