import React from "react";
import { render, screen } from "@testing-library/react";
import FormOne from "./FormOne";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";

describe("With React Testing Library", () => {
  const initialState = {
    formValues: {
      live_in_us: true,
      git_profile: "http://example.com/my-project.git",
      about_you: "Explorer",
      Cv: null,
      cover_letter: null,
      phone_number: 123456789,
      email: "ak@gmail.com",
      lastName: "Sharma",
      firstName: "Akhilesh",
    },
    formIndex: 0,
    error: {},
  };
  const mockStore = configureStore();
  let store, wrapper;

  it('Should check for Phone number field to be not null"', () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <App>
          <FormOne />
        </App>
      </Provider>
    );

    expect(getByText("CompanyX")).not.toBeNull();
  });
});
