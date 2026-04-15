import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/listings');
    const data = await res.json();
    console.log(`Fetched ${data.length} listings`);
  } catch (e) {
    console.error(e);
  }
}
test();
