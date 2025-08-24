import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'reqres-free-v1';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password:
    "Password must be at least 8 chars and include upper/lowercase, a number and a symbol",
  terms: "You must accept the terms to continue",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const history = useHistory();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (pwd) =>
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(pwd);

   useEffect(() => {
      const ok =
       !!validateEmail(form.email) &&
       validatePassword(form.password) &&
       form.terms;
     setIsValid(ok);
   }, [form]);

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: !validateEmail(value) }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: !validatePassword(value) }));
    }
    if (name === "terms") {
      setErrors((prev) => ({ ...prev, terms: !value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/main');
        } else {
          history.push('/error');
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <FormFeedback>{errorMessages.terms}</FormFeedback>}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
