import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:3000/api/listings');
  const data = await res.json();
  console.log("Total listings:", data.length);
  const prugio = data.filter(l => l.complexName === '화서역푸르지오더에듀포레');
  console.log("Prugio listings:", prugio.length);
  if (prugio.length > 0) {
    console.log("Sample:", prugio[0]);
  }
}
test();
