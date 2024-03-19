"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { cart } from "@/app/page";

const Checkout: NextPage = () => {
    console.log(cart)
    return (
        <div>
            CheckoutPage
            
        </div>
    );
}
export default Checkout;
