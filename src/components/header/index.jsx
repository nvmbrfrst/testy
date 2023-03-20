// import "./styles.css";

// подключение CSS модуля
import s from "./styles.module.css";

// подключение библиотеки classname
import cn from 'classnames';

export function Header({ children }) {
  return (
    <header className={s.header}>

{/* // подключение CSS модуля */}
      {/* <div className={`container ${s.wrapper}`}> */}
      
{/* подключение библиотеки classname */}
<div className={cn('container', s.wrapper)}>{children}</div>
    </header>
  );
}