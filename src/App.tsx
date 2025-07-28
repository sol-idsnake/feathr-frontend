import { type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import BasicAppShell from "./components/AppShell";
import Page from "./components/Page";
import PageDetail from "./components/PageDetail";
import { Endpoint } from "./lib/api";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <BasicAppShell>
        <Routes>
          <Route element={<Navigate to={Endpoint.people} replace />} path="/" />
          <Route path={`/:queryKey`} element={<Page />} />
          <Route path={`/:queryKey/:id`} element={<PageDetail />} />
        </Routes>
      </BasicAppShell>
    </BrowserRouter>
  );
}

export default App;
