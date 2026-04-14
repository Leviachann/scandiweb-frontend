import { useOutletContext, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import AttributeSelector from '../../components/AttributeSelector/AttributeSelector';
import AddToCartButton from '../../components/Addtocartbutton/Addtocartbutton';
import { graphqlFetch } from '../../utils/graphql';
import './ProductPage.css';

const parseHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.body.childNodes).map((node, i) => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
            const Tag = node.tagName.toLowerCase();
            return (
                <Tag key={i}>
                    {Array.from(node.childNodes).map((child, j) => {
                        if (child.nodeType === Node.TEXT_NODE) {
                            return child.textContent;
                        }
                        if (child.nodeType === Node.ELEMENT_NODE) {
                            const ChildTag = child.tagName.toLowerCase();
                            return (
                                <ChildTag key={j}>
                                    {Array.from(child.childNodes).map((grandchild, k) => {
                                        if (grandchild.nodeType === Node.TEXT_NODE) {
                                            return grandchild.textContent;
                                        }
                                        if (grandchild.nodeType === Node.ELEMENT_NODE) {
                                            const GrandTag = grandchild.tagName.toLowerCase();
                                            return <GrandTag key={k}>{grandchild.textContent}</GrandTag>;
                                        }
                                        return null;
                                    })}
                                </ChildTag>
                            );
                        }
                        return null;
                    })}
                </Tag>
            );
        }
        return null;
    });
};

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useOutletContext();
    const [product, setProduct] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const query = `
                query GetProduct($id: String!) {
                    product(id: $id) {
                        id
                        name
                        inStock
                        brand
                        description
                        gallery
                        prices {
                            amount
                            currency_label
                            currency_symbol
                        }
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
                    }
                }
            `;
            const res = await graphqlFetch(query, { id });
            setProduct(res.data.product);
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;
    const isSelectionValid = product.inStock && (
        product.attributes.length === 0 ||
        product.attributes.every(attr => selectedOptions[attr.name])
    );

    return (
        <div className="product-page">
            <div className="product-page-inner">
                <div data-testid="product-gallery">
                    <ProductGallery images={product.gallery} />
                </div>

                <div className="product-info">
                    <h1 className="product-name">{product.name}</h1>

                    {product.attributes.map(attr => (
                        <AttributeSelector
                            key={attr.id}
                            attribute={attr}
                            selectedValue={selectedOptions[attr.name]}
                            onSelect={(value) =>
                                setSelectedOptions(prev => ({ ...prev, [attr.name]: value }))
                            }
                        />
                    ))}

                    <div className="product-price-block">
                        <p className="price-label">PRICE:</p>
                        <p className="price-value">
                            ${product.prices[0].amount.toFixed(2)}
                        </p>
                    </div>

                    <AddToCartButton
                        data-testid="add-to-cart"
                        disabled={!isSelectionValid}
                        onClick={() => addToCart(product, selectedOptions)}
                    />

                    <div
                        className="product-description"
                        data-testid="product-description"
                    >
                        {parseHtml(product.description)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;