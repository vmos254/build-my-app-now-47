-- Lock down subscribers table writes to service role only.
-- Block all client-side INSERT/UPDATE/DELETE; webhook uses service role which bypasses RLS.
CREATE POLICY "Block client inserts on subscribers"
ON public.subscribers FOR INSERT TO authenticated, anon
WITH CHECK (false);

CREATE POLICY "Block client updates on subscribers"
ON public.subscribers FOR UPDATE TO authenticated, anon
USING (false) WITH CHECK (false);

CREATE POLICY "Block client deletes on subscribers"
ON public.subscribers FOR DELETE TO authenticated, anon
USING (false);