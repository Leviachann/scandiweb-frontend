import './AttributeSelector.css';

const AttributeSelector = ({ attribute, selectedValue, onSelect }) => {
    const attrKebab = attribute.name.toLowerCase().replace(/\s+/g, '-');

    return (
        <div 
            className="attribute-selector"
            data-testid={`product-attribute-${attrKebab}`}
        >
            <p className="selector-label">{attribute.name.toUpperCase()}:</p>
            <div className="attribute-options">
                {attribute.items.map((item) => {
                    const testId = `product-attribute-${attrKebab}-${item.value}`;

                    return attribute.type === 'swatch' ? (
                        <button
                            key={item.id}
                            data-testid={testId}
                            className={`color-swatch ${item.value === selectedValue ? 'color-swatch-active' : ''}`}
                            style={{ backgroundColor: item.value }}
                            onClick={() => onSelect(item.value)}
                            aria-label={`${attribute.name} ${item.display_value}`}
                        />
                    ) : (
                        <button
                            key={item.id}
                            data-testid={testId}
                            className={`size-btn ${item.value === selectedValue ? 'size-btn-active' : ''}`}
                            onClick={() => onSelect(item.value)}
                        >
                            {item.display_value}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AttributeSelector;
