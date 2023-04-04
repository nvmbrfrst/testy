import { useState, useEffect } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { Logo } from "../logo";
import { Search } from "../search";
import { dataCard } from "../../data";
import s from "./styles.module.css";
// import { Button } from '../button';

import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { NotFoundPage } from "../../pages/not-found-page";
import { UserContext } from "../../contexts/current-user-context";
import { CardsContext } from "../../contexts/card-context";
import { FavoritesPage } from "../../pages/favorite-page";
// import { ThemeContext, themes } from '../../contexts/theme-context';

export function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  // const [theme, setTheme] = useState(themes.light)

  const debounceSearchQuery = useDebounce(searchQuery, 300);

  function handleRequest() {
    // const filterCards = dataCard.filter((item) =>
    //   item.name.includes(searchQuery)
    // );
    // setCards(filterCards);

    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        setCards(dataSearch);

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
    return api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })
        setCards(newProducts)

        if (!like) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        return updateCard;
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

        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userInfoData._id))
        setFavorites(favoriteProducts)

      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, [])

  return (
    <CardsContext.Provider value={{ cards, favorites, handleLike: handleProductLike,isLoading }}>
      <UserContext.Provider value={{ currentUser, onUpdateUser: handleUpdateUser }}>
        <Header user={currentUser} >
          <Routes>
            <Route path='/' element={
              <>
                <Logo />
                <Search
                  handleFormSubmit={handleFormSubmit}
                  handleInputChange={handleInputChange}
                />
              </>
            } />
            <Route path='*' element={<Logo href="/" />} />
          </Routes>

        </Header>
        {/* <main className="content container" style={{ backgroundColor: theme.background }}> */}
          <main className="content container">
        <Routes>
          <Route path='/' element={<CatalogPage handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/product/:productID' element={<ProductPage />} />          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </UserContext.Provider>
      </CardsContext.Provider >
    // </ThemeContext.Provider>
  );
}
