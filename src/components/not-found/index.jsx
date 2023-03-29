import { ReactComponent as NotFoundIcon } from './img/ic-notfound.svg';

import { Button } from '../button'
import s from "./styles.module.css";

export function NotFound({ children, title, buttonText = "На главную", buttonAction }) {
  return (
    <div className={s.notfound}>
      <NotFoundIcon className={s.image} />
      <h1 className={s.title}>{title}</h1>
      {children && children}

      {/* логика нажатия на кнопку */}
      {buttonAction
        ? <Button type="border" href="#" action={buttonAction}>{buttonText}</Button>
        : <Button type="border" href="/">{buttonText}</Button>
      }
    </div>
  );
}