import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputKey: "", isChecked: false}
    }

    changeData(name, value) {
        console.log(name, value);
        this.setState({name: value});
    }

    changeKeyword(value) {
        console.log(value);
        this.setState({inputKey: value});
    }

    changeCheckbox(value) {
        console.log(value);
        this.setState({isChecked: value});
    }

    render() {
        let keyword = this.state.inputKey;
        let isChecked = this.state.isChecked;
        let products = this.props.products;
        return (
            <div>
                <SearchBar input={keyword} isChecked={isChecked}
                           onKeywordChange={value => this.changeKeyword(value)}
                           onCheckboxChange={value => this.changeCheckbox(value)}/>
                <ProductTable inputKey={keyword} isChecked={isChecked} products={products}/>
            </div>
        )

    }
}


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    onInputChange(e) {
        this.props.onKeywordChange(e.target.value);
    }

    onCheckboxChange(e) {
        this.props.onCheckboxChange(!this.props.isChecked);
    }

    render() {
        let inputKey = this.props.input;
        let isChecked = this.props.isChecked;
        return (
            <form>
                <input type="text" placeholder="Search..." value={inputKey} onChange={e => {
                    this.onInputChange(e)
                }}/>
                <p>
                    <input type="checkbox" checked={isChecked} onChange={e => {
                        this.onCheckboxChange(e)
                    }}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        console.log("Football".indexOf("ball"));
    }

    render() {
        let data = this.props.products;
        let rows = [];
        let lastCategory = null;
        data.forEach(product => {
                if (this.props.isChecked && !product.stocked)
                    return;
                if (this.props.inputKey !== ""&&this.props.inputKey!==undefined && product.name.indexOf(this.props.inputKey) === -1) {
                    return;
                }
                if (product.category != lastCategory) {
                    rows.push(<ProductTitleRow title={product.category} key={product.category}/>);
                }
                rows.push(<ProductDetailRow product={product} key={product.name}/>);
                lastCategory = product.category;
            }
        )
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class ProductTitleRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let title = this.props.title;
        return (<tr>
            <th colSpan="2">{title}</th>
        </tr>);
    }
}

class ProductDetailRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;
        let name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
        {product.name}
      </span>;
        return (<tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>);
    }
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('root')
);
