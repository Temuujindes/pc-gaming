import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
}

export function Placeholder({ title, description }: PlaceholderProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Coming Soon
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{description}</p>
          <div className="pt-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
