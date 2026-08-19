import { Client as WorkflowClient, WorkflowContext } from '@upstash/workflow';
import config from './config';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async (
  context: WorkflowContext,
  {
    email,
    subject,
    message,
  }: { email: string; subject: string; message: string }
) => {
  // 👇 the workflow context
  await context.api.resend.call('Call Resend', {
    token: process.env.RESEND_TOKEN!,
    body: {
      from: 'EduPilot <onboarding@resend.dev>',
      to: [email],
      subject,
      html: message,
    },
    headers: {
      'content-type': 'application/json',
    },
  });
};
