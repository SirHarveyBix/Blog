export default async function sendContactData(contactDetails: {
  name: string;
  email: string;
  message: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Something went wrong');
}
