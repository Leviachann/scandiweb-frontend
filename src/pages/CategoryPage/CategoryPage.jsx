import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CategoryPage.css";
import ProductCard from "../../components/ProductCard/productCard";
import { graphqlFetch } from "../../utils/graphql";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { addToCart } = useOutletContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let fetchedProducts = [];

      if (categoryName === 'all') {
        const query = `
                query {
                    products {
                        id
                        name
                        inStock
                        brand
                        gallery
                        category
                        attributes {
                            id
                            name
                            type
                            items {
                                id
                                display_value
                                value
                            }
                        }
                        prices {
                            amount
                            currency_label
                            currency_symbol
                        }
                    }
                }
            `;
        const res = await graphqlFetch(query);
        fetchedProducts = res.data.products;
      } else {
        const query = `
    query GetCategory($name: String!) {
        category(name: $name) {
            products {
                id
                name
                inStock
                brand
                gallery
                attributes {
                    id
                    name
                    type
                    items {
                        id
                        display_value
                        value
                    }
                }
                prices {
                    amount
                    currency_label
                    currency_symbol
                }
            }
        }
    }
`;
        const res = await graphqlFetch(query, { name: categoryName });
        console.log(res);
        fetchedProducts = res.data.category.products;
      }

      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [categoryName]);
  return (
    <div className="main-category">
      <h1 className="category-title">{categoryName}</h1>
      <div className="product-grid">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;