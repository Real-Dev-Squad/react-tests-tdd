import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./index";

describe("signup component tests", () => {
  test("form renders schema components", () => {
    // Asssemble
    const schema = [
      { name: "fullname", label: "FullName" },
      { name: "mobile", label: "Mobile" },
    ];

    render(<Form schema={schema} />);

    // Act
    const fullNameInput = screen.getByRole("textbox", { name: /fullname/i });
    const mobileInput = screen.getByRole("textbox", { name: /mobile/i });

    // Assert
    expect(fullNameInput).toBeInTheDocument();
    expect(mobileInput).toBeInTheDocument();
  });

  test("form renders components with default values", () => {
    // Asssemble
    const schema = [
      { name: "fullname", label: "FullName" },
      { name: "mobile", label: "Mobile" },
      { name: "email", label: "Email" },
    ];
    const initialValues = [
      { name: "fullname", defaultValue: "shmbajaj" },
      { name: "mobile", defaultValue: "91" },
    ];

    render(<Form schema={schema} initialValues={initialValues} />);

    // Act
    const fullNameInput = screen.getByRole("textbox", { name: /fullname/i });
    const mobileInput = screen.getByRole("textbox", { name: /mobile/i });
    const email = screen.getByRole("textbox", { name: /email/i });

    // Assert
    expect(fullNameInput).toHaveValue("shmbajaj");
    expect(mobileInput).toHaveValue("91");
    expect(email).toHaveValue("");
  });

  test("form responds with input missing", () => {
    // Asssemble
    const schema = [
      { name: "fullname", label: "FullName", required: true },
      { name: "mobile", label: "Mobile", required: true },
    ];
    const initialValues = [{ name: "fullname", defaultValue: "shmbajaj" }];
    const onFormSubmit = jest.fn();

    render(
      <Form
        schema={schema}
        initialValues={initialValues}
        onSubmit={onFormSubmit}
      />
    );

    // Act
    const submit = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submit);

    // Assert
    expect(onFormSubmit).toHaveBeenCalledTimes(0);
  });

  test("form responds on-submit", () => {
    // Asssemble
    const schema = [
      { name: "fullname", label: "FullName", required: true },
      { name: "mobile", label: "Mobile", required: true },
    ];
    const initialValues = [{ name: "fullname", defaultValue: "shmbajaj" }];
    const onSubmit = jest.fn();

    render(
      <Form schema={schema} initialValues={initialValues} onSubmit={onSubmit} />
    );

    // Act
    const mobileInput = screen.getByRole("textbox", { name: /mobile/i });
    const submit = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(mobileInput, { target: { value: "00" } });
    fireEvent.submit(submit);

    // Assert
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("form state updates with updated input", async () => {
    // Asssemble
    const onFormSubmit = jest.fn();
    const schema = [
      { name: "fullName", label: "FullName" },
      { name: "mobile", label: "Mobile" },
    ];
    const initialValues = [
      { name: "fullName", defaultValue: "shm" },
      { name: "mobile", defaultValue: "91" },
    ];
    const expectedFullName = `shmbajaj`;
    const expectedMobile = "9100";
    const expectedFormDataObject = {
      fullName: expectedFullName,
      mobile: expectedMobile,
    };

    render(
      <Form
        schema={schema}
        initialValues={initialValues}
        onSubmit={onFormSubmit}
      />
    );

    // Act
    const fullNameInput = screen.getByRole("textbox", { name: /fullname/i });
    const mobileInput = screen.getByRole("textbox", { name: /mobile/i });
    const submit = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(mobileInput, "00");
    await userEvent.type(fullNameInput, "bajaj");

    fireEvent.submit(submit);

    // Assert
    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith(expectedFormDataObject);
  });
});
