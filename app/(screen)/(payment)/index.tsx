import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { useOrder, usePayment } from "@/services/hook";
import { useCart } from "@/context/CartContext";
import api from "@/helper/axios";

export default function PaymentMethod() {
  const { pickupTime: routePickupTime } =
    useLocalSearchParams<{ pickupTime?: string }>();

  const orderMutation = useOrder();
  const paymentMutation = usePayment();
  const { cartItems } = useCart();

  const [checkoutHtml, setCheckoutHtml] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => {
    const price = Number(String(item.price).replace(/,/g, "")) || 0;
    const extras = item.extras.reduce(
      (sum, extra) =>
        sum + (Number(String(extra.price).replace(/,/g, "")) || 0),
      0
    );

    return total + (price + extras) * item.quantity;
  }, 0);

  const initializePayment = async () => {
    try {
      const pickupTime =
        typeof routePickupTime === "string"
          ? routePickupTime.trim()
          : "";

      if (!pickupTime) throw new Error("Pickup time is missing.");
      if (!cartItems.length) throw new Error("Your cart is empty.");

      const items = cartItems.map((item) => {
        if (!item.id) {
          throw new Error(`Product ID is missing for ${item.name}.`);
        }

        return {
          menuItem: item.id,
          itemType: "menu",
          quantity: item.quantity,
          selectedExtras: item.extras.map((extra) => ({
            name: extra.name ?? extra.label ?? "",
            price:
              Number(String(extra.price).replace(/,/g, "")) || 0,
          })),
        };
      });

      const order = await orderMutation.mutateAsync({
        pickupTime,
        items,
      });

      if (!order.orderId) {
        throw new Error("The order response did not include an order ID.");
      }

      const payment = await paymentMutation.mutateAsync({
        orderId: order.orderId,
        amount: String(totalAmount),
      });

      const checkout = payment.inlineCheckout;
      const reference = payment.reference;

      if (!checkout || !reference) {
        throw new Error(
          "Payment response is missing inlineCheckout or reference. Check your backend response."
        );
      }

      // Embed the public checkout configuration in the WebView.
      // Never put your Monnify secret key in this HTML.
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://sdk.monnify.com/plugin/monnify.js"></script>
</head>
<body>
<script>
  function send(data) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }

  window.onload = function () {
    if (!window.MonnifySDK) {
      send({ type: "error", message: "Unable to load Monnify checkout." });
      return;
    }

    MonnifySDK.initialize({
      amount: ${Number(checkout.amount)},
      currency: ${JSON.stringify(checkout.currency)},
      reference: ${JSON.stringify(reference)},
      customerFullName: ${JSON.stringify(checkout.customerName)},
      customerEmail: ${JSON.stringify(checkout.customerEmail)},
      apiKey: ${JSON.stringify(checkout.apiKey)},
      contractCode: ${JSON.stringify(checkout.contractCode)},
      paymentDescription: ${JSON.stringify(checkout.paymentDescription)},

      onComplete: function (result) {
        send({
          type: "complete",
          reference: ${JSON.stringify(reference)}
        });
      },

      onClose: function () {
        send({ type: "close" });
      }
    });
  };
</script>
</body>
</html>`;

      setCheckoutHtml(html);
    } catch (error) {
      Alert.alert(
        "Payment initialization failed",
        error instanceof Error ? error.message : "Please try again."
      );
    }
  };

  const handleWebViewMessage = async (message: string) => {
    try {
      const event = JSON.parse(message);

      if (event.type === "close") {
        setCheckoutHtml("");
      } else if (event.type === "error") {
        setCheckoutHtml("");
        Alert.alert("Checkout error", event.message);
      } else if (event.type === "complete") {
        setIsVerifying(true);

        try {
          // Backend must verify the transaction directly with Monnify.
          const response = await api.get(
            `/payment/verify/${encodeURIComponent(event.reference)}`
          );

          const result = response.data;
          const verified =
            result?.paymentStatus === "PAID" ||
            result?.status === "PAID" ||
            result?.data?.paymentStatus === "PAID";

          setCheckoutHtml("");

          if (verified) {
            Alert.alert("Payment successful", "Your payment has been confirmed.");
          } else {
            Alert.alert(
              "Payment pending",
              "We could not confirm your payment yet. Please check your order status before trying again."
            );
          }
        } catch {
          Alert.alert(
            "Verification pending",
            "We could not verify your payment. Check your order status before attempting another payment."
          );
        } finally {
          setIsVerifying(false);
        }
      }
    } catch {
      Alert.alert("Error", "Unable to process the checkout response.");
    }
  };

  if (checkoutHtml) {
    return (
      <View className="flex-1 bg-white">
        {isVerifying && (
          <View className="absolute z-10 inset-0 items-center justify-center bg-white/80">
            <ActivityIndicator size="large" />
            <Text className="mt-3 text-gray-700">
              Verifying payment...
            </Text>
          </View>
        )}

        <WebView
          originWhitelist={["*"]}
          source={{ html: checkoutHtml }}
          javaScriptEnabled
          onMessage={(event) =>
            handleWebViewMessage(event.nativeEvent.data)
          }
          onError={() => {
            setCheckoutHtml("");
            Alert.alert("Error", "Unable to load payment checkout.");
          }}
        />
      </View>
    );
  }

  const isLoading =
    orderMutation.isPending ||
    paymentMutation.isPending ||
    isVerifying;

  return (
    <View className="mt-6 p-5">
      <Text className="mb-3 text-lg font-semibold text-gray-900">
        Payment Method
      </Text>

      <View className="flex-row items-center rounded-xl border border-primary bg-primary/5 px-4 py-4">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
          <Text className="text-xs font-bold text-white">MP</Text>
        </View>

        <View className="flex-1">
          <Text className="font-medium text-gray-900">Monnify</Text>
          <Text className="mt-1 text-xs text-gray-500">
            Pay securely with Monnify
          </Text>
        </View>
      </View>

      <Pressable
        onPress={initializePayment}
        disabled={isLoading}
        className={`mt-6 h-14 items-center justify-center rounded-md bg-primary ${
          isLoading ? "opacity-60" : ""
        }`}
      >
        <Text className="text-base font-semibold text-white">
          {isLoading ? "Processing..." : "Place Order"}
        </Text>
      </Pressable>
    </View>
  );
}