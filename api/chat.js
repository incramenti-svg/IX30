export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { messages, persona } = req.body;
  
  const personas = {
    amical: "Tu es IX30, une IA créée par Incramenti & Isma. Tu es chaleureux et sympa.",
    pro: "Tu es IX30, une IA créée par Incramenti & Isma. Tu es professionnel et précis.",
    drole: "Tu es IX30, une IA créée par Incramenti & Isma. Tu es drôle et décontracté.",
    direct: "Tu es IX30, une IA créée par Incramenti & Isma. Réponses courtes uniquement.",
    expert: "Tu es IX30, une IA créée par Incramenti & Isma. Tu es un expert technique."
  };

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: personas[persona] + " Réponds en français. Ne mentionne jamais Claude ou Anthropic.",
        messages
      })
    });

    const data = await response.json();
    res.json({ reply: data.content[0].text });
  } catch(e) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
