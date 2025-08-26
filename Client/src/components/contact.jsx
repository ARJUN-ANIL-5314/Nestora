import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';




const ContactForm = () => {

  const API_URL = import.meta.env.VITE_API_URL


  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-left mb-4 text-dark-b">Contact us</h2>

      <Formik
        initialValues={{ name: "", mobile: "", message: "" }}
        validationSchema={Yup.object({
          name: Yup.string().min(3, "Too short!").required("Name is required"),
          mobile: Yup.string()
            .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
            .required("Mobile number is required"),
          message: Yup.string().min(10, "Message too short").required("Message is required"),
        })}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const response = await axios.post(`${API_URL}/contact-info`, values);
            console.log("Server Response:", response.data);
            toast.success("Thank you! Your message has been sent.");
            resetForm();
          } catch (error) {
            console.error("Failed to send data" );
             toast.error("Failed to send message. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Name Field */}
            <Field
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-dark-b rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />

            {/* Mobile Number Field (Numbers Only) */}
            <Field
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full px-3 py-2 border border-dark-b rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setFieldValue("mobile", e.target.value.replace(/\D/, ""))}
            />
            <ErrorMessage name="mobile" component="p" className="text-red-500 text-sm" />

            {/* Message Field */}
            <Field
              as="textarea"
              name="message"
              placeholder="Your Message"
              rows="3"
              className="w-full px-3 py-2 border border-dark-b rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage name="message" component="p" className="text-red-500 text-sm" />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="place-items-end bg-dark-b text-white font-semibold border-black border-[1px] py-2 px-4 rounded-lg hover:bg-blue-700 transition text-xm"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
