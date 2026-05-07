
CREATE OR REPLACE FUNCTION public.enforce_bookmark_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_premium boolean;
  current_count integer;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.subscribers
    WHERE user_id = NEW.user_id
      AND subscribed = true
      AND (subscription_end IS NULL OR subscription_end > now())
  ) INTO is_premium;

  IF is_premium THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO current_count
  FROM public.bookmarks
  WHERE user_id = NEW.user_id;

  IF current_count >= 3 THEN
    RAISE EXCEPTION 'Free tier limited to 3 bookmarks. Upgrade to Premium for unlimited bookmarks.'
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_bookmark_limit_trigger ON public.bookmarks;
CREATE TRIGGER enforce_bookmark_limit_trigger
BEFORE INSERT ON public.bookmarks
FOR EACH ROW
EXECUTE FUNCTION public.enforce_bookmark_limit();
