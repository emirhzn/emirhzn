import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Shell } from "@/components/Shell";
import { Dashboard } from "@/pages/Dashboard";
import { Documents } from "@/pages/Documents";
import { Clients, Finance, Taxes } from "@/pages/Operations";
import { Messages, Meetings, MeetingRoom } from "@/pages/Communications";
import { Login } from "@/pages/Login";

export type Role = "accountant" | "client";

export default function App() {
  const [role, setRole] = useState<Role | null>(() => {
    const stored = localStorage.getItem("hesapio-role");
    return stored === "accountant" || stored === "client" ? stored : null;
  });
  const [dark, setDark] = useState(
    () => localStorage.getItem("hesapio-theme") === "dark"
  );
  const [location, navigate] = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("hesapio-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (
      role === "client" &&
      (location === "/clients" || location === "/accountant")
    ) {
      navigate("/client");
    }
  }, [role, location, navigate]);

  const chooseRole = (next: Role) => {
    localStorage.setItem("hesapio-role", next);
    setRole(next);
    navigate(next === "accountant" ? "/accountant" : "/client");
  };
  const signOut = () => {
    localStorage.removeItem("hesapio-role");
    setRole(null);
    navigate("/login");
  };

  if (!role) return <Login onChoose={chooseRole} />;
  return (
    <Shell
      role={role}
      dark={dark}
      onTheme={() => setDark(!dark)}
      onRole={chooseRole}
      onSignOut={signOut}
    >
      <Switch>
        <Route path="/login">
          <Login onChoose={chooseRole} />
        </Route>
        <Route path="/">
          <Dashboard role={role} />
        </Route>
        <Route path="/accountant">
          {role === "accountant" ? (
            <Dashboard role="accountant" />
          ) : (
            <Dashboard role="client" />
          )}
        </Route>
        <Route path="/client">
          <Dashboard role="client" />
        </Route>
        <Route path="/clients">
          {role === "accountant" ? <Clients /> : <Dashboard role="client" />}
        </Route>
        <Route path="/documents">
          <Documents role={role} />
        </Route>
        <Route path="/taxes">
          <Taxes role={role} />
        </Route>
        <Route path="/finance">
          <Finance role={role} />
        </Route>
        <Route path="/messages">
          <Messages role={role} />
        </Route>
        <Route path="/meetings">
          <Meetings role={role} />
        </Route>
        <Route path="/meeting-room">
          <MeetingRoom role={role} />
        </Route>
        <Route>
          <Dashboard role={role} />
        </Route>
      </Switch>
    </Shell>
  );
}
