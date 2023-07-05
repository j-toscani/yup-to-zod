import "./App.css";
import { ConditionalForm } from "./forms/ConditionalForm";
import { LoginForm } from "./forms/LoginForm";

function App() {
  return (
    <>
      <header>
        <nav>
          <a href="#login"> Simples Login Formular </a>
          <a href="#conditional"> Formular mit Konditionalem Input </a>
          <a href="#conditional-multi-error">
            Formular mit komplexen fehler Feedback
          </a>
        </nav>
      </header>
      <main>
        <section>
          <h2 id="login">Simple Login Form</h2>
          <LoginForm />
        </section>
        <section>
          <h2 id="conditional">Formular mit Konditionalem Input</h2>
          <ConditionalForm />
        </section>
        <section>
          <h2 id="conditional-multi-error">
            Formular mit komplexem fehler Feedback
          </h2>
        </section>
      </main>
    </>
  );
}

export default App;
