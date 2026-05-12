import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { cn } from "@/app/components/ui/utils";

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "[&>*]:size-6 [&>*:not(:first-child)]:-ml-2",
      md: "[&>*]:size-8 [&>*:not(:first-child)]:-ml-3",
      lg: "[&>*]:size-10 [&>*:not(:first-child)]:-ml-4",
    },
  },
  defaultVariants: { size: "md" },
});

export interface AvatarGroupItem {
  /** Unique key. */
  id: string;
  /** Image src URL. */
  src?: string;
  /** Fallback initials when no src (e.g. "JD"). */
  fallback: string;
  /** Alt text for the image. */
  alt?: string;
}

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  /** List of avatars to show. */
  avatars: AvatarGroupItem[];
  /** Maximum avatars to display before showing overflow count. */
  max?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size, avatars, max, ...props }, ref) => {
    const visible = max ? avatars.slice(0, max) : avatars;
    const overflow = max && avatars.length > max ? avatars.length - max : 0;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`${avatars.length} avatars`}
        className={cn(avatarGroupVariants({ size }), className)}
        {...props}
      >
        {visible.map((a) => (
          <Avatar
            key={a.id}
            className="ring-2 ring-background"
            title={a.fallback}
          >
            {a.src && <AvatarImage src={a.src} alt={a.alt ?? a.fallback} />}
            <AvatarFallback className="text-xs">{a.fallback}</AvatarFallback>
          </Avatar>
        ))}
        {overflow > 0 && (
          <div
            aria-label={`${overflow} more`}
            className="ring-2 ring-background flex items-center justify-center rounded-full bg-muted text-xs text-muted-foreground font-medium"
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup, avatarGroupVariants };
