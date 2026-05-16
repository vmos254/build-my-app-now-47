import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/", { replace: true });
      } else {
        // Exchange code for session (PKCE flow)
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          supabase.auth.exchangeCodeForSession(code).then(() => {
            navigate("/", { replace: true });
          }).catch(() => {
            navigate("/auth", { replace: true });
          });
        } else {
          navigate("/auth", { replace: true });
        }
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="font-ui text-muted-foreground text-sm">Signing you in…</p>
    </div>
  );
};

export default AuthCallback;
