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
  
  try {
    await transporter.sendMail({ from, to, subject, text });
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
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

fastify.listen({ port, host })
  .then(() => console.log(`server runnnig on ${host}:${port}`));