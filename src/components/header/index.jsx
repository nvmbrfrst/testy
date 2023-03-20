// import "./styles.css";

// подключение CSS модуля
import stylemodule from "./styles.module.css";

export function Header({ children }) {
  return (
    <header className={stylemodule.header}>
      <div className={`container ${stylemodule.header__wrapper}`}>
        {children}
      </div>
    </header>
  );
}