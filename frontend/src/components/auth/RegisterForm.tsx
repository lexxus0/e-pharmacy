"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "@/validation/authSchemas";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { registerUser } from "@/store/auth/operations";
import Link from "next/link";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "", email: "", phone: "", password: "" };

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (isLoggedIn) redirect("/");

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(registerUser(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form>
          <div className="flex flex-col gap-2.5 mb-5 md:flex-row md:flex-wrap md:mb-[62px]">
            <div>
              <Field
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="User name"
              />
              <ErrorMessage className="error" name="name" component="div" />
            </div>
            <div>
              <Field
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
              />
              <ErrorMessage className="error" name="email" component="div" />
            </div>
            <div>
              <Field
                className="input"
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone number"
              />
              <ErrorMessage className="error" name="phone" component="div" />
            </div>
            <div>
              <Field
                className="input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage className="error" name="password" component="div" />
            </div>
          </div>
          <div className="md:w-[280px]">
            <button
              disabled={Object.keys(errors).length !== 0}
              type="submit"
              className="green rounded-[60px] py-3 flex justify-center items-center h-11 w-full text-white"
            >
              Register
            </button>
            <Link
              href="/login"
              className="flex justify-center font-normal text-xs text-[rgba(29,30,33,0.4)] mt-3.5"
            >
              Already have an account?
            </Link>
          </div>
          <div className="fixed bottom-[160px] right-[-60px]">
            <div className="absolute  top-0 right-[-10px] w-[166px] h-12 bg-[rgba(89,177,122,0.16)] rotate-[22deg] rounded-[20px_0_0_20px]"></div>
            <div className="absolute top-10 right-12 w-[166px] h-12 bg-[rgba(89,177,122,0.16)] rotate-[22deg] rounded-[20px_0_0_20px]"></div>
            <div className="absolute top-28 right-8 w-[166px] h-12 bg-[rgba(89,177,122,0.16)] rotate-[22deg] rounded-[20px_0_0_20px]"></div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
