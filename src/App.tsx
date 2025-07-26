import type { JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import BasicAppShell from "./components/AppShell";
import Characters from "./pages/characters";
import Planets from "./pages/planets";
import Starships from "./pages/starships";
import { AppRoutes } from "./routes";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <BasicAppShell>
        <Routes>
          <Route
            element={<Navigate to={AppRoutes.Characters} replace />}
            path="/"
          />
          <Route path={AppRoutes.Characters} element={<Characters />} />
          <Route path={AppRoutes.Planets} element={<Planets />} />
          <Route path={AppRoutes.Starships} element={<Starships />} />
        </Routes>
      </BasicAppShell>
    </BrowserRouter>
  );
}

export default App;
