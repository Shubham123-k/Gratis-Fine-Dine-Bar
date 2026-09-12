# Deployment checklist

## Frontend
1. `npm install`
2. Copy `.env.example` to `.env`.
3. Add Firebase Web App values.
4. In Firebase Authentication, enable Google and Email/Password providers.
5. `npm run build` and deploy the generated `dist` folder to Vercel/Netlify.
6. Add your production frontend domain to Firebase Authorized Domains.

## Custom OTP server
1. Copy `server/.env.example` to `server/.env` (or set these values in your hosting provider).
2. Configure a real SMTP mailbox. For Gmail, create an App Password.
3. Start with `npm run server` or deploy `server/index.js` to a Node host.
4. Set `VITE_AUTH_API_URL` on the frontend to the deployed API URL.

The custom OTP endpoint sends the message with the restaurant identity in the sender/subject/body. For a production restaurant deployment, use a verified domain mailbox such as `reservations@yourdomain.com` and add rate limiting + persistent storage.
