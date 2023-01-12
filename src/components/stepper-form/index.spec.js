import StepperInputsForm from "./index.js";
import { render, screen } from "@testing-library/react";

describe("Perform validations on the input to enable or disable the Next step button", () => {
  test("it renders form with initial input, previous and next buttons", () => {
    //Assemble
    const schema = [
      { name: "fullName", label: "FullName", condition: {} },
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
  test("it validates form inputs and enables next step button", () => {
    //Assemble
    const schema = [
      { name: "mobile", label: "Mobile", type: "number", condition: {} },
      { name: "fullName", label: "FullName", condition: {} },
    ];
    const initialValues = { fullName: "Shubham Bajaj", mobile: "91xxxxx95195" };
    render(<StepperInputsForm schema={schema} initialValues={initialValues} />);

    //Act
    const previous = screen.getByRole("button", { name: /previous/i });
    const next = screen.getByRole("button", { name: /next/i });
    const fullNameInput = screen.queryByRole("textbox", { name: /fullname/i });
    const mobileInput = screen.queryByRole("textbox", { name: /mobile/i });

    //Assert
    expect(previous).toBeDisabled();
    expect(next).toBeDisabled();
  });
  test("it invalidates initial step or form inputs and check is previous button disabled", () => {});
  test("it renders stepper-form and validates next step or form inputs and enables next step button", () => {});
  test("it renders stepper-form and invalidates next step or form inputs and disables next step button and check is previous button disabled", () => {});
  test("it renders transition between forms or steps", () => {});
  test("it renders and validates stepper form", () => {});
});
