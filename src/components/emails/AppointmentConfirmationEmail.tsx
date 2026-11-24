
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AppointmentConfirmationEmailProps {
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  price: string;
}

function AppointmentConfirmationEmail({
  doctorName,
  appointmentDate,
  appointmentTime,
  appointmentType,
  duration,
  price,
}: AppointmentConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your dental appointment has been confirmed!
      </Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://i.ibb.co.com/tRy6cC2/logo.png"
              width="50"
              height="50"
              alt="DentTalk"
              style={logo}
            />
            <Text style={logoText}>DentTalk</Text>
          </Section>

          <Heading style={h1}>
            Appointment Confirmed! 🦷
          </Heading>

          <Text style={text}>
            Hi there,
          </Text>

          <Text style={text}>
            Great news! Your dental appointment has been
            successfully booked. We look forward to taking
            care of your smile. Here are your appointment details:
          </Text>

          <Section style={appointmentDetails}>
            <Text style={detailLabel}>Doctor</Text>
            <Text style={detailValue}>{doctorName}</Text>

            <Text style={detailLabel}>Appointment Type</Text>
            <Text style={detailValue}>{appointmentType}</Text>

            <Text style={detailLabel}>Date</Text>
            <Text style={detailValue}>{appointmentDate}</Text>

            <Text style={detailLabel}>Time</Text>
            <Text style={detailValue}>{appointmentTime}</Text>

            <Text style={detailLabel}>Duration</Text>
            <Text style={detailValue}>{duration}</Text>

            <Text style={detailLabel}>Cost</Text>
            <Text style={detailValue}>{price}</Text>

            <Text style={detailLabel}>Location</Text>
            <Text style={detailValue}>Dental Center</Text>
          </Section>

          <Text style={text}>
            Please arrive 15 minutes early for your appointment.
            If you need to reschedule or cancel, please contact
            us at least 24 hours in advance.
          </Text>

          <Section style={buttonContainer}>
            <Link
              style={button}
              href={`${process.env.NEXT_PUBLIC_APP_URL}/appointments`}
            >
              View My Appointments
            </Link>
          </Section>

          <Text style={footer}>
            Best regards,
            <br />
            The DentTalk Team
          </Text>

          <Text style={footerText}>
            If you have any questions, please contact us at{" "}
            support@denttalk.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default AppointmentConfirmationEmail;

// Premium Denttalk Email Theme

const main = {
  backgroundColor: "#F0FDFA",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "28px 0 48px",
  maxWidth: "560px",
  backgroundColor: "#FFFFFF",
};

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "32px",
  padding: "12px 0",
};

const logo = {
  borderRadius: "12px",
  display: "inline",
  verticalAlign: "middle",
};

const logoText = {
  fontSize: "21px",
  fontWeight: "800",
  color: "#0F766E",
  margin: "0",
  display: "inline",
  marginLeft: "12px",
  letterSpacing: "-0.5px",
};

const h1 = {
  color: "#134E4A",
  fontSize: "25px",
  fontWeight: "800",
  textAlign: "center" as const,
  margin: "30px 0",
  letterSpacing: "-0.6px",
};

const text = {
  color: "#475569",
  fontSize: "15px",
  lineHeight: "26px",
  margin: "16px 0",
};

const appointmentDetails = {
  backgroundColor: "#F0FDFA",
  border: "1px solid #CCFBF1",
  borderRadius: "14px",
  padding: "24px",
  margin: "24px 0",
};

const detailLabel = {
  color: "#0F766E",
  fontSize: "13px",
  fontWeight: "700",
  margin: "8px 0 4px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const detailValue = {
  color: "#134E4A",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#0F766E",
  borderRadius: "8px",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "13px 26px",
  boxShadow: "0 4px 10px rgba(15, 118, 110, 0.18)",
};

const footer = {
  color: "#334155",
  fontSize: "15px",
  lineHeight: "26px",
  margin: "32px 0 16px 0",
};

const footerText = {
  color: "#64748B",
  fontSize: "13px",
  lineHeight: "24px",
  margin: "16px 0 0 0",
  textAlign: "center" as const,
};
