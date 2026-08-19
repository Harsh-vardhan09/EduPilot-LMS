import { Client as WorkflowClient } from '@upstash/workflow';
import config from './config';
import { serve } from '@upstash/workflow/nextjs';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({ email, subject, message }:{email:string,subject:string,message:string}) => {
  serve(
    // 👇 the workflow context
    async (context) => {
      const { status, body } = await context.api.resend.call('Call Resend', {
        token: process.env.RESEND_TOKEN!,
        body: {
          from: 'EduPilor <onboarding@resend.dev>',
          to: [email],
          subject,
          html: message,
        },
        headers: {
          'content-type': 'application/json',
        },
      });
    }
  );
};
