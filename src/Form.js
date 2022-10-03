import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';
import { Formik } from 'formik';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      urlKuerzel: '',
      street: '',
      zipnr: '',
      country: '',
      city: '',
      formErrors: {name: '', urlKuerzel: '', street: '', zipnr: '', country: '', city: ''},
      nameValid: false,
      urlKuerzelValid: false,
      streetValid: false,
      zipnrValid: false,
      countryValid: false,
      cityValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let urlKuerzelValid = this.state.urlKuerzelValid;
    let streetValid = this.state.streetValid;
    let zipnrValid = this.state.zipnrValid;
    let countryValid = this.state.countryValid;
    let cityValid = this.state.cityValid;

    switch(fieldName) {
      case 'name':
        nameValid = value.match(/^([a-zA-Z0-9]+)$/i);
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'urlKuerzel':
        urlKuerzelValid = value.match(/^([a-zA-Z0-9]+)$/i);
        fieldValidationErrors.urlKuerzel = urlKuerzelValid ? '': ' the URL is not valid';
        break;
      case 'street':  
        streetValid = value.match(/^([a-zA-Z0-9]+)$/i);
        fieldValidationErrors.street = streetValid ? '': ' is not valid';
        break;
      case 'zipnr':
        zipnrValid = value.match(/^([a-zA-Z0-9]+)$/i);
        fieldValidationErrors.zipnr = zipnrValid ? '': ' is not valid';
        break;
      case 'country':
        countryValid = value.match(/^([a-zA-Z0-9]+)$/i);
        fieldValidationErrors.country = countryValid ? '': ' is not valid';
        break;
      case 'city':
        cityValid = value.match(/^([a-zA-Z0-9]+)$/i);
        fieldValidationErrors.city = cityValid ? '': ' is not valid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    urlKuerzelValid: urlKuerzelValid,
                    streetValid: streetValid,
                    zipnrValid: zipnrValid,
                    countryValid: countryValid,
                    cityValid: cityValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.urlKuerzelValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="demoForm">
        <h2>Add new client</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <Formik
          initialValues={{ name: '', password: '' }}
          validate={values => {
            const errors = {};
              if (!values.name) {
                errors.name = 'Name required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.name)
              ) {
                errors.name = 'Invalid name';
              }
              return errors;
            }
          }
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
        {({
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
            <label class="fs-6 fw-semibold form-label mt-3" htmlFor="name">
              <span class="required">Name *</span>
            </label>
            <input 
              type="text" 
              required className="form-control" 
              class="form-control"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleUserInput}
            />
            {errors.name && touched.name && errors.name}
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.urlKuerzel)}`}>
            <label  class="fs-6 fw-semibold form-label mt-3" htmlFor="urlKuerzel">
              <span class="required">URL Abbreviation *</span>
            </label>
            <input 
              type="text"
              className="form-control" 
              class="form-control"
              name="urlKuerzel"
              placeholder="URL Abbreviation"
              value={this.state.urlKuerzel}
              onChange={this.handleUserInput}  
            />
            {errors.urlKuerzel && touched.urlKuerzel && errors.urlKuerzel}
          </div>
          {/* Begin adress */}
          <div class="form-div">
          <div className={`form-group ${this.errorClass(this.state.formErrors.city)}`}>
          <label class="fs-6 fw-semibold form-label mt-3" htmlFor="city">
              <span class="required">City</span>
            </label>
            <input 
              type="text" 
              className="form-control" 
              class="form-control"
              name="city"
              placeholder="Zurich"
              value={this.state.city}
              onChange={this.handleUserInput}  
            />
            {errors.city && touched.city && errors.city}
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.country)}`}>
          <label  class="fs-6 fw-semibold form-label mt-3" htmlFor="country">
            <span class="required">Country</span>
          </label>
          <select class="form-control" name="country">
            <option value="switzerland">Switzerland</option>
            <option value="germany">Germany</option>
            <option value="austria">Austria</option>
          </select>
          {errors.country && touched.country && errors.country}
          </div>
          </div>
          <div class="form-div">
          <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}>
          <label  class="fs-6 fw-semibold form-label mt-3" htmlFor="street">
              <span class="required">Street</span>
          </label>
          <input 
            type="text" 
            className="form-control" 
            class="form-control"
            name="street"
            placeholder="Bahnhofstrasse 1"
            value={this.state.street}
            onChange={this.handleUserInput}  
          />
          {errors.street && touched.street && errors.street}
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.zipnr)}`}>
          <label  class="fs-6 fw-semibold form-label mt-3" htmlFor="zipnr">
            <span class="required">Zip Nr.</span>
          </label>
          <input 
            type="text" 
            className="form-control" 
            class="form-control"
            name="zipnr"
            placeholder="8001"
            value={this.state.zipnr}
            onChange={this.handleUserInput}  
          />
          {errors.zipnr && touched.zipnr && errors.zipnr}
          </div>
          </div>
          {/* End adress */}
          <button type="submit" class="btn btn-primary" className="btn btn-primary" disabled={!this.state.formValid}>
            Add client
          </button>
        </form>
        )}
        </Formik>
      </form>
    )
  }
}

export default Form;
