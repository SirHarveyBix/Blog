async function createUserRoute(loginData: { email: string; password: string }) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'something went wrong');
}

export default createUserRoute;
