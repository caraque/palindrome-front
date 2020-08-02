import React, {Component} from "react";
import './Product.scss';

class Product extends Component {

    constructor(props) {
        super(props);
        this.brand = this.props.product.brand;
        this.image = this.props.product.image;
        this.price = this.props.product.price;
        this.description = this.props.product.description;
        this.isPalindrome = this.props.isPalindrome;
    }

    render() {
        return (
            <div className="product-container">
                <div className="image-container">
                    <img src={`http://${this.image}`} alt={this.brand} className="product-image"/>
                </div>
                <div className="text-container">
                    <div>
                        <strong>{this.brand}</strong> {this.description}
                    </div>
                    <div>
                        <strong>${new Intl.NumberFormat('es-CL').format(this.price)}</strong>
                        {this.isPalindrome ? <div className="off-50">50%</div> : null}
                    </div>
                    <div>Precio anterior si es descuento</div>
                    <div>Despacho - Retiro</div>
                    <button className="btn btn-primary">Agregar</button>
                </div>
            </div>
        );
    }
}

export default Product;