import { useEffect, useState } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { dataCard } from "../../data";
import { Logo } from '../logo';
import { Search } from '../search';
import { Button } from '../button';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import "./styles.css";

export function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 300)

// console.log('debounceSearchQuery', 'debounceSearchQuery');

  // функция для фильтрования стейта при изменении значения
  function handleRequest() {
    //   const filterCards = dataCard.filter((item) =>
    //     item.name.includes(searchQuery)
    //   );
    //   setCards(filterCards);
    // }
    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        setCards(dataSearch);
        // console.log(data);
      })
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

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
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


