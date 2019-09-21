import React from "react";
import "./layout.css";
import { Field, reduxForm } from "redux-form";
import API from "./api";

class SimpleForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      fname: "",
      lname: "",
      phone: "",
      gender: "",
      mp_status: "",
      status_msg: ""
    };
  }

  _handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  _handleFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const setStateFunc = (err, msg) => {
      this.setState({ mp_status: err, status_msg: msg });
    };

    function isPhoneValid(p) {
      var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
      var digits = p.replace(/\D/g, "");
      return phoneRe.test(digits);
    }

    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var error = 1;

    if (re.test(this.state.email) === false) {
      error = 0;
      setStateFunc("error", "Have you put a correct mail ?");
    }
    if (!isPhoneValid(this.state.phone)) {
      error = 0;
      setStateFunc("error", "Your phone number is not in the right format");
    }
    if (!this.state.fname || !this.state.lname) {
      error = 0;
      setStateFunc("error", "Did you skip any name ?");
    }

    if (!this.state.gender) {
      error = 0;
      setStateFunc("error", "Have you selected a gender ?");
    }
    if (error === 1) {
      this.setState({
        mp_status: `sending`,
        status_msg: null
      });
      this._postEmailToMailchimpLambda(this.state);
    }
  };

  _postEmailToMailchimpLambda = subscriber => {
    /*In bigger systems we will need to be able to interchange the enviroment
   development, production, staging etc so it is good practice to expose that out here.
   */
    let subsriber_data = {
      subscriber
    };
      API.post("/dev", subsriber_data).then(res => {

        if (res.data.statusCode !== 200) {
          this.setState({
            mp_status: `error`,
            status_msg: 'Something went wrong check your details'
          });
        }
        if (res.data.errorMessage && res.data.errorMessage.includes("already a list member")) {
          this.setState({
            mp_status: `error`,
            status_msg: 'You have subscribed already!'
          });
        }

        if (res.data.statusCode === 200) {
            this.setState({
              mp_status: `success`,
              status_msg: null
            });
        }

      });
  };

  render() {
    return (
      <div>
        {this.state.mp_status === `error` && (
          <div className="wrapper">
            <span className="error-txt">{this.state.status_msg} </span>
          </div>
        )}

        {this.state.mp_status === `sending` ? (
          <div className="wrapper">
            <div className="ft-20">Sending Your details....</div>
          </div>
        ) : (
          ""
        )}
        {this.state.mp_status === `success` ? (
          <div className="wrapper">
            <span className="ft-20">
              Thank you! Youʼll receive your first email shortly.
            </span>
          </div>
        ) : (
          <div>
            <form id="email-capture" method="post" noValidate>
              <div>
                <label>First Name</label>
                <div>
                  <Field
                    className="input-dh"
                    name="fname"
                    component="input"
                    type="text"
                    placeholder="First Name"
                    onChange={this._handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Last Name</label>
                <div>
                  <Field
                    className="input-dh"
                    name="lname"
                    component="input"
                    type="text"
                    placeholder="Last Name"
                    onChange={this._handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Email</label>
                <div>
                  <Field
                    className="input-dh"
                    name="email"
                    component="input"
                    type="email"
                    placeholder="you@email.com"
                    onChange={this._handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Sex</label>
                <div>
                  <label>
                    <Field
                      name="gender"
                      component="input"
                      type="radio"
                      value="1"
                      onChange={this._handleChange}
                    />{" "}
                    Male
                  </label>
                  <label>
                    <Field
                      name="gender"
                      component="input"
                      type="radio"
                      value="0"
                      onChange={this._handleChange}
                    />{" "}
                    Female
                  </label>
                </div>
              </div>

              <div>
                <label>Phone Number </label> 
                <div>
                  <Field
                    className="input-dh"
                    name="phone"
                    component="input"
                    type="text"
                    placeholder="e.g (123) 456-7890 or 123-456-7890 or 1234567890  "
                    onChange={this._handleChange}
                  />
                </div>
              </div>

              <div className="wrapper">
                <button
                  className="icon-mail"
                  type="submit"
                  onClick={this._handleFormSubmit}
                >
                  Join our Mailing List !
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "simple"
})(SimpleForm);
