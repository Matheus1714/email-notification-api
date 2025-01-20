import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import { transporter } from "./libs/nodemailer";
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: '*',
});

interface EmailRequestBody {
  from: string;
  to: string;
  cc?: string;
  subject: string;
  text: string;
  html?: string;
};

fastify.post("/", async function handler (
  request: FastifyRequest<{ Body: EmailRequestBody }>,
  reply: FastifyReply
) {
  const { from, to, subject, text, cc, html } = request.body;
  
  try {
    await transporter.sendMail({ from, to, subject, text, cc, html });
    return { status: 'Email sent successfully' };
  } catch (error) {
    request.log.error(error); // Loga o erro
    return reply.status(500).send({ status: 'Failed to send email', error: String(error) });
  }
});

fastify.get("/", async function handler (
  request: FastifyRequest,
  reply: FastifyReply
) {
  return { status: 'Alive' };
});

const port = Number(process.env.PORT) || 8081;
const host = "0.0.0.0";

fastify.listen({ port, host })
  .then(() => console.log(`server runnnig on ${host}:${port}`));