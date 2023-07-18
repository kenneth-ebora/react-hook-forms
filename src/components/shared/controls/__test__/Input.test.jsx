import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver";
import * as yup from "yup";

const testSchema = yup.object().shape({
  name: yup.string().required(),
});

const TestComponent = () => {
  const resolver = useYupValidationResolver(testSchema);

  const { control } = useForm({
    resolver,
    reValidateMode: "all",
    mode: "all",
    defaultValues: {
      firstName: "Kenneth",
      lastName: "Ebora",
      startDate: new Date(),
      isActive: true,
    },
  });

  return <Input control={control} label="name" name="name" />;
};

const setup = () => {
  render(<TestComponent />);
};

test("should render properly", () => {
  setup();

  expect(screen.getByLabelText("name")).toBeInTheDocument();
});

test("should have error message", async () => {
  setup();

  fireEvent.blur(screen.getByLabelText("name"));

  expect(await screen.findByTestId("errorMessage")).toBeInTheDocument();
});
