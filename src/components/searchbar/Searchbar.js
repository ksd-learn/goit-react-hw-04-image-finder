import { Component } from 'react';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export class Searchbar extends Component  {

  state = {
    name: ''
  };

  handleChange = event => {
      this.setState({ name: event.target.value})
  };

  handlSubmit = (event) => {
    event.preventDefault();
    let name = this.state.name;
    if (name) {
      this.props.addNameSearch(name);
      this.setState({
        name: ''
      })
    }
  };

  render() {
    
    const name = this.state.name;

    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handlSubmit}>
          
          <button className={css.btn} type="submit">
            <span><AiOutlineSearch /></span>
          </button>

          <input
            type="text"
            value={name}
            onChange={this.handleChange}
            //autocomplete="off"
            //autofocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  addNameSearch: PropTypes.func.isRequired,
};