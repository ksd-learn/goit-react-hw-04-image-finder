import { Watch } from  'react-loader-spinner'
import css from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={css.loader}>
            <Watch
              height="60"
              width="60"
              radius="48"
              color="#4fa94d"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
        </div>
        
    )
}
