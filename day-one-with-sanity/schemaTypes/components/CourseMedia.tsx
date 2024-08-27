import React from 'react'

interface Image {
  asset: {
    url: string
  }
}

interface Presenter {
  _id: string
  name: string
  photo: Image
}

interface CourseMediaProps {
  image: Image
  presenters: Presenter[]
}

const CourseMedia: React.FC<CourseMediaProps> = ({image, presenters}) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {image && (
        <img
          src={image.asset.url}
          alt="Exercise Image"
          style={{borderRadius: '50%', marginRight: '8px', width: '40px', height: '40px'}}
        />
      )}
      {presenters && presenters.length > 0 && (
        <div style={{display: 'flex', alignItems: 'center'}}>
          {presenters.map((presenter) => (
            <img
              key={presenter._id}
              src={presenter.photo.asset.url}
              alt={presenter.name}
              style={{
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                marginLeft: '-8px',
                border: '2px solid white',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseMedia
