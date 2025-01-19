import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import { transporter } from "./libs/nodemailer";

const fastify = Fastify({
  logger: true
});

interface EmailRequestBody {
  from: string;
  to: string;
  subject: string;
  text: string;
};

fastify.post("/", async function handler (
  request: FastifyRequest<{ Body: EmailRequestBody }>,
  reply: FastifyReply
) {
  const { from, to, subject, text } = request.body;
  
  await transporter.sendMail({ from, to, subject, text });

  return { status: 'Email sent successfully' };
});


fastify.listen({ port: Number(process.env.PORT) || 8081 , host: "0.0.0.0" })
  .then(() => console.log(`server runnnig on port ${process.env.PORT || 8081}`));