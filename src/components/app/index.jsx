import { useState, useEffect } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { Logo } from "../logo";
import { Search } from "../search";
import { dataCard } from "../../data";
import s from "./styles.module.css";
import { Button } from '../button';
// import styled from 'styled-components';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { NotFoundPage } from "../../pages/not-found-page";

export function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const debounceSearchQuery = useDebounce(searchQuery, 300);

  function handleRequest() {
    // const filterCards = dataCard.filter((item) =>
    //   item.name.includes(searchQuery)
    // );
    // setCards(filterCards);

    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        setCards(dataSearch);
        // console.log(data);
      })
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
      })
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id)
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })
        setCards(newProducts)
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);


  useEffect(() => {
    setIsLoading(true)
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, [])

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <Logo />

        <Routes>
          <Route path='/' element={
            <Search
              handleFormSubmit={handleFormSubmit}
              handleInputChange={handleInputChange}
            />
          } />
          <Route path='*' element={<Logo href="/" />} />
        </Routes>
      </Header>
      <main className="content container">

        <Routes>
          <Route path='/' element={<CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} />} />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/product/:productID' element={<ProductPage />} />          <Route path='*' element={<NotFoundPage />} />
        </Routes>

        {/*         
        <FaqPage />
        <ProductPage />
        <CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} /> */}
      </main>
      <Footer />
    </>
  );
}
