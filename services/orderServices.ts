import api from "@/helper/axios";

export const initializePayment = async (items: any) => {
    const response = await api.post(
        "/api/payment/initialize",
        { items }
    );

    return response.data;
};

export const verifyPayment = async (reference: string) => {
    const response = await api.post(
        "/api/payment/verify",
        { reference }
    );

    return response.data;
};