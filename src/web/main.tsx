import {APIProvider} from "@vis.gl/react-google-maps";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router";
import {App} from "./App";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <APIProvider apiKey={"<your_google_api_key>"}>
        <App/>
      </APIProvider>
    </BrowserRouter>
  </StrictMode>
);

if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  createRoot(elem).render(app);
}
