import { Component } from "react";
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

export class App extends Component {

  state = {
    nameSearch: '',
  };

  
  addNameSearch = (name) => {
    if (name !== this.state.nameSearch) {
      this.setState({ nameSearch: name })
    }
  };
  
  render() {
    return (
      <div>
        <Searchbar addNameSearch={this.addNameSearch} />
        <ImageGallery nameSearch={this.state.nameSearch} />
      </div>
    );
  }
}
