"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "@/validation/authSchemas";
import { useAppDispatch } from "@/store/stores/hooks";
import { loginUser } from "@/store/auth/operations";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const initialValues = { email: "", password: "" };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(loginUser(values));
    router.push("/home");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form>
          <div className="flex flex-col gap-2.5 mb-[128px] md:mb-[62px]">
            <div>
              <Field
                className="input md:!w-[323px]"
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
              />
              <ErrorMessage className="error" name="email" component="div" />
            </div>
            <div>
              <Field
                className="input md:!w-[323px]"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage className="error" name="password" component="div" />
            </div>
          </div>
          <div className="md:w-[323px]">
            <button
              disabled={Object.keys(errors).length !== 0}
              type="submit"
              className="green rounded-[60px] py-3 flex justify-center items-center h-11 w-full text-white"
            >
              Log in
            </button>
            <Link
              href="/register"
              className="flex justify-center font-normal text-xs text-[rgba(29,30,33,0.4)] mt-3.5"
            >
              Don&apos;t have an account?
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
