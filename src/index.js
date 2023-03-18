import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css'
import logoHuinya from './images/ReactLogo.png';

// import svg as Path
// import logoHuinyaSvg from './images/logo.svg';

// import svg as Component
import { ReactComponent as Logo } from './images/logo.svg';



//пример 1
// const element = React.createElement(
//   'h1', //имя тега
//   null, //какая-то фигня
//   'Hello' // содержимое - текст
// )

//пример 2 - JSX-element - <h1>dfsgsdfgsdfgds</h1>
// const element2 = <h1>dfsgsdfgsdfgds</h1>


//пример 3 - компонент и JSX-фрагменты <></>
// const element3 = (
//   <>
//     <h1>dfsgsdfgsdfgds</h1>
//     <ul>
//       <li>Компонент1</li>
//       <li>Компонент2</li>
//       <li>Компонент3</li>
//     </ul>
//   </>

// );


//пример 4 подключение JSX-компонентов

//компонент 1 
const AppList = () => {
  return (
    <ul>
      <li>Компонент4</li>
      <li>Компонент5</li>
      <li>Компонент6</li>
    </ul>
  )
}
//компонент 2
const AppHeader1 = () => {
  return <h1>Привет</h1>
}

//компонент 3
const AppInput1 = () => {
  const placeholder = 'Пример инпута';
  return (
    <input placeholder={placeholder} type='password' />
  )
}

//передаёт компоненты 1 и 2 и 3 в root render
const App1 = () => {
  return (
    <>
      <AppHeader />
      <AppList />
      <AppInput />
    </>
  )
}

//пример 4 PROPS

//компонент 3
// const AppInput = (props) => {
//   return (
//     <label className='label'>
//       {props.label}

//       <input placeholder={props.placeholder} type='password' />
//     </label>
//   )
// }


// БОЛЕЕ ПРАВИЛЬНЫЙ ВАРИАНТ
const AppInput = ({ placeholder, label }) => {
  return (
    <label className='label'>
      {label}

      <input placeholder={placeholder} type='password' />
    </label>
  )
}

// const App = () => {
//   return (
//     <>
//       <AppHeader />
//       <AppList />
//       <AppInput placeholder='Введите ваше имя' label='Имя' />
//       <AppInput placeholder='Введите пароль' label='Пароль' />
//     </>
//   )
// }


//пример 5 стили - className

// const AppHeader = () => {
//   return <h1 className='header-title'>Привет</h1>
// }

// add image

const AppHeader5 = () => {
  return (
    <div>
      <Logo />
      {/* <img className='image' src={logoHuinyaSvg} /> */}
      <img className='image' src={logoHuinya} />
      <h1 className='header-title'>Привет</h1>
    </div>

  )
}

// пример 6 Props/передача - title

// const AppHeader = ({title}) => {
//   return (
//     <div>
//       <Logo />
//       <img className='image' src={logoHuinya} />
//       <h1 className='header-title'>{title}</h1>
//     </div>

//   )
// }

// const App = () => {
//   return (
//     <>
//       <AppHeader title='Привет'/>
//       <AppHeader title='Привет2'/>
//       <AppList />
//       <AppInput placeholder='Введите ваше имя' label='Имя' />
//       <AppInput placeholder='Введите пароль' label='Пароль' />
//     </>
//   )
// }


// пример 7 - children PROPS - 
// деструктуризация - props = children, title

// const AppHeader = ({title, children}) => {
//   return (
//     <div>
//       {children}
//       {<h1 className='header-title'>{title}</h1>}
//     </div>

//   )
// }

// пример 7.2 - children PROPS - 
// без деструктуризации - props = children, title

const AppHeader = (props) => {
  return (
    <div>
      {props.children}
      {props.title && <h1 className='header-title'>{props.title}</h1>}
    </div>

  )
}

const App = () => {
  return (
    <>
      <AppHeader title='it is title'>
        <Logo />
        <img className='image' src={logoHuinya} />
        <p>any texts</p>
        <p>any texts</p>
        <p>any texts</p>
      </AppHeader>

      <AppList />
      <AppInput placeholder='Введите ваше имя' label='Имя' />
      <AppInput placeholder='Введите пароль' label='Пароль' />
    </>
  )
}



//ВАЖНЫЕ СТРОКИ

// сборка ВСЕХ элементов
// const App = () => {
//   return (
//     <>

//       <AppHeader />
//       <AppList />
//       <AppInput placeholder='Введите ваше имя' label='Имя' />
//       <AppInput placeholder='Введите пароль' label='Пароль' />
//     </>
//   )
// }

// создание реактдом
const root = ReactDOM.createRoot(document.getElementById('root'));

// отрисовка 
root.render(<App />);





