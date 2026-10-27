import { View, Text, ScrollView } from 'react-native'

interface SubSection {
  title?: string;
  content?: string;
  items?: string[];
  footer?: string;
}

interface PolicyProps {
  title: string;
  content: string;
  subsections?: SubSection[];
}

const PrivacyPolicyScreen = () => {

  const policies: PolicyProps[] = [
    {
      title: "Introduction",
      content:
        "Welcome to Ramat Pickup. Ramat Pickup is a food ordering application that allows customers to browse meals, place orders, make payments, choose pickup times, track order progress within the app, submit reviews, and collect orders from our restaurant. This Privacy Policy explains what personal information we collect, how we use it, when we share it, how long we retain it, and the choices available to you. Where consent is required by applicable law, we will seek it separately.",
      subsections: [
        {
          title: "Effective Date and Last Updated",
          content: "Effective Date: 26 October 2026. Last Updated: 26 October 2026.",
          footer:
            "This policy should be reviewed and updated when Ramat Pickup's features, service providers, or data practices change.",
        },
      ],
    },
    {
      title: "Information We Collect",
      content:
        "We collect information that is necessary to create and manage your account, process food orders and payments, coordinate pickup, display order progress, respond to customers, and operate Ramat Pickup.",
      subsections: [
        {
          title: "Account Information",
          content: "When you create and use an account, we collect information such as:",
          items: [
            "Name.",
            "Email address.",
            "Phone number.",
            "Login and authentication information.",
          ],
          footer:
            "Passwords should be stored by our backend using an appropriate password-hashing method, not as plain text. This description should be checked against the actual backend implementation before publication.",
        },
        {
          title: "Order and Pickup Information",
          content: "When you place an order, we may collect and maintain:",
          items: [
            "Meals, quantities, and selected extras.",
            "Prices and order totals.",
            "Your selected pickup time.",
            "Order identification number and pickup code.",
            "Order status and order history.",
          ],
          footer:
            "We use this information to prepare orders, coordinate pickup, display order progress, investigate order issues, and maintain appropriate business records. Ramat Pickup provides in-app order status tracking; this does not mean live delivery or driver tracking.",
        },
        {
          title: "Payment and Transaction Information",
          content:
            "When you pay for an order, we may process payment references, amounts, transaction status, and related transaction details needed to initiate, confirm, and reconcile payments.",
          footer:
            "Payments are facilitated through Monnify. The payment information Monnify collects and the information Ramat Pickup receives or retains may differ. We do not claim to store full card details or banking credentials. Confirm the exact data returned by your payment integration before publishing this statement.",
        },
        {
          title: "Reviews and Feedback",
          content:
            "If you submit a review or feedback, we collect the information you provide, such as review text and any rating supported by the app. Reviews may be associated with your account or order.",
          footer:
            "We use reviews to understand customer experiences, respond to feedback, and improve our food and services. Whether a review displays your name publicly depends on the app's actual review functionality.",
        },
        {
          title: "Technical and Usage Information",
          content:
            "Technical information may be processed by our backend, hosting provider, or other services used to operate and protect the app. The exact technical information collected by Ramat Pickup has not yet been confirmed.",
          items: [
            "Potentially, device and operating system information.",
            "Potentially, application logs, error information, and crash reports.",
            "Potentially, IP addresses or device identifiers where collected by the services we use.",
          ],
          footer:
            "These are examples of information that technical services may process, not a confirmation that Ramat Pickup currently collects every item listed. Review the app's dependencies and service configuration to confirm what applies.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      content: "We use personal information for purposes including:",
      subsections: [
        {
          items: [
            "Creating, authenticating, and maintaining customer accounts.",
            "Receiving and processing food orders.",
            "Calculating order totals and recording selected meals and extras.",
            "Initiating payments and checking payment status.",
            "Generating and validating pickup codes.",
            "Displaying order status and progress within the app.",
            "Sending relevant order, payment, and pickup notifications.",
            "Receiving and responding to customer reviews and feedback.",
            "Providing customer support and resolving complaints.",
            "Protecting accounts and helping prevent fraud or unauthorized activity.",
            "Maintaining appropriate business records and improving our services.",
          ],
        },
        {
          content: "We may also process information where necessary to:",
          items: [
            "Comply with applicable laws and lawful requests.",
            "Resolve disputes and investigate payment or order issues.",
            "Establish, exercise, or defend legal claims.",
            "Protect the rights, safety, and security of our customers and business.",
          ],
        },
      ],
    },
    {
      title: "Payments and Monnify",
      content:
        "Ramat Pickup uses Monnify to facilitate payments for customer orders. Information necessary to initiate and verify a payment may be shared with Monnify.",
      subsections: [
        {
          content: "Transaction information handled by Ramat Pickup may include:",
          items: [
            "Payment reference.",
            "Payment amount and currency.",
            "Transaction status.",
            "Relevant transaction details returned by the payment service.",
          ],
          footer:
            "Monnify may independently process information under its own terms, privacy policy, and legal obligations. Review Monnify's current privacy information for details about its processing. Do not assume that Ramat Pickup stores complete card details or banking credentials.",
        },
      ],
    },
    {
      title: "Hosting and Third-Party Service Providers",
      content:
        "Ramat Pickup uses third-party services to operate the app and process payments. Information may be shared with these providers where reasonably necessary to provide the requested services.",
      subsections: [
        {
          title: "Backend Hosting",
          content:
            "Ramat Pickup's backend is hosted on Render. Information processed by the backend may be handled through Render's infrastructure as needed to operate the app.",
        },
        {
          title: "Other Providers",
          content:
            "Additional services may process information if they are integrated into the app. The complete list of any analytics, crash-reporting, messaging, or other technical providers has not yet been confirmed.",
          footer:
            "We will update this policy as necessary when additional providers or material data-processing activities are confirmed.",
        },
      ],
    },
    {
      title: "Push Notifications and Promotional Messages",
      content:
        "Ramat Pickup uses push notifications to support communications relating to orders and the service, where the relevant notification functionality and device permissions are enabled.",
      subsections: [
        {
          title: "Service Notifications",
          content: "Notifications may relate to:",
          items: [
            "Order progress and status.",
            "Payment updates where supported.",
            "Pickup readiness and order collection.",
            "Important account or service information.",
          ],
          footer:
            "You can manage notification permissions through your device settings. Turning notifications off may prevent you from receiving timely alerts, but you may still be able to view order status within the app.",
        },
        {
          title: "Future Promotional Messages",
          content:
            "Ramat Pickup may introduce promotional communications in the future, such as meal announcements, offers, discounts, or restaurant updates.",
          footer:
            "Promotional messaging is a planned possibility, not a claim that marketing messages are currently being sent. If introduced, we will provide appropriate notice and obtain consent or offer an opt-out where required by applicable law. Essential communications about existing orders and payments may still be sent when necessary.",
        },
      ],
    },
    {
      title: "Reviews and Customer Feedback",
      content:
        "Customers may submit reviews or feedback through the app. We use this information to understand customer experiences, improve our services, and respond to concerns.",
      subsections: [
        {
          content: "Please avoid including sensitive personal information in public-facing reviews.",
          footer:
            "The information shown alongside a review, including whether a name is displayed, depends on how the review feature is implemented. Confirm the app's display settings before describing reviews as anonymous or public.",
        },
      ],
    },
    {
      title: "Information Sharing",
      content:
        "We do not sell your personal information as a business practice. We may share information where reasonably necessary to operate Ramat Pickup, provide the services you request, or meet legal obligations.",
      subsections: [
        {
          content: "Recipients may include:",
          items: [
            "Authorized restaurant personnel who manage orders and pickups.",
            "Monnify for payment processing and verification.",
            "Render for backend hosting and infrastructure.",
            "Other technical service providers actually integrated into the app.",
            "Competent authorities where disclosure is required by law.",
            "Relevant parties where disclosure is necessary to investigate fraud, resolve disputes, or protect rights and safety, subject to applicable law.",
          ],
          footer:
            "We aim to share only information reasonably necessary for the relevant purpose. Review this section if additional providers are added to the app.",
        },
      ],
    },
    {
      title: "Data Security",
      content:
        "We take reasonable steps to protect personal information against unauthorized access, alteration, disclosure, loss, or misuse.",
      subsections: [
        {
          content:
            "The safeguards used should be appropriate to the systems and information involved. No electronic system or method of transmission can be guaranteed to be completely secure.",
          footer:
            "Do not treat this policy as a guarantee of absolute security. Customers should keep their login credentials confidential and contact us if they suspect unauthorized access to their accounts.",
        },
      ],
    },
    {
      title: "Data Retention",
      content:
        "We retain personal information for as long as reasonably necessary to provide our services and meet applicable business and legal obligations.",
      subsections: [
        {
          content: "Information may be retained as needed to:",
          items: [
            "Maintain accounts and provide app functionality.",
            "Maintain order and transaction records.",
            "Resolve order, payment, or customer support disputes.",
            "Prevent fraud and investigate security issues.",
            "Meet applicable legal, accounting, or regulatory obligations.",
            "Establish, exercise, or defend legal claims.",
          ],
          footer:
            "A specific retention schedule for account information, reviews, orders, payment records, and technical logs has not yet been confirmed. Different categories may be retained for different periods. Information should be deleted or anonymized when no longer needed, subject to applicable legal obligations.",
        },
      ],
    },
    {
      title: "Account Deletion",
      content:
        "Ramat Pickup provides an in-app account deletion option. When you request deletion, we will process the request in accordance with applicable retention obligations.",
      subsections: [
        {
          content: "Some information may need to be retained after account deletion for:",
          items: [
            "Legal or accounting compliance.",
            "Transaction recordkeeping.",
            "Fraud prevention and security.",
            "Resolving disputes.",
            "Establishing or defending legal claims.",
          ],
          footer:
            "Account deletion may affect your access to your account and order history. The exact deletion timeline and which records are deleted, anonymized, or retained should match the actual deletion process implemented in the app.",
        },
      ],
    },
    {
      title: "Your Privacy Rights",
      content:
        "Subject to applicable law, you may have rights regarding your personal information, including the right to:",
      subsections: [
        {
          items: [
            "Request access to personal information we hold about you.",
            "Request correction of inaccurate or incomplete information.",
            "Request deletion of personal information where applicable.",
            "Request information about how your information is processed.",
            "Object to or request restriction of certain processing where applicable.",
            "Withdraw consent where processing is based on consent.",
            "Lodge a complaint with a relevant data protection authority.",
          ],
          footer:
            "To exercise a privacy right, contact us using the email address below. We may need to verify your identity before processing a request. Some information may need to be retained where the law permits or requires it.",
        },
      ],
    },
    {
      title: "Children's Privacy",
      content:
        "Ramat Pickup is intended for a general audience and is not described as an app exclusively for adults or children. We have not confirmed whether the app has a separate age-verification process.",
      subsections: [
        {
          content:
            "Where applicable law requires parental consent or additional safeguards for a child's personal information, we will take the steps required by that law. If you believe personal information has been collected inappropriately, please contact us.",
        },
      ],
    },
    {
      title: "International Data Transfers",
      content:
        "The locations in which all personal information is stored or processed, including whether any service provider transfers information internationally, have not yet been confirmed.",
      subsections: [
        {
          content:
            "Where personal information is transferred across borders, we will take the steps required by applicable data protection law to ensure the transfer is lawful and appropriate safeguards are in place.",
        },
      ],
    },
    {
      title: "Analytics and Diagnostics",
      content:
        "We have not yet confirmed whether Ramat Pickup uses analytics, advertising trackers, or crash-reporting services.",
      subsections: [
        {
          content:
            "Before publishing this policy, we should review the app's dependencies and configuration to identify any services that collect usage, diagnostic, or device information. If such services are used, this section should name them where appropriate and explain their purposes.",
        },
      ],
    },
    {
      title: "Applicable Data Protection Law",
      content:
        "We aim to handle personal information in accordance with applicable data protection laws, including the Nigeria Data Protection Act 2023 where applicable. This includes appropriate transparency about processing, respect for data subject rights, and reasonable measures to protect personal information.",
    },
    {
      title: "Changes to This Privacy Policy",
      content:
        "We may update this Privacy Policy to reflect changes to Ramat Pickup, our technology, our service providers, our data-processing practices, or applicable legal requirements.",
      subsections: [
        {
          content:
            'When we make changes, we will update the "Last Updated" date at the beginning of this policy. Where required by law, we will provide additional notice or seek consent for material changes.',
        },
      ],
    },
    {
      title: "Contact Us",
      content:
        "If you have questions about this Privacy Policy, wish to exercise your privacy rights, or have concerns about how your personal information is handled, contact us using the details below.",
      subsections: [
        {
          items: [
            " Ramat Pickup.",
            "Privacy and Support Email: support@ramatPickup.com.",
          ],
          // footer:
          //   "Before publication, confirm that this email address is active and monitored so customers can submit privacy requests.",
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
      <View className="py-4 border-b" style={{ borderBottomColor: "#F3F4F6" }}>
        <Text className="uppercase mb-2" style={{ color: "#99A1AF" }}>Effective Date: August 20, 2026.</Text>
        <Text className="uppercase" style={{ color: "#99A1AF" }}>Last updated: August 20, 2026.</Text>
      </View>

      <View className="border-b py-4" style={{ borderBottomColor: "#F3F4F6" }}>
        <Text className="text-[16px] leading-7 text-[#364153] text-justify" style={{ color: "#364153" }}>
          Ramat Pickup (&apos;Ramat Pickup&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;) respects your privacy and is
          committed to protecting the personal information you provide when using
          the Ramat Pickup mobile application, website, and related services
          (collectively, the &apos;Services&apos;).
        </Text>

        <Text className="mt-4 text-[16px] leading-7 text-[#364153] text-justify" style={{ color: "#364153" }}>
          This Privacy Policy explains what information we collect, how we use it,
          how we share it, how we protect it, and the choices available to you.
        </Text>

        <Text className="mt-4 text-[16px] leading-7 text-[#364153] text-justify" style={{ color: "#364153" }}>
          By using Ramat Pickup, you acknowledge the practices described in this Privacy
          Policy.
        </Text>

        <Text className="mt-4 text-[16px] leading-7 text-[#364153] text-justify" style={{ color: "#364153" }}>
          Ramat Pickup currently operates primarily in Nigeria and may expand its
          Services to other countries and regions in the future. Where required,
          we will adapt our privacy practices to comply with applicable local laws
          and regulations.
        </Text>
      </View>

      {policies.map((policy, policyIndex) => {
        const sectionNumber = policyIndex + 1;

        return (
          <View
            key={policy.title}
            className="border-b pt-8 pb-4 text-justify" style={{ borderBottomColor: "#F3F4F6" }}
          >

            {/* Main section */}
            <Text className="mb-3 text-[18px] font-poppinsSemiBold text-primary">
              {sectionNumber}. {policy.title}
            </Text>

            <Text className="mb-5 text-[16px] leading-7 font-poppinsRegular text-[#364153]" style={{ color: "#364153" }}>
              {policy.content}
            </Text>

            {/* Subsections */}
            {policy.subsections?.map((subsection, subsectionIndex) => {
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

export default PrivacyPolicyScreen;