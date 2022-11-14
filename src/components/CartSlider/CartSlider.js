import { PureComponent } from 'react';
import styles from './CartSlider.module.css';

class CartSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
  }

  incrementSlide() {
    const { currentImg } = this.state;
    const { images } = this.props;
    if (currentImg < images.length - 1) {
      this.setState({
        currentImg: currentImg + 1,
      });
    }
  }

  decrementSlide() {
    const { currentImg } = this.state;
    if (currentImg > 1) {
      this.setState({
        currentImg: currentImg - 1,
      });
    }
  }

  render() {
    const { images } = this.props;
    const { currentImg } = this.state;

    return (
      <>
        <img className={styles.show} src={images[currentImg]} alt="Product" />
        {images.length > 1 && (
        <div className={styles.slide}>
          <button onClick={() => this.decrementSlide()} type="button">&lt;</button>
          <button onClick={() => this.incrementSlide()} type="button">&gt;</button>
        </div>
        )}
      </>
    );
  }
}

export default CartSlider;
