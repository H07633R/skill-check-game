import { supabase } from '../lib/supabase'

export const saveScore = async ({ score, difficulty }) => {
  const tg = window.Telegram?.WebApp
  const user = tg?.initDataUnsafe?.user

  if (!user) {
    console.error('No user data available')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('scores')
      .insert([{
        user_id: user.id.toString(),
        username: user.username || `User${user.id}`,
        passed: score >= 3,
        difficulty,
        created_at: new Date()
      }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving score:', error)
    return null
  }
}

export const getLeaderboard = async (difficulty) => {
  try {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('difficulty', difficulty)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}

export const getUserBestScore = async (difficulty) => {
  const tg = window.Telegram?.WebApp
  const userId = tg?.initDataUnsafe?.user?.id

  if (!userId) return null

  try {
    const { data, error } = await supabase
      .from('scores')
      .select('score')
      .eq('user_id', userId.toString())
      .eq('difficulty', difficulty)
      .order('score', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data?.score
  } catch (error) {
    console.error('Error fetching user best score:', error)
    return null
  }
}