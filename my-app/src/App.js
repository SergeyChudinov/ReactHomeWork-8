import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

import { getUsers } from './redux/usersReducer/usersReducer';

import './App.scss';
import './style.scss';

function App() {
  const users = useSelector(state => state.users)
  const loading = useSelector(state => state.loading)
  const error = useSelector(state => state.error)
  const [offset, setOffset] = useState(210);
  const dispatch = useDispatch()
  useEffect(() => {
    onRequest(offset)
    // dispatch(getUsers(offset))
    // eslint-disable-next-line
  }, [])

  const onRequest = (offset) => {
    dispatch(getUsers(offset))
    setOffset(offset + 9)
  }
  if(loading) {
    return (
      <div>
        Идет загрузка...
      </div>
    )
  }
  if(error) {
    return (
      <div>
        Ошибка...
      </div>
    )
  }
  // return (
  //   <div className="App">
  //     {users.map((user) => {
  //     return (
  //       <div key={user.id}>
  //         {user.name}
  //       </div>
  //     )
  //   })}
  //   </div>
  // );
  const renderItems = (arr) => {
    const items =  arr.map((item, i) => {
        let imgStyle = {'objectFit' : 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }        
        return (               
            <li 
                className='char__item'
                tabIndex={0}
                key={item.id}
                >
                <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>                
        )
    });
    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }
  const elements = renderItems(users)
  const button = <button onClick={() => onRequest(offset)}    className="button button__main button__long">
      <div className="inner">load more</div>
  </button>
  return (
    <div className="char__list">
        {elements}
        {button}
    </div>
)
}

export default App;

