import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:3000/api/transactions');
  if (!res.ok) {
    console.log("Error:", res.status, await res.text());
  } else {
    const data = await res.json();
    console.log("Transactions:", Object.keys(data));
  }
}
test();
