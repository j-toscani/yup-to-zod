import "./App.css";
import { ComplexConditionalForm } from "./forms/ComplexConditionalForm";
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
            Formular mit komplexem fehler Feedback
          </a>
        </nav>
      </header>
      <main>
        <section>
          <h2 id="login">Simples Login Formular</h2>
          <LoginForm />
        </section>
        <section>
          <h2 id="conditional">Formular mit konditionalem Input</h2>
          <ConditionalForm />
        </section>
        <section>
          <h2 id="conditional-multi-error">
            Formular mit komplexem fehler Feedback
          </h2>
          <ComplexConditionalForm />
        </section>
      </main>
    </>
  );
}

export default App;
