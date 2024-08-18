import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { resetData } from "../mocks/handlers";
import { server } from "../mocks/server";
import ShoppingList from "../components/ShoppingList";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetData();
});
afterAll(() => server.close());

test("displays all the items from the server after the initial render", async () => {
  render(<ShoppingList />);

  expect(await screen.findByText(/Yogurt/)).toBeInTheDocument();
  expect(await screen.findByText(/Pomegranate/)).toBeInTheDocument();
  expect(await screen.findByText(/Lettuce/)).toBeInTheDocument();
});

test("adds a new item to the list when the ItemForm is submitted", async () => {
  render(<ShoppingList />);

  const initialDessertCount = screen.queryAllByText(/Dessert/).length;

  fireEvent.change(screen.getByLabelText(/Name:/), {
    target: { value: "Ice Cream" },
  });
  fireEvent.change(screen.getByLabelText(/Category:/), {
    target: { value: "Dessert" },
  });
  fireEvent.submit(screen.getByText(/Add to List/));

  expect(await screen.findByText(/Ice Cream/)).toBeInTheDocument();
  const desserts = await screen.findAllByText(/Dessert/);
  expect(desserts.length).toBe(initialDessertCount + 1);
});

test("updates the isInCart status of an item when the Add/Remove from Cart button is clicked", async () => {
  render(<ShoppingList />);

  const addButtons = await screen.findAllByText(/Add to Cart/);
  expect(addButtons.length).toBe(3);

  fireEvent.click(addButtons[0]);
  expect(await screen.findByText(/Remove From Cart/)).toBeInTheDocument();
});

test("removes an item from the list when the delete button is clicked", async () => {
  render(<ShoppingList />);

  const yogurt = await screen.findByText(/Yogurt/);
  expect(yogurt).toBeInTheDocument();

  const deleteButtons = await screen.findAllByText(/Delete/);
  fireEvent.click(deleteButtons[0]);

  await waitForElementToBeRemoved(() => screen.queryByText(/Yogurt/));
});
