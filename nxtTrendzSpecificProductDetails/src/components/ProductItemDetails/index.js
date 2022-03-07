import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const views = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const initial = ''

class ProductItemDetails extends Component {
  state = {productItemDetails: initial, count: 1, view: initial}

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({view: views.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const productData = await response.json()
      const updatedProductsData = {
        id: productData.id,
        brand: productData.brand,
        description: productData.description,
        availability: productData.availability,
        price: productData.price,
        rating: productData.rating,
        imageUrl: productData.image_url,
        style: productData.style,
        title: productData.title,
        totalReviews: productData.total_reviews,
        similarProducts: productData.similar_products.map(eachProduct => ({
          id: eachProduct.id,
          brand: eachProduct.brand,
          description: eachProduct.description,
          availability: eachProduct.availability,
          price: eachProduct.price,
          rating: eachProduct.rating,
          imageUrl: eachProduct.image_url,
          style: eachProduct.style,
          title: eachProduct.title,
          totalReviews: eachProduct.total_reviews,
        })),
      }
      this.setState({
        productItemDetails: updatedProductsData,
        view: views.success,
      })
    } else {
      this.setState({view: views.failure})
    }
  }

  onDecreaseCount = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onIncreaseCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductItemDetails = () => {
    const {productItemDetails, count} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
      similarProducts,
    } = productItemDetails

    return (
      <div className="product-details-container">
        <div className="product-container">
          <img className="product-img" alt="product" src={imageUrl} />
          <div>
            <h1 className="product-title">{title}</h1>
            <p className="product-price">Rs {price}</p>
            <div className="rating-reviews-container">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  className="star-img"
                  alt="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                />
              </div>
              <div>
                <p>{totalReviews} Reviews</p>
              </div>
            </div>
            <p className="product-description">{description}</p>
            <p className="extra-details">
              <span className="extra-details-span">Available:</span>{' '}
              {availability}
            </p>
            <p className="extra-details">
              <span className="extra-details-span">Brand:</span> {brand}
            </p>
            <hr />
            <div className="count-container">
              <button
                onClick={this.onDecreaseCount}
                className="icon-btn"
                type="button"
                testid="minus"
              >
                <BsDashSquare className="react-icon" />
              </button>
              <p className="count">{count}</p>
              <button
                onClick={this.onIncreaseCount}
                className="icon-btn"
                type="button"
                testid="plus"
              >
                <BsPlusSquare className="react-icon" />
              </button>
            </div>
            <button className="add-to-cart" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <div>
          <h1 className="product-title">Similar Products</h1>
          <ul className="similar-product-list">
            {similarProducts.map(eachProduct => (
              <SimilarProductItem
                key={eachProduct.id}
                productDetails={eachProduct}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        className="error-view"
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      />
      <h1 className="product-title">Product Not Found</h1>
      <button
        onClick={this.continueShopping}
        type="button"
        className="add-to-cart"
      >
        Continue Shopping
      </button>
    </div>
  )

  renderView = () => {
    const {view} = this.state
    switch (view) {
      case views.success:
        return this.renderProductItemDetails()
      case views.failure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderView()}
      </>
    )
  }
}

export default ProductItemDetails
