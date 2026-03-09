
-- Fix permissive analytics policies - restrict to the increment function only
DROP POLICY "Anyone can insert analytics" ON public.page_analytics;
DROP POLICY "Anyone can update analytics" ON public.page_analytics;

-- Only allow analytics changes through the security definer function
-- No direct insert/update allowed
CREATE POLICY "Analytics insert via function only"
ON public.page_analytics FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Analytics update via function only"
ON public.page_analytics FOR UPDATE
TO anon, authenticated
USING (false);
