import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const PaymentForm = ({ onSubmit }) => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .required('Card number is required')
      .matches(/^\d{16}$/, 'Card number must be 16 digits'),
    expiryDate: Yup.string()
      .required('Expiry date is required')
      .matches(/^\d{2}\/\d{2}$/, 'Expiry date must be in MM/YY format'),
    cvv: Yup.string()
      .required('CVV is required')
      .matches(/^\d{3}$/, 'CVV must be 3 digits'),
  });

  return (
    <Formik
      initialValues={{ cardNumber: '', expiryDate: '', cvv: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <Field name="cardNumber" type="text" />
            {errors.cardNumber && touched.cardNumber && <div>{errors.cardNumber}</div>}
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date</label>
            <Field name="expiryDate" type="text" />
            {errors.expiryDate && touched.expiryDate && <div>{errors.expiryDate}</div>}
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <Field name="cvv" type="text" />
            {errors.cvv && touched.cvv && <div>{errors.cvv}</div>}
          </div>
          <button type="submit">Pay Now</button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
