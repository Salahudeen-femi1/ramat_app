import { Linking, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { useOrder, usePayment } from "@/services/hook";
import { useCart } from "@/context/CartContext";

interface Props {
    orderId: string;
}

export default function PaymentMethod({ orderId }: Props) {

    const [selectedMethod, setSelectedMethod] = useState("moniepoint")
    const [pickupTime, setPickupTime] = useState('')

    const orderMutation = useOrder()
    const paymentMutation = usePayment()
    const { cartItems } = useCart()

    const paymentURL ="" 

    const totalAmount = cartItems.reduce((total, item) => {
        const itemPrice = Number(String(item.price).replace(/,/g, "")) || 0
        const extrasPrice = item.extras.reduce(
            (sum, extra) => sum + (Number(String(extra.price).replace(/,/g, "")) || 0),
            0
        )
        return total + (itemPrice + extrasPrice) * item.quantity
    }, 0)

    const initializePayment = async () => {

        try {
            if (cartItems.length === 0) {
                throw new Error("Your cart is empty.")
            }
            const items = cartItems.map((item) => {
                if (!item.id) {
                    throw new Error(`Product ID is missing for ${item.name}. Remove it and add it to your cart again.`)
                }
                return {
                    menuItem: item.id,
                    itemType: "menu",
                    quantity: item.quantity,
                    selectedExtras: item.extras.map((extra) => ({
                        name: extra.name ?? extra.label ?? "",
                        price: Number(extra.price),
                    })),
                }
            })

            const order = await orderMutation.mutateAsync({
                pickupTime,
                items,
            });

            const orderId = order.orderId;
            if (!orderId) {
                throw new Error("Order was created, but the server response did not include an order ID.")
            }

            const payment = await paymentMutation.mutateAsync({
                orderId,
                amount: String(totalAmount),
            })

            await Linking.openURL(payment.checkoutUrl)
            console.log("PAYMENT RESPONSE:", payment);

        } catch (error) {
            console.log("payment failed", error)
        }

    }

    return (
        <View className="mt-6 p-5">
            {/* Payment Method */}
            <Text className="text-lg font-semibold text-gray-900 mb-3">
                Payment Method
            </Text>

            <Pressable
                onPress={() => setSelectedMethod("moniepoint")}
                className={`flex-row items-center border rounded-xl px-4 py-4 ${selectedMethod === "moniepoint"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white"
                    }`}
            >

                {/* Moniepoint Logo */}
                <View className="w-10 h-10 rounded-lg bg-blue-700 items-center justify-center mr-3">
                    <Text className="font-bold text-white text-xs">
                        MP
                    </Text>
                </View>

                <View className="flex-1">
                    <Text className="font-medium text-gray-900">
                        Moniepoint
                    </Text>

                    <Text className="text-gray-500 text-xs mt-1">
                        Pay securely with Moniepoint
                    </Text>
                </View>

                {/* Radio Button */}
                <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${selectedMethod === "moniepoint"
                        ? "border-primary"
                        : "border-gray-300"
                        }`}
                >
                    {selectedMethod === "moniepoint" && (
                        <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                </View>
            </Pressable>

            {/* Place Order */}
            <Pressable
                onPress={initializePayment}
                disabled={orderMutation.isPending || paymentMutation.isPending}
                className="bg-primary rounded-md items-center justify-center text-white font-semibold h-14 mt-6">

                <Text className="text-white font-semibold text-base">
                    {orderMutation.isPending || paymentMutation.isPending ? "Processing" : "Place Order"}
                </Text>
            </Pressable>
        </View>
    );
}
