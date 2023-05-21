import { useState } from 'react';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export const Searchbar = ({addQueryValue}) => {

  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.target.value.trim())
  };

  const handlSubmit = (event) => {
    event.preventDefault();
    if (name) {
      addQueryValue(name);
      setName('')
    }
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handlSubmit}>
        <button className={css.btn} type="submit">
          <span><AiOutlineSearch /></span>
        </button>
        
        <input
          type="text"
          value={name}
          onChange={handleChange}
          //autocomplete="off"
          //autofocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  addQueryValue: PropTypes.func.isRequired,
};