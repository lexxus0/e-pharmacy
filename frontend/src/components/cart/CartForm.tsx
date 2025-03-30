"use client";

import { ICart } from "@/interfaces/interfaces";
import { checkout } from "@/store/cart/operations";
import { selectCartItems } from "@/store/cart/selectors";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { cartValidationSchema } from "@/validation/cartSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CartForm() {
  const [picked, setPicked] = useState("cashOnDelivery");
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce(
      (sum: number, item: ICart) =>
        sum + item.medicineId.price * (item.quantity || 1),
      0
    );
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="px-5 pt-5 pb-10 rounded-3xl bg-white  md:px-20 xxl:px-10 xxl:w-[628px] mb-15.5">
      <h5 className="font-semibold text-base text-[#1d1e21] mb-3 md:text-xl ">
        Enter shipping info
      </h5>
      <p className="text-sm text-[#6a6a6f] mb-10 md:text-base">
        Enter your delivery address where you get the product. You can also send
        any other location where you send the products.
      </p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
          paymentMethod: "cashOnDelivery",
        }}
        validationSchema={cartValidationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(checkout(values));
          toast.message("Cart has been submitted", {
            description: "We'll contact you via email.",
          });
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div className="cartForm relative flex flex-col gap-3 pb-10 md:flex-row md:gap-3.5 md:flex-wrap ">
              <div className="md:flex flex-col">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="cartInput"
                  placeholder="Enter text"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="md:flex flex-col">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  placeholder="Enter text"
                  name="email"
                  className="cartInput"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="md:flex flex-col">
                <label htmlFor="phone" className="label">
                  Phone
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter text"
                  className="cartInput"
                />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>

              <div className="md:flex flex-col">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter text"
                  className="cartInput"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <div className="cartForm relative mt-10 pb-10">
              <h5 className="font-semibold text-base text-[#1d1e21] mb-3 md:text-xl">
                Payment method
              </h5>
              <p className="text-sm text-[#6a6a6f] mb-5 md:text-base">
                You can pay us in a multiple way in our payment gateway system.
              </p>
              <div className="flex flex-col gap-2">
                <label
                  className={`inline-flex cursor-pointer items-center text-sm ${
                    picked === "cashOnDelivery"
                      ? "text-[#1d1e21]"
                      : "text-[rgba(29,30,33,0.6)]"
                  }`}
                >
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    className="cursor-pointer hidden"
                    onClick={() => setPicked("cashOnDelivery")}
                  />
                  <div
                    className={`w-5 h-5 border-2 flex items-center justify-center rounded-full ${
                      picked === "cashOnDelivery"
                        ? "border-green-300"
                        : "text-[rgba(29,30,33,0.2)]"
                    }`}
                  >
                    {picked === "cashOnDelivery" && (
                      <div className="w-2.5 h-2.5 bg-green-300 rounded-full"></div>
                    )}
                  </div>
                  <span className="ml-2">Cash On Delivery</span>
                </label>

                <label
                  className={`inline-flex cursor-pointer items-center text-sm ${
                    picked === "bank"
                      ? "text-[#1d1e21]"
                      : "text-[rgba(29,30,33,0.6)]"
                  }`}
                >
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    className="cursor-pointer hidden"
                    onClick={() => setPicked("bank")}
                  />
                  <div
                    className={`w-5 h-5 border-2 flex items-center justify-center rounded-full ${
                      picked === "bank"
                        ? "border-green-300"
                        : "text-[rgba(29,30,33,0.2)]"
                    }`}
                  >
                    {picked === "bank" && (
                      <div className="w-2.5 h-2.5 bg-green-300 rounded-full"></div>
                    )}
                  </div>
                  <span className="ml-2">Bank</span>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <h5 className="font-semibold text-base text-[#1d1e21] mb-3 md:text-xl">
                Order details
              </h5>
              <p className="text-sm text-[#6a6a6f] mb-5 md:text-base">
                Shipping and additionnal costs are calculated based on values
                you have entered.
              </p>
            </div>

            <div className="bg-[#e7f1ed] flex justify-between items-center px-4.5 py-3.5 rounded-[8px] font-semibold text-base my-5 md:text-lg">
              <p>Total:</p>
              <p>৳ {total.toFixed(2)}</p>
            </div>

            <div>
              <button
                type="submit"
                className="green rounded-[60px] text-white px-8 py-3"
              >
                Place order
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
