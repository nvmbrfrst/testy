import "./styles.css";
import likeIcon from '../../images/save.svg';

export function Card({ 
  name, 
  price, 
  discount, 
  wight, 
  description, 
  picture, 
  ...props 
}) 
{

// расчитать скидку
  const discount_price = Math.round(price - (price * discount) / 100);

  return (
    <article className="card">

      {/* иконка со скидкой */}
      <div className="card__sticky card__sticky_type_top-left">

        
      { discount !== 0 &&  
      (<span className="card__discount">{`-${discount}%`}</span>)}
      </div>

      {/* иконка лайка  */}
      <div className="card__sticky card__sticky_type_top-right">
        <button className="card__favorite">
          <img src={likeIcon} alt="" className="card__favorite-icon" />
        </button>
      </div>

      {/* карточка  */}
      <a href="#" className="card__link">

        {/* карточка - картинка */}
        <img src={picture} alt={name} className="card__image" />

        {/* описание */}
        <div className="card__desc">

          {/* старая цена */}
          <span className={discount !== 0 ? "card__old-price" : "card__price"}>
            {price}&nbsp;₽
          </span>

          {/* скидка */}
          {discount !== 0 && (
            <span className="card__price card__price_type_discount">
              {discount_price}&nbsp;₽
            </span>
          )}

          {/* вес */}
          <span className="card__wight">{wight}</span>

          {/* имя карточки */}
          <h3 className="card__name">{name}</h3>

        </div>
      </a>

      {/* кнопка в корзину */}
      <a href="#" className="card__cart btn btn_type_primary">В корзину</a>
    </article>
  );
}