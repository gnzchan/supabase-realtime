import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Your Quote is Ready
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {customerName},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We've finalized your quote (#{quoteNumber}). Please click the
              button below to review the details.
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={quoteLink}
              >
                View Quote
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={quoteLink} className="text-blue-600 no-underline">
                {quoteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you did not request this quote, please ignore this email or
              contact our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default QuoteConfirmation;
