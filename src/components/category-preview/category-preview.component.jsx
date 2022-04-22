import ProductCard from "../products-card/product-card.component";
import "./category-preview.styles.scss";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
      <Link className="title" to={title}>
        <span className="title">{title.toUpperCase()}</span>
      </Link>
      </h2>

      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product= {product}/>
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;