import './ColorSelector.css';
import { useState } from 'react';
const ColorSelector = ({ colors = ['#D3D2D5', '#1D1F22', '#1C6B48'], onSelect }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    return (
        <div className="color-selector">
            <p className="selector-label">COLOR:</p>
            <div className="color-options">
                {colors.map((color) => (
                    <button
                        onClick={() => {
                            setSelectedColor(color);
                            onSelect(color);
                        }}
                        key={color}
                        className={`color-swatch ${color === selectedColor ? 'color-swatch-active' : ''}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;