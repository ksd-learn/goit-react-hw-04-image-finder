import { useState } from "react";
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

export const App = () => {

  const [nameSearch, setNameSearch] = useState('');
  
  const addNameSearch = (name) => {
    if (name !== nameSearch) {
      setNameSearch(name)
    }
  };

  return (
    <div>
      <Searchbar addNameSearch={addNameSearch} />
      <ImageGallery nameSearch={nameSearch} />
    </div>
  );
}
