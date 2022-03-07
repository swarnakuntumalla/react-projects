import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {imageUrl, title, brand, price, rating} = productDetails
  return (
    <li className="similar-product">
      <img
        className="similar-product-img"
        alt={`similar product ${title}`}
        src={imageUrl}
      />
      <h1 className="similar-product-title">{title}</h1>
      <p className="similar-product-brand">by {brand}</p>
      <div className="similar-product-rating-container">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            className="star-img"
            alt="star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
