"use client";

import { Bell, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDate } from "@/lib/utils";


import { UseUnreadCount } from "../api/use-unread-count";
import { useMarkAllAsRead } from "../api/use-mark-all-as-read";
import { useConvexAuth } from "convex/react";
import { UseAllNotifications } from "../api/use-get-all-notification";

export const Notifications = () => {
  const { isAuthenticated } = useConvexAuth();
  const { data: unreadCount, isLoading: unreadCountLoading } = UseUnreadCount();
  const { mutate: markAllAsRead } = useMarkAllAsRead();
  const { data: notifications, isLoading: notificationsLoading } =
    UseAllNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="View notifications"
        >
          <Bell className="size-4" />

          {!unreadCountLoading  && (unreadCount || 0) > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}

          {/* {!unreadCountLoading && unreadCount && unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="center">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {!unreadCountLoading  && (unreadCount || 0) > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              disabled={!isAuthenticated}
              onClick={async () => {
                if (!isAuthenticated) {
                  return;
                }
                await markAllAsRead();
              }}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {!notificationsLoading &&
          notifications &&
          notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            <div className="divide-y">
              {!notificationsLoading &&
                notifications &&
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={cn(
                      "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/30"
                    )}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      {notification.type === "message" ? (
                        <MessageSquare className="size-4 text-primary" />
                      ) : (
                        <Heart className="size-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium uppercase">
                          {notification.actorName}
                        </span>{" "}
                        {notification.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(new Date(notification._creationTime))}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
