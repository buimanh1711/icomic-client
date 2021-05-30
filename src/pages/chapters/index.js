import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { toggleLoading } from "../../redux/actions/web.actions"
import { getOneChapter } from "../../services/chapters.services"
import { getAllChaptersAsync } from "../../redux/actions/chapters.actions"

const Chapter = () => {
  const { _id, chap, storyId } = useParams()
  const { chapters } = useSelector(state => state.chapters)
  const currentIndex = chapters.findIndex(x => x._id === _id)
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const next = currentIndex < (chapters.length - 1) ? chapters[currentIndex + 1] : null

  const dispatch = useDispatch()
  const [chapter, setChapter] = useState({})

  useEffect(() => {
    dispatch(toggleLoading(true))
    getOneChapter(_id)
      .then(res => {
        if (res.data && res.data.status) {
          setChapter(res.data.chapter)
          dispatch(toggleLoading(false))
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => dispatch(toggleLoading(false)))
  }, [_id])

  useEffect(() => {
    dispatch(getAllChaptersAsync({ story: storyId }, true))
  }, [dispatch, storyId])

  return (
    <div className='chapter-detail'>
      <div className='container'>
        {
          prev &&
          <Link className='change-btn prev-btn' to={`/chapters/${storyId}/${prev && prev._id}/${currentIndex}`}><i className="fas fa-step-backward"></i></Link>
        }
        {
          next &&
          <Link className='change-btn next-btn' to={`/chapters/${storyId}/${next && next._id}/${currentIndex + 2}`}><i className="fas fa-step-forward"></i></Link>
        }
        <h1 className='story'>{chapter.story && chapter.story.title}</h1>
        <h2 className='chap'>Chương {chap}: {chapter.name}</h2>
        <div dangerouslySetInnerHTML={{ __html: chapter.content || 'updating...' }}>
        </div>
      </div>
    </div>
  )
}

export default Chapter