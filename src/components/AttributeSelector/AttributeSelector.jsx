import './AttributeSelector.css';

const AttributeSelector = ({ attribute, selectedValue, onSelect }) => {
    return (
        <div
            className="attribute-selector"
            data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <p className="selector-label">{attribute.name.toUpperCase()}:</p>
            <div className="attribute-options">
                {attribute.items.map((item) => (
                    attribute.type === 'swatch' ? (
                        <button
                            key={item.id}
                            className={`color-swatch ${item.value === selectedValue ? 'color-swatch-active' : ''}`}
                            style={{ backgroundColor: item.value }}
                            onClick={() => onSelect(item.value)}
                        />
                    ) : (
                        <button
                            key={item.id}
                            className={`size-btn ${item.value === selectedValue ? 'size-btn-active' : ''}`}
                            onClick={() => onSelect(item.value)}
                        >
                            {item.display_value}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};

export default AttributeSelector;