import { dataCard } from "../../data";
import { Card } from "../card";
import "./styles.css";

export function CardList() {
  return (
    <div className="cards content__cards">

      {/* метод MAP - перебирает массив вызывая 
      функцию для каждого элемента массива 
      вызывая массив JX-элементов*/}
      {dataCard.map((dataItem) => (
        <Card {...dataItem} />

      ))}
    </div>
  );
}


