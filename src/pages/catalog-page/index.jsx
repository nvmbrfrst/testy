import { useContext } from 'react';
import { CardList } from '../../components/card-list'
import { Sort } from '../../components/sort'
import { Spinner } from '../../components/spinner';

import s from './styles.module.css';
import { CardsContext } from '../../contexts/card-context';

export const CatalogPage = ({ isLoading }) => {
    const { cards: goods } = useContext(CardsContext)
    return (
        <>
            {isLoading
                ? <Spinner />
                : <>
                    <Sort />
                    <CardList goods={goods} />
                </>
            }
        </>
    )
}