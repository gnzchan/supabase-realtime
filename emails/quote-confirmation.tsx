import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface QuoteConfirmationProps {
  customerName?: string;
  quoteNumber?: string;
  quoteLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const QuoteConfirmation = ({
  customerName,
  quoteNumber,
  quoteLink,
}: QuoteConfirmationProps) => {
  const previewText = `Quote #${quoteNumber} is ready for your review`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/company-logo.png`}
                width="40"
                height="37"
                alt="Chan"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Your Quote is Ready
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {customerName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We've finalized your quote (#{quoteNumber}). Please click the
              button below to review the details.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={quoteLink}
              >
                View Quote
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={quoteLink} className="text-blue-600 no-underline">
                {quoteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you did not request this quote, please ignore this email or
              contact our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

QuoteConfirmation.PreviewProps = {
  customerName: "John Doe",
  quoteNumber: "Q-123456",
  quoteLink: "https://example.com/quotes/Q-123456",
} as QuoteConfirmationProps;

export default QuoteConfirmation;
