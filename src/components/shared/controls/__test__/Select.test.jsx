import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver";
import * as yup from "yup";
import ReactSelect from "../Select";

const testSchema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => {
      if (value !== undefined && value !== {}) {
        return value.label;
      }

      return null;
    })
    .required(),
});

const TestComponent = () => {
  const resolver = useYupValidationResolver(testSchema);

  const { control } = useForm({
    resolver,
    reValidateMode: "all",
    mode: "all",
  });

  const options = [
    {
      label: "Value 1",
      value: 1,
    },
    {
      label: "Value 2",
      value: 2,
    },
  ];

  return (
    <form data-testid="form">
      <ReactSelect
        control={control}
        label="name"
        name="name"
        options={options}
      />
    </form>
  );
};

const setup = () => {
  render(<TestComponent />);
};

test("should render properly", () => {
  setup();

  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

test("should show options when focused", async () => {
  setup();

  fireEvent.mouseDown(screen.getByRole("combobox"));
  fireEvent.click(screen.getByText("Value 1"));

  await waitFor(() => {
    expect(screen.getByTestId("singleValue")).toHaveTextContent("Value 1");
  });
});
