// script.js
document.getElementById('searchButton').addEventListener('click', async () => {
  const name = document.getElementById('countryInput').value.trim();
  if (!name) return alert('国名を入力してください');

  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      document.getElementById('countryInfo').textContent = '国が見つかりませんでした';
      return;
    }
    const [country] = await res.json();
    displayCountry(country);
  } catch (err) {
    console.error(err);
    document.getElementById('countryInfo').textContent = '取得に失敗しました';
  }
});

function displayCountry(c) {
  const info = document.getElementById('countryInfo');
  // 言語表示の例：Object.values を使って柔軟に対応
  const languages = c.languages ? Object.values(c.languages).join(', ') : '不明';

  info.innerHTML = `
    <h2>${c.name.common}</h2>
    <p>首都: ${c.capital?.[0] || '不明'}</p>
    <p>地域: ${c.region}</p>
    <p>人口: ${c.population.toLocaleString()}</p>
    <p>言語: ${languages}</p>
    <img src="${c.flags.png}" alt="旗" width="150">
  `;
}
