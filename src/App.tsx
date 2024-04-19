import "./App.css";
import { Authenticated, Refine } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider.ts";
import { authProvider } from "./providers/auth-provider.ts";
import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ThemedLayoutV2, AuthPage } from "@refinedev/antd";

function App() {
  return (
    <BrowserRouter>
      <Refine dataProvider={dataProvider} authProvider={authProvider}>
        <Routes>
          <Route
            element={
              <Authenticated
                fallback={<Navigate to="/login" />}
                key="route-1"
                v3LegacyAuthProviderCompatible
              >
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              </Authenticated>
            }
          >
            <Route index element={<div>11</div>} />
            {/*<Route index element={<DashboardPage />} />*/}
          </Route>
          <Route
            element={
              <Authenticated
                fallback={<Outlet />}
                key="route-2"
                v3LegacyAuthProviderCompatible
              >
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}

export default App;
