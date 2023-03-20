import { useEffect, useState } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { dataCard } from "../../data";
import { Logo } from '../logo';
import { Search } from '../search';
import s from "./styles.module.css";
import { Button } from '../button';

export function App() {

  // передача данных из массива
  const [cards, setCards] = useState(dataCard);
  const [searchQuery, setSearchQuery] = useState("");

  // функция для фильтрования стейта при изменении значения
  function handleRequest() {
    const filterCards = dataCard.filter((item) =>
      item.name.includes(searchQuery)
    );
    setCards(filterCards);
  }

  // функция нажатия на кнопку поиск
  // действие по сабмиту

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  // функция для изменения состояния
  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  useEffect(() => {
    handleRequest();
  }, [searchQuery]);

  return (
    <>
      <Header>
        <Logo />
        <Search
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />
      </Header>
      <main className="content container">

        {/* добавление инлайн стиля */}
        {/* <h1 style={{ color: 'red' }}>Стилизованный заголовок</h1> */}
        
        {/* <Button htmlType='button' type="primary" extraClass={s.button}>Купить</Button>
        <Button htmlType='button' type="secondary">Отложить</Button> */}

        <Sort />
        <CardList goods={cards} />

      </main>
      <Footer />
    </>
  );
}


