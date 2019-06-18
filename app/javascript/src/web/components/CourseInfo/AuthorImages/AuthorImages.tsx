import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AuthorImages.module.css'

interface AuthorData {
  imageUrl: string
  id: string
}

interface Props {
  items: AuthorData[]
  size: number
}

const data = [{ id: 1 }, { id: 2 }, { id: 3 }]

const AuthorImages = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.items.map(author => (
        <span key={author.id} className={styles.imageContainer}>
          <Link to={`/users/${author.id}`}>
            <img
              width={props.size}
              className={styles.image}
              alt="Author"
              src="https://olympus.greatlearning.in/images/thumbnails/206098/k980GM7C2R2YuChz4R8teg7TxwhaFvnVHBQs4vFg"
            />
          </Link>
        </span>
      ))}
    </div>
  )
}

AuthorImages.defaultProps = {
  items: data,
  size: 40,
}

export default AuthorImages
