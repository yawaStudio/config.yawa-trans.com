import { createClient } from '@supabase/supabase-js';
import Env from '@ioc:Adonis/Core/Env';

export default  function supabase() {
    const supabaseUrl = 'https://azrvbsqoffjtoatklqls.supabase.co'
    const supabaseKey = Env.get('API_KEY')

    const supabase=  createClient(supabaseUrl, supabaseKey)
    return supabase
}
