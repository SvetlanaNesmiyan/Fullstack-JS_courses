import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Ім\'я повинно містити мінімум 2 символи')
        .max(50, 'Ім\'я повинно містити максимум 50 символів')
        .required('Ім\'я є обов\'язковим'),
      email: Yup.string()
        .email('Неправильний формат електронної пошти')
        .required('Електронна пошта є обов\'язковою'),
      phone: Yup.string()
        .matches(/^\+?[\d\s()-]{10,}$/, 'Неправильний формат номера телефону')
        .required('Номер телефону є обов\'язковим'),
      birthDate: Yup.date()
        .max(new Date(), 'Дата народження не може бути в майбутньому')
        .required('Дата народження є обов\'язковою'),
      message: Yup.string()
        .min(10, 'Повідомлення повинно містити мінімум 10 символів')
        .required('Повідомлення є обов\'язковим')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Дані форми:', values);
      alert('Форму успішно відправлено!\n\nДані:\n' + 
        `Ім'я: ${values.name}\n` +
        `Email: ${values.email}\n` +
        `Телефон: ${values.phone}\n` +
        `Дата народження: ${values.birthDate}\n` +
        `Повідомлення: ${values.message}`);
      resetForm();
    }
  });

  return (
    <div className="form-container">
      <h2>Зворотній зв'язок</h2>
      <p className="form-description">
        Залиште свої контактні дані, і ми зв'яжемося з вами найближчим часом.
      </p>
      
      <form onSubmit={formik.handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">
            Ім'я <span className="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
            className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
            aria-describedby={formik.touched.name && formik.errors.name ? 'name-error' : undefined}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message" id="name-error" role="alert">
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Електронна пошта <span className="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
            aria-describedby={formik.touched.email && formik.errors.email ? 'email-error' : undefined}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message" id="email-error" role="alert">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Номер телефону <span className="required">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...formik.getFieldProps('phone')}
            className={formik.touched.phone && formik.errors.phone ? 'input-error' : ''}
            aria-describedby={formik.touched.phone && formik.errors.phone ? 'phone-error' : undefined}
            placeholder="+38 (000) 000-00-00"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error-message" id="phone-error" role="alert">
              {formik.errors.phone}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">
            Дата народження <span className="required">*</span>
          </label>
          <input
            id="birthDate"
            type="date"
            {...formik.getFieldProps('birthDate')}
            className={formik.touched.birthDate && formik.errors.birthDate ? 'input-error' : ''}
            aria-describedby={formik.touched.birthDate && formik.errors.birthDate ? 'birthDate-error' : undefined}
          />
          {formik.touched.birthDate && formik.errors.birthDate ? (
            <div className="error-message" id="birthDate-error" role="alert">
              {formik.errors.birthDate}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Повідомлення <span className="required">*</span>
          </label>
          <textarea
            id="message"
            rows="5"
            {...formik.getFieldProps('message')}
            className={formik.touched.message && formik.errors.message ? 'input-error' : ''}
            aria-describedby={formik.touched.message && formik.errors.message ? 'message-error' : undefined}
            placeholder="Ваше повідомлення..."
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="error-message" id="message-error" role="alert">
              {formik.errors.message}
            </div>
          ) : null}
        </div>

        <button type="submit" className="submit-btn">
          Відправити
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
