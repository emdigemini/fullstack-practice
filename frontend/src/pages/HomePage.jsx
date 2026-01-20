const HomePage = () => {
  return (
    <div className="homepage">
      <div className="home__headline">
        <h2>BAKE BY KSANTI</h2>
      </div>
      <div className="home__gallery">
        <div className="home__image">
          <img src="/images/biscotti.jpg" alt="" />
        </div>
        <div className="home__image center">
          <div className="center__image">
            <img src="/images/canelle.webp" alt="" />
          </div>
          <div className="center__image">
            <img src="/images/canelle.jpg" alt="" />
          </div>
        </div>
        <div className="home__image">
          <img src="/images/butterkuchen.jpeg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default HomePage