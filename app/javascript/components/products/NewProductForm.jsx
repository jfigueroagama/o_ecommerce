import React from 'react';
import PropTypes from 'prop-types';

import { inputClasses } from '../../shared/helpers';
import ErrorMessages from '../shared/ErrorMessages';

class NewProductForm extends React.Component {
	// To submit the form we need to create the state form in the constructor
	state = {
		name: '',
		description: '',
		price: '',
		quantity: '',
		errors: {}
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const { name, description, quantity, price } = this.state;

		const newProduct = {
			name: name,
			description: description,
			quantity: quantity,
			price: price
		};

		this.props.onSubmit(newProduct);

		this.setState({
			name: '',
			description: '',
			quantity: '',
			price: ''
		});
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
		this.clearErrors(name, value);
	};

	clearErrors = (name, value) => {
		let errors = { ...this.state.errors };

		switch (name) {
			case 'name':
				if (value.length > 0) {
					delete errors['name'];
				}
				break;
			case 'description':
				if (value.length > 0) {
					delete errors['description'];
				}
				break;
			case 'price':
				if (parseFloat(value) > 0.0 || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
					delete errors['price'];
				}
				break;
			case 'quantity':
				if (parseInt(value, 10) > 0 || value.match(/^\d{1,}$/)) {
					delete errors['quantity'];
				}
				break;
			default:
		}
		this.setState({ errors });
	};

	checkErrors = (state, fieldName) => {
		const error = {};

		switch (fieldName) {
			case 'name':
				if (!state.name) {
					error.name = 'Please provide a name';
				}
				break;
			case 'description':
				if (!state.description) {
					error.description = 'Please provide a description';
				}
				break;
			case 'price':
				if (parseFloat(state.price) <= 0.0 || !state.price.toString().match(/^\d{1,}(\.\d{0,2})?$/)) {
					error.price = 'Price has to be a positive number';
				}
				break;
			case 'quantity':
				if (parseInt(state.quantity, 10) <= 0 || !state.quantity.toString().match(/^\d{1,}$/)) {
					error.quantity = 'Quantity has to be a positive whole number';
				}
				break;
		}
		return error;
	};

	handleBlur = (event) => {
		// We pass each input field as 'name'
		const { name } = event.target;
		const fieldError = this.checkErrors(this.state, name);
		const errors = Object.assign({}, this.state.errors, fieldError);
		this.setState({ errors });
	};

	render() {
		const buttonText = 'Create Product';
		const title = 'Add New Product';
		return (
			<div className="container mb-4">
				<div className="row">
					<div className="col-md-8 offset-md-2">
						<div className="card panel-div">
							<h1 className="text-center form-header-style pt-2 pb-3">{title}</h1>

							<div className="form-body-style px-5 pt-4">
								<form className="form-horizontal" onSubmit={this.handleSubmit}>
									<div className="form-group row">
										<label htmlFor="name" className="col-md-3 col-form-label">
											Name
										</label>
										<div className="col-md-9">
											<input
												type="text"
												name="name"
												value={this.state.name}
												onChange={this.handleChange}
												onBlur={this.handleBlur}
												id="name"
												className="form-control"
												placeholder="Item name"
												autoFocus={true}
											/>
											{this.state.errors.name ? (
												<div className="field-with-errors" style={{ color: 'red' }}>
													{this.state.errors.name}
												</div>
											) : null}
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="price" className="col-md-3 col-form-label">
											Price
										</label>
										<div className="col-md-9">
											<input
												type="text"
												name="price"
												value={this.state.price}
												onChange={this.handleChange}
												onBlur={this.handleBlur}
												id="price"
												className="form-control"
												placeholder="Item price"
											/>
											{this.state.errors.price ? (
												<div className="field-with-errors" style={{ color: 'red' }}>
													  {this.state.errors.price}
												</div>
											) : null}
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="quantity" className="col-md-3 col-form-label">
											Quantity
										</label>
										<div className="col-md-9">
											<input
												type="number"
												name="quantity"
												value={this.state.quantity}
												onChange={this.handleChange}
												onBlur={this.handleBlur}
												id="quantity"
												className="form-control"
												placeholder="Item quantity"
											/>
											{this.state.errors.quantity ? (
												<div className="field-with-errors" style={{ color: 'red' }}>
													{this.state.errors.quantity}
												</div>
											) : null}
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="description" className="col-md-3 col-form-label">
											Description
										</label>
										<div className="col-md-9">
											<textarea
												name="description"
												value={this.state.description}
												onChange={this.handleChange}
												onBlur={this.handleBlur}
												id="description"
												className="form-control"
												placeholder="Item description here"
												rows="5"
											/>
											{this.state.errors.description ? (
												<div className="fiels-with-errors" style={{ color: 'red' }}>
													{this.state.errors.description}
												</div>
											) : null}
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="image" className="col-md-3 col-form-label">
											Image
										</label>
										<div className="col-md-9">
											<input type="file" name="image" id="image" className="form-control" />
										</div>
									</div>

									<div className="form-group row">
										<div className="col-md-9 offset-md-3">
											<input
												type="submit"
												className="btn btn-outline-purple"
												value={buttonText}
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

NewProductForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	serverErrors: PropTypes.array.isRequired,
	saved: PropTypes.bool.isRequired,
	onResetSaved: PropTypes.func.isRequired
};

export default NewProductForm;
