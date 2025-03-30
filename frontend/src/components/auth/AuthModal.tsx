"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  registerValidationSchema,
  loginValidationSchema,
} from "@/validation/authSchemas";
import { useAppDispatch } from "@/store/stores/hooks";
import { registerUser, loginUser } from "@/store/auth/operations";
import { useState } from "react";
import Modal from "../layout/Modal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useAppDispatch();
  const [isRegistering, setIsRegistering] = useState(true);

  const registerInitialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const loginInitialValues = { email: "", password: "" };

  const handleSubmit = (
    values: typeof registerInitialValues | typeof loginInitialValues
  ) => {
    if (isRegistering) {
      dispatch(registerUser(values));
    } else {
      dispatch(loginUser(values));
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white w-[343px] rounded-[20px] flex flex-col items-center py-10 px-8 md:w-[463px] md:py-[50px] md:px-[70px]">
        <h5 className="font-semibold text-3xl mb-3.5">
          {isRegistering ? "Sign Up" : "Log In"}
        </h5>
        <p className="text-sm text-center text-[#6a6a6f] mb-6 md:text-base">
          {isRegistering
            ? "Before proceeding, please register on our site."
            : "Please login to your account before continuing."}
        </p>
        <Formik
          initialValues={
            isRegistering ? registerInitialValues : loginInitialValues
          }
          validationSchema={
            isRegistering ? registerValidationSchema : loginValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form>
              <div className="flex flex-col items-center gap-2.5 mb-5 md:flex-row md:flex-wrap">
                {isRegistering && (
                  <div>
                    <Field
                      className="input !w-[280px] md:!w-[323px]"
                      type="text"
                      name="name"
                      placeholder="User name"
                    />
                    <ErrorMessage
                      className="error"
                      name="name"
                      component="div"
                    />
                  </div>
                )}
                <div>
                  <Field
                    className="input !w-[280px] md:!w-[323px]"
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                  <ErrorMessage
                    className="error"
                    name="email"
                    component="div"
                  />
                </div>
                {isRegistering && (
                  <div>
                    <Field
                      className="input !w-[280px] md:!w-[323px]"
                      type="text"
                      name="phone"
                      placeholder="Phone number"
                    />
                    <ErrorMessage
                      className="error"
                      name="phone"
                      component="div"
                    />
                  </div>
                )}
                <div>
                  <Field
                    className="input !w-[280px] md:!w-[323px]"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    className="error"
                    name="password"
                    component="div"
                  />
                </div>
              </div>
              <div className="w-[280px] mt-6 md:w-[323px]">
                <button
                  disabled={Object.keys(errors).length !== 0}
                  type="submit"
                  className="green rounded-[60px] py-3 flex justify-center items-center h-11 w-full text-[#F0F0F0] !mb-3.5"
                >
                  {isRegistering ? "Sign Up" : "Log in"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="font-normal !mx-auto block !text-xs text-[rgba(29,30,33,0.4)] mt-3.5"
                >
                  {isRegistering
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
