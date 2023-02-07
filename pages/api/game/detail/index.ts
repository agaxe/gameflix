import { useGameApi } from '@/hooks/useGameApi';

export default async function (req, res) {
  const options = JSON.parse(req.query.options);

  // 최근 본 게임
  const recentGames = await useGameApi(options);

  res.json({ success: true, recentGames });
}
