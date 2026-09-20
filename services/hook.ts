import { useMutation } from "@tanstack/react-query"
import { createOrder, paymentInitializer } from "./authServices"

export const useOrder = () => {
    return useMutation({
        mutationFn: createOrder,
    });
};

export const usePayment = () => {
    return useMutation({
        mutationFn: paymentInitializer,
    });
};