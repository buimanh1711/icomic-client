import { Link } from "react-router-dom"
import getCate from "../utils/getCategory"
import Warning from "./Warning"

const StoriesList = ({ stories }) => {

  return (
    <div id='stories-list'>
      <div className='stories-list-container'>
        <div className='row custom-gutter'>
          {
            stories && stories.length > 0 && stories.map(item => (
              <div key={item._id} className='col-12 col-sm-12 col-md-6 col-lg-3 col-xl-2 custom-gutter'>
                <div className='item-container'>
                  <span className='category'>{getCate(item.categories)}</span>
                  <div className='thumb'>
                    <Link to={`/stories/${item._id}`}>
                      <img src={item.image && item.image.url || '/images/product_default_img.png'} />
                    </Link>
                  </div>
                  <div className='info'>
                    <Link to={`/stories/${item._id}`}>{item.title || 'Chưa cập nhật!'}</Link>
                    <p>
                      {
                        item.chapters && item.chapters.length > 0 &&
                        `${item.chapters.length} Chương`
                        ||
                        'Chưa có chương'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))
            ||
            <Warning alert='Không có truyện!' />
          }
        </div>
      </div>
    </div>
  )
}

export default StoriesList