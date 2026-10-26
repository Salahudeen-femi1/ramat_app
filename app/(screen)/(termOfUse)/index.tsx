import { View, Text, ScrollView } from 'react-native'

interface SubSection {
  title?: string;
  content?: string;
  items?: string[];
  footer?: string;
}

interface TermProps {
  title: string;
  content: string;
  subsections?: SubSection[];
}

const TermOfUse = () => {

  const terms: TermProps[] = [
    {
        title: "Introduction",
        content:
            "Welcome to Ramat Pickup. These Terms of Use govern your access to and use of the Ramat Pickup app and related services (the Services). By creating an account, placing an order, or using the Services, you agree to these Terms. If you do not agree, please do not use the Services.",
        subsections: [
            {
                content:
                    "These Terms should be read together with our Privacy Policy, which explains how we handle personal information.",
            },
        ],
    },
    {
        title: "Eligibility and Accounts",
        content:
            "You must be legally able to enter into a binding agreement to use the Services. When creating an account, you agree to provide accurate information, keep it up to date, protect your password, and notify us if you suspect unauthorized access.",
        subsections: [
            {
                content: "You must not:",
                items: [
                    "Use another person's account without permission.",
                    "Provide false or misleading registration information.",
                    "Share your password or pickup code in a way that enables misuse.",
                    "Use the Services for unlawful or fraudulent activity.",
                ],
                footer:
                    "You are responsible for activity carried out through your account, except to the extent applicable law provides otherwise.",
            },
        ],
    },
    {
        title: "Using Ramat Pickup",
        content:
            "Ramat Pickup allows customers to browse available food items, place orders, make payments, and collect confirmed orders from the restaurant. The Services support pickup and in-app order-status updates; they do not provide food delivery or live delivery tracking.",
        subsections: [
            {
                content: "You agree not to:",
                items: [
                    "Submit fraudulent, abusive, or intentionally false orders.",
                    "Attempt to access another user's account or private information.",
                    "Interfere with the security, operation, or availability of the app.",
                    "Use the app in a way that violates applicable law or the rights of others.",
                    "Attempt to compromise, disrupt, or misuse the Services.",
                ],
            },
        ],
    },
    {
        title: "Menu, Prices, and Availability",
        content:
            "We aim to display accurate menu descriptions, prices, and availability. Items may change or become unavailable, and menu images are illustrative; the actual presentation may vary.",
        subsections: [
            {
                items: [
                    "Review item names, quantities, extras, and prices before placing your order.",
                    "Orders are subject to availability and acceptance.",
                    "If an item is unavailable or a material listing error occurs, we may contact you to resolve the issue or cancel the affected order.",
                ],
                footer:
                    "If you have questions about ingredients or allergens, contact the restaurant before ordering.",
            },
        ],
    },
    {
        title: "Orders and Confirmation",
        content:
            "You are responsible for checking your order details before submitting it. An order request may be subject to acceptance and successful payment confirmation.",
        subsections: [
            {
                content: "After placing an order:",
                items: [
                    "The app may provide an order identifier or pickup code.",
                    "The app may display statuses such as received, preparing, ready, or completed.",
                    "Keep your order identifier or pickup code available when collecting your order.",
                    "Contact support if payment appears successful but your order is not confirmed.",
                ],
                footer:
                    "Do not assume an order is paid or confirmed solely because you tapped the payment button. Check the confirmation and status shown in the app.",
            },
        ],
    },
    {
        title: "Payments",
        content:
            "Payments are processed through Monnify or another payment method made available in the app. Payment processing may also be subject to the provider's terms, policies, and technical requirements.",
        subsections: [
            {
                content: "When making a payment, you acknowledge that:",
                items: [
                    "You must provide accurate information requested by the payment provider.",
                    "Payments may be subject to authorization, verification, or processing delays.",
                    "Ramat Pickup may record payment references, amounts, transaction status, and related details to reconcile payments and orders.",
                    "Payment details may be handled directly by the payment provider. Do not send your password, card PIN, or one-time password to support.",
                    "Where prepayment is required, an order may not be prepared until payment is confirmed.",
                ],
                footer:
                    "If you are charged but your order is not confirmed, contact support@ramatPickup.com with your order details and payment reference.",
            },
        ],
    },
    {
        title: "Cancellations and Refunds",
        content:
            "Food orders may begin preparation soon after confirmation, so cancellation may not always be possible once preparation has started.",
        subsections: [
            {
                content: "If you need to cancel an order or report a payment issue:",
                items: [
                    "Contact support as soon as possible and provide your order identifier and relevant payment reference.",
                    "We will review the order, preparation status, and payment record before determining an appropriate resolution.",
                    "If a refund is approved, the time it takes to arrive may depend on the payment provider or your financial institution.",
                    "If you believe you were charged more than once, contact support so the transactions can be checked.",
                ],
                footer:
                    "Refund decisions are subject to the circumstances, applicable law, and relevant payment-provider rules. Nothing in these Terms removes consumer rights that cannot legally be excluded.",
            },
        ],
    },
    {
        title: "Pickup and Collection",
        content:
            "Ramat Pickup is a pickup service. You are responsible for collecting your order from the designated restaurant location and following the pickup instructions shown in the app or provided by the restaurant.",
        subsections: [
            {
                items: [
                    "Present your order identifier or pickup code when requested.",
                    "Collect your order when its status indicates it is ready, unless the restaurant gives different instructions.",
                    "Keep your pickup code private until you need to use it to collect your order.",
                    "Contact support promptly if you cannot collect an order or believe it was handed to the wrong person.",
                ],
                footer:
                    "The app provides order-status updates, not live delivery tracking. Unless expressly stated in the app, Ramat Pickup does not deliver orders to customers.",
            },
        ],
    },
    {
        title: "Order Problems and Support",
        content:
            "If an order is missing, incorrect, or otherwise not as expected, contact us as soon as reasonably possible with your order identifier and a clear description of the issue. We may ask for additional information to investigate and resolve the matter.",
    },
    {
        title: "Reviews and Feedback",
        content:
            "If you submit reviews, ratings, or feedback, you are responsible for the content you provide.",
        subsections: [
            {
                content: "Reviews and feedback must:",
                items: [
                    "Reflect your honest experience or opinion.",
                    "Not contain threats, harassment, unlawful content, or knowingly false claims.",
                    "Not disclose another person's private information without permission.",
                    "Not impersonate another person or misrepresent your relationship with Ramat Pickup.",
                ],
                footer:
                    "We may remove content that violates these Terms or applicable law. You remain responsible for the content you submit.",
            },
        ],
    },
    {
        title: "Notifications and Communications",
        content:
            "We may send service-related communications, including order confirmations, preparation updates, pickup notifications, account messages, and important service notices. Push notifications depend on your device settings and permissions.",
        subsections: [
            {
                footer:
                    "You can manage push-notification permissions through your device settings. If promotional messages are introduced, we will handle them in accordance with applicable law and provide any required choices or controls.",
            },
        ],
    },
    {
        title: "Account Deletion and Suspension",
        content:
            "You may request account deletion through the in-app option where available. Deleting your account may limit your ability to access account features or order history.",
        subsections: [
            {
                content: "We may restrict or suspend access where reasonably necessary if:",
                items: [
                    "You materially breach these Terms or applicable law.",
                    "We reasonably suspect fraud, abuse, unauthorized access, or a security risk.",
                    "We are required to do so by law or a lawful authority.",
                    "Continued access creates a risk to the app, restaurant, users, or others.",
                ],
                footer:
                    "We may retain transaction records where required for legal, accounting, security, or dispute-resolution purposes. Deleting an account does not automatically cancel an order already placed.",
            },
        ],
    },
    {
        title: "Third-Party Services",
        content:
            "The Services may rely on third-party providers, including Monnify for payment processing and infrastructure providers used to host or operate the app. Those providers may have their own terms and privacy policies. We are not responsible for independent third-party services to the extent they are outside our reasonable control, subject to rights that cannot be excluded by law.",
    },
    {
        title: "App Availability and Changes",
        content:
            "We aim to keep Ramat Pickup reliable, but we do not guarantee that the app will always be uninterrupted, error-free, or available on every device or network. We may carry out maintenance, fix bugs, update features, or temporarily suspend parts of the Services due to technical issues or third-party interruptions.",
    },
    {
        title: "Disclaimer and Limitation of Liability",
        content:
            "To the extent permitted by applicable law, the Services are provided on an as-available basis. We do not guarantee uninterrupted operation or that every technical error can be corrected immediately. Nothing in these Terms excludes or limits liability, consumer protections, or other rights that cannot lawfully be excluded or limited. Subject to that restriction, Ramat Pickup is not liable for indirect or consequential loss arising from app interruptions, third-party service interruptions, or events outside our reasonable control.",
    },
    {
        title: "Changes to These Terms",
        content:
            "We may update these Terms to reflect changes to the app, our operations, payment arrangements, or legal requirements. We will update the Last Updated date and provide notice where required or appropriate. If you do not agree to updated Terms, stop using the Services.",
    },
    {
        title: "Governing Law and Disputes",
        content:
            "These Terms are subject to the laws of Nigeria, to the extent applicable. If you have a concern or dispute, please contact us first so we can attempt to resolve it informally. Nothing in this section prevents you from exercising rights or remedies available under applicable law.",
    },
    {
        title: "Contact Us",
        content:
            "If you have questions about these Terms, an order, a payment, or the Services, contact Ramat Pickup:",
        subsections: [
            {
                items: ["Email: support@ramatPickup.com"],
                footer:
                    "When contacting us about an order or payment, include your order identifier or payment reference. Never include your password, card PIN, or one-time password.",
            },
        ],
    },
];

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 70 }}

    >

      {terms.map((term, policyIndex) => {
        const sectionNumber = policyIndex + 1;

        return (
          <View
            key={term.title}
            className="border-b pt-8 pb-4 text-justify" style={{ borderBottomColor: "#F3F4F6" }}
          >

            {/* Main section */}
            <Text className="mb-3 text-[18px] font-poppinsSemiBold text-primary">
              {sectionNumber}. {term.title}
            </Text>

            <Text className="mb-5 text-[16px] leading-7 font-poppinsRegular text-[#364153]" style={{ color: "#364153" }}>
              {term.content}
            </Text>

            {/* Subsections */}
            {term.subsections?.map((subsection, subsectionIndex) => {
              const subsectionNumber = `${sectionNumber}.${subsectionIndex + 1}`;

              return (
                <View key={subsection.title ?? subsectionNumber} className="mb-5">
                  {subsection.title && (
                    <Text className="mb-2 text-[18px] font-poppinsMedium text-primary">
                      {subsectionNumber} {subsection.title}
                    </Text>
                  )}

                  {subsection.content && (
                    <Text className="mb-3 text-[16px] leading-7 text-[#364153] text-justify font-poppinsRegular" style={{ color: "#364153" }}>
                      {subsection.content}
                    </Text>
                  )}

                  {/* UL / LI */}
                  {subsection.items?.map((item, itemIndex) => (
                    <View
                      key={`${item}-${itemIndex}`}
                      className="mb-2 text-[#364153]"
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text
                        className="text-[#364153] "
                        style={{
                          fontSize: 20,
                          lineHeight: 22,
                          marginRight: 8,
                        }}
                      >
                        {"\u2022"}
                      </Text>

                      <Text className="flex-1 text-[13px] leading-7 " style={{ color: "#364153" }}>
                        {item}
                      </Text>
                    </View>
                  ))}

                  {/* Footer */}
                  {subsection.footer && (
                    <Text className="mt-2 text-[16px] leading-7 text-justify text-[#364153] font-poppinsMedium" style={{ color: "#364153" }}>
                      {subsection.footer}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        );
      })}

    </ScrollView>
  )
}

export default TermOfUse;