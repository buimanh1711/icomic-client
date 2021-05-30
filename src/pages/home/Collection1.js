import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleLoading } from '../../redux/actions/web.actions'
import { getAllStories } from '../../services/stories.services'
import getCate from '../../utils/getCategory'

const Collection1 = () => {
  const [stories, setStories] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(toggleLoading(false))
    getAllStories({ sort: '-createdAt' }, true)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(toggleLoading(false))
          setStories(res.data.stories)
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => dispatch(toggleLoading(false)))
  }, [])

  return (
    <div className='collection1'>
      {
        stories && stories.length >= 5 &&
        <div className='collection1-container'>
          <div className='row'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-lx-3'>
              <div className='extra-item'>
                <span className='category'>{getCate(stories[0] && stories[0].categories)}</span>
                <Link to={`/stories/${stories[0]._id}`}>
                  <div style={{ backgroundImage: `url(${stories[0].image && stories[0].image.url || '/images/product_default_img.png'})` }} className='image-wrapper'>
                    <div className='title'>
                      <span>{stories[0].title}</span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className='extra-item'>
                <span className='category'>{stories[1] && getCate(stories[1].categories)}</span>
                <Link to={`/stories/${stories[1]._id}`}>
                  <div style={{ backgroundImage: `url(${stories[1].image && stories[1].image.url || '/images/product_default_img.png'})` }} className='image-wrapper'>
                    <div className='title'>
                      <span>{stories[1].title}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-lx-6' style={{ position: 'relative' }}>
              <div className='main-item'>
                <span className='category'>{stories[2] && getCate(stories[2].categories)}</span>
                <Link to={`/stories/${stories[2]._id}`}>
                  <div style={{ backgroundImage: `url(${stories[2].image && stories[2].image.url || '/images/product_default_img.png'})` }} className='image-wrapper'>
                    <div className='title'>
                      <span>{stories[2].title}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-lx-3'>
              <div className='extra-item'>
                <span className='category'>{stories[3] && getCate(stories[3].categories)}</span>
                <Link to={`/stories/${stories[3]._id}`}>
                  <div style={{ backgroundImage: `url(${stories[3].image && stories[3].image.url || '/images/product_default_img.png'})` }} className='image-wrapper'>
                    <div className='title'>
                      <span>{stories[3].title}</span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className='extra-item'>
                <span className='category'>{stories[4] && getCate(stories[4].categories)}</span>
                <Link to={`/stories/${stories[4]._id}`}>
                  <div style={{ backgroundImage: `url(${stories[4].image && stories[4].image.url || '/images/product_default_img.png'})` }} className='image-wrapper'>
                    <div className='title'>
                      <span>{stories[4].title}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      }
    </div>
  )
}

export default Collection1
