import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/transactions');
    const data = await res.json();
    console.log(Object.keys(data));
    if (data['25평형']) {
      console.log('25평형 count:', data['25평형'].transactionCount);
      console.log('25평형 recent:', data['25평형'].recentTransactions.map(t => t.contractDate));
    }
  } catch (e) {
    console.error(e);
  }
}
test();
