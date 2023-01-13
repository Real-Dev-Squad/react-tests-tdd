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
  test("it validates form input and enables next and previous button", async () => {
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
  test("it validates transition between inputs using next and previous button", async () => {
    //Assemble
    //INFO: cannot use browser validations because of jest-dom
    const schema = [
      {
        name: "fullName",
        label: "FullName",
        condition: { required: true, minLength: 3, maxLength: 21 },
      },
      {
        name: "mobileNumber",
        label: "MobileNumber",
        type: "number",
        condition: { required: true, pattern: "(91)?[789]\\d{9}" },
      },
      {
        name: "userName",
        label: "UserName",
        condition: { required: true, pattern: "^[a-z][a-z0-9]{3,16}$" },
      },
    ];
    render(<StepperInputsForm schema={schema} />);

    //Act
    const previous = screen.getByRole("button", { name: /previous/i });
    let next = screen.getByRole("button", { name: /next/i });
    let fullNameInput = screen.queryByRole("textbox", { name: /fullName/i });
    let mobileInput = screen.queryByRole("spinbutton", {
      name: /mobileNumber/i,
    });
    let userNameInput;
    let submit;

    //Assert
    expect(previous).toBeDisabled();
    expect(next).toBeDisabled();
    expect(fullNameInput).toHaveValue("");

    await userEvent.type(fullNameInput, "Shubham Pawan Bajaj  ");

    expect(next).not.toBeDisabled();

    fireEvent.click(next);

    expect(previous).not.toBeDisabled();

    fullNameInput = screen.queryByRole("textbox", { name: /fullName/i });

    expect(fullNameInput).toBeNull();

    mobileInput = screen.queryByRole("spinbutton", {
      name: /mobileNumber/i,
    });

    expect(mobileInput).not.toBeNull();
    expect(next).toBeDisabled();

    await userEvent.type(mobileInput, "918950095195");

    expect(next).not.toBeDisabled();
    expect(previous).not.toBeDisabled();

    fireEvent.click(next);

    userNameInput = screen.queryByRole("textbox", { name: /userName/i });
    mobileInput = screen.queryByRole("spinbutton", {
      name: /mobileNumber/i,
    });
    next = screen.queryByRole("button", { name: /next/i });

    expect(mobileInput).not.toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(next).not.toBeInTheDocument();

    submit = screen.queryByRole("button", { name: /submit/i });

    expect(submit).toBeInTheDocument();

    fireEvent.click(previous);
    mobileInput = screen.queryByRole("spinbutton", {
      name: /mobileNumber/i,
    });
    expect(mobileInput).toBeInTheDocument();
  });
  test("it renders and validates and submits stepper form", async () => {
    //Assemble
    const schema = [
      {
        name: "fullName",
        label: "FullName",
        condition: { required: true, minLength: 3, maxLength: 21 },
      },
      {
        name: "mobileNumber",
        label: "MobileNumber",
        type: "number",
        condition: { required: false, pattern: "(91)?[789]\\d{9}" },
      },
      {
        name: "userName",
        label: "UserName",
        condition: { required: true, pattern: "^[a-z][a-z0-9]{3,16}$" },
      },
      {
        name: "consent",
        label: "Give consent to collect data",
        type: "checkbox",
      },
    ];
    const initialValues = {
      fullName: "Shubham Bajaj",
      mobileNumber: "9195195",
      consent: false,
    };
    const onSubmit = jest.fn();
    render(
      <StepperInputsForm
        schema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    );

    //Act
    const previous = screen.queryByRole("button", { name: /previous/i });
    let next = screen.queryByRole("button", { name: /next/i });
    let fullName = screen.queryByRole("textbox", { name: /fullName/i });
    let mobile;
    let userName;
    let consent;
    let submit;

    //Assert
    expect(previous).toBeDisabled();
    expect(next).not.toBeDisabled();
    expect(fullName).toBeInTheDocument();

    fireEvent.click(next);
    fireEvent.click(next);

    mobile = screen.queryByRole("spinbutton", { name: /mobileNumber/i });

    expect(mobile).not.toBeInTheDocument();
    expect(previous).not.toBeDisabled();
    fireEvent.click(previous);

    mobile = screen.queryByRole("spinbutton", { name: /mobileNumber/i });

    expect(mobile).toBeInTheDocument();
    fireEvent.click(next);

    userName = screen.queryByRole("textbox", { name: /userName/i });

    expect(userName).toBeInTheDocument();

    await userEvent.type(userName, "shmbajaj");
    fireEvent.click(next);

    consent = screen.queryByRole("checkbox", { name: /consent/i });
    submit = screen.queryByRole("button", { name: /submit/i });

    fireEvent.click(consent);
    fireEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      fullName: "Shubham Bajaj",
      userName: "shmbajaj",
      mobileNumber: "9195195",
      consent: "on",
    });
  });
});
