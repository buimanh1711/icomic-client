import { useDispatch, useSelector } from "react-redux"
import StoriesList from "../../global/List"
import Collection1 from "./Collection1"
import Collection2 from "./Collection2"
import { useEffect } from "react"
import { getAllStoriesAsync } from "../../redux/actions/stories.action"

const Home = () => {
  const { stories } = useSelector(state => state.stories)
  const completed = stories.filter(x => x.isCompleted)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllStoriesAsync({ sort: '-createdAt', page: -1 }, true))
  }, [dispatch])

  return (
    <div id='home'>
      <div className='home-container'>
        <div className='container'>
          <Collection1 />
          <Collection2 />
          <div className='comleted-list'>
            <h4 style={{marginBottom: -12, marginTop: 32, fontWeight: 'bold', color: 'var(--primary-color)'}}>Truyện đã hoàn thành</h4>
            <StoriesList stories={completed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home