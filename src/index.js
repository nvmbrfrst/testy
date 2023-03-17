import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './styles.css'
// import App from './App';

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

const AppInput = ({placeholder, label}) => {
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



const AppHeader = () => {
  return <h1 className='header-title'>Привет</h1>
}

const App = () => {
  return (
    <>
      <AppHeader />
      <AppList />
      <AppInput placeholder='Введите ваше имя' label='Имя' />
      <AppInput placeholder='Введите пароль' label='Пароль' />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);





