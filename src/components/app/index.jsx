import { useEffect, useState } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { dataCard } from "../../data";
import { Logo } from '../logo';
import { Search } from '../search';
import api from '../../utils/api';
import "./styles.css";

export function App() {
  const [cards, setCards] = useState([]);
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

  useEffect(() => {
    api.getProductsList()
      .then(data => setCards(data.products))
      .catch(err => console.log(err))

    api.getUserInfo()
      .then(data => console.log('user', data))
      .catch(err => console.log(err))
  },[])

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

        <Sort />

        <CardList goods={cards} />

      </main>
      <Footer />
    </>
  );
}


