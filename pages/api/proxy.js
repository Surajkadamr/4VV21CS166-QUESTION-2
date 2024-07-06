
export default async function handler(req, res) {
  const { url, method, body, headers: clientHeaders } = req.body;

  const API_BASE_URL = 'http://20.244.56.144/test';
  const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwMjUxMjU4LCJpYXQiOjE3MjAyNTA5NTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY0N2Y3MTM0LWMyNDEtNGZjMC04NjZjLWJhNzAyN2Q5YjA2NCIsInN1YiI6InN1cmFqa2FkYW1yMDVAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoia2FkYW0gcHZ0IGx0ZCIsImNsaWVudElEIjoiNjQ3ZjcxMzQtYzI0MS00ZmMwLTg2NmMtYmE3MDI3ZDliMDY0IiwiY2xpZW50U2VjcmV0IjoiSHBxQ0Vtcmx4WUZZaWJwbyIsIm93bmVyTmFtZSI6IlN1cmFqIiwib3duZXJFbWFpbCI6InN1cmFqa2FkYW1yMDVAZ21haWwuY29tIiwicm9sbE5vIjoiNFZWMjFDUzE2NiJ9.GANdZ_5W2hfcc4-SEjH9crOsIrJ-9KGGPNibwAgf3Ow';

  const headers = {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
    ...clientHeaders
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from API' });
  }
}

const API_BASE_URL = '/api/proxy';

export async function fetchProducts(filters) {
  const { company, category, minPrice, maxPrice, top } = filters;
  const url = `/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        method: 'GET'
      })
    });

    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(product => ({
      ...product,
      id: `${company}-${category}-${product.productName}`, 
      company,
      category
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
