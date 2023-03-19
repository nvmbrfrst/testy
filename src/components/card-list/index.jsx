
import { Card } from "../card";
import "./styles.css";

// export function CardList() {
//   return (
//     <div className="cards content__cards">

//       {/* метод MAP - перебирает массив вызывая 
//       функцию для каждого элемента массива 
//       вызывая массив JX-элементов*/}
      
//       {dataCard.map((dataItem, index) => (
//         <Card key={index} {...dataItem} />
//       ))}
//     </div>
//   );
// }

export function CardList({ goods }) {
  return (
    <div className="cards content__cards">


{/* key - помогает React сделать снимок элемента  */}
{/* с последнего обновления */}

      {goods.map((dataItem, index) => (
        <Card key={index} {...dataItem} />
      ))}
    </div>
  );
}
