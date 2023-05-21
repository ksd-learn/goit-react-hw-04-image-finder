import { useState } from "react";
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

export const App = () => {

  const [queryValue, setqueryValue] = useState('');
  
  const addQueryValue = (name) => {
    if (name !== queryValue) {
      setqueryValue(name)
    }
  };

  return (
    <div>
      <Searchbar addQueryValue={addQueryValue} />
      <ImageGallery queryValue={queryValue} />
    </div>
  );
}
