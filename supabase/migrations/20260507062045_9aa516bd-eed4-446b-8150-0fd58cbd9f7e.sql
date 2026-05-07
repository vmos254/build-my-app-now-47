DROP TRIGGER IF EXISTS enforce_bookmark_limit_trigger ON public.bookmarks;
CREATE TRIGGER enforce_bookmark_limit_trigger
BEFORE INSERT ON public.bookmarks
FOR EACH ROW
EXECUTE FUNCTION public.enforce_bookmark_limit();