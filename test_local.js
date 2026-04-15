import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/transactions');
    const data = await res.json();
    console.log(JSON.stringify(data).substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}
test();
