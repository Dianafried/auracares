// Vercel Serverless API â€” /api/questions.js
// GET /api/questions?category=diabetes&limit=20&page=1&ai=true&risk=clinical
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600');
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const BANK = require('../js/question-bank.json');
  const { category='all', limit=20, page=1, search, ai, risk } = req.query;

  let qs = [...BANK.questions];
  if (category !== 'all') qs = qs.filter(q => q.category === category);
  if (search) { const t=search.toLowerCase(); qs=qs.filter(q=>q.question.toLowerCase().includes(t)||q.topic.toLowerCase().includes(t)); }
  if (risk) qs = qs.filter(q => q.riskLevel === risk);
  if (ai==='true') qs = qs.sort(() => Math.random()-0.5);

  const sz=Math.min(+limit,100), pg=Math.max(+page,1), start=(pg-1)*sz;
  res.json({ success:true, total:qs.length, page:pg, pageSize:sz, totalPages:Math.ceil(qs.length/sz), categories:BANK.categories, questions:qs.slice(start,start+sz) });
};

