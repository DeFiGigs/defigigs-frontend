import { Star, Clock, DollarSign, MapPin, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GigCardProps {
  gig: {
    id: number;
    title: string;
    description: string;
    budget: string;
    category: string;
    skills: string[];
    employer: string;
    rating: number;
    verified: boolean;
  };
}

export default function GigCard({ gig }: GigCardProps) {
  const handleOpenGig = () => {
    // Open gig detail in new tab
    window.open(`/gigs/${gig.id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className="group relative flex flex-col h-full p-6 glass-effect border-border/40 hover:border-primary/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-primary/10"
      onClick={handleOpenGig}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <Badge className="crypto-gradient text-white border-0 text-xs font-medium px-3 py-1">
          {gig.category}
        </Badge>
        <div className="flex items-center gap-1.5 bg-card/50 px-2.5 py-1 rounded-md">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          <span className="font-semibold text-sm text-foreground">
            {gig.rating}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="flex-1 mb-4">
        <h3 className="text-lg font-bold mb-2.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {gig.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {gig.description}
        </p>
      </div>

      {/* Skills Section */}
      <div className="flex flex-wrap gap-2 mb-5">
        {gig.skills.slice(0, 3).map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs font-medium border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            {skill}
          </Badge>
        ))}
        {gig.skills.length > 3 && (
          <Badge
            variant="outline"
            className="text-xs font-medium border-border/30 bg-muted/30"
          >
            +{gig.skills.length - 3}
          </Badge>
        )}
      </div>

      {/* Bottom Info Section */}
      <div className="space-y-4 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="font-semibold text-sm text-foreground">
              {gig.budget}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate flex-1">{gig.employer}</span>
          {gig.verified && (
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
          )}
        </div>
      </div>

      {/* CTA Button */}
      <Button className="w-full mt-5 crypto-gradient text-white hover:opacity-90 font-medium shadow-lg shadow-primary/20">
        View Details
      </Button>
    </Card>
  );
}
