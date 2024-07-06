const API_BASE_URL = '/api/proxy'; // This now points to our local API route

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