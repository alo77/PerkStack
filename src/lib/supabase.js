import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lreodprlaflbyutooglu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZW9kcHJsYWZsYnl1dG9vZ2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNzA3NzksImV4cCI6MjA2OTk0Njc3OX0.4CNR2sx7JegKrYCrUo5c7igGRtxP_dX1LblnE2qrYX4';

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});