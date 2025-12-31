import {
  UserCheck,
  Home,
  Crown,
  User2,
  ChevronUp,
  Users,
  KeyRound,
  Ticket,
  BookOpenCheck,
  ClipboardPenIcon,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authoptions";
import SignOutComponent from "./SignOutComponent";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/dashboard/users",
    icon: UserCheck,
  },
  {
    title: "Banner",
    url: "/admin/dashboard/banner",
    icon: Ticket,
  },
  {
    title: "Programs",
    url: "/admin/dashboard/program",
    icon: BookOpenCheck,
  },
  {
    title: "Application",
    url: "/admin/dashboard/application",
    icon: ClipboardPenIcon,
  },
  { title: "My Team", url: "/admin/dashboard/ourTeam", icon: Users },
    { title: "Partners", url: "/admin/dashboard/partners", icon: Crown },

   {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const userName = session?.user.firstName;
  return (
    <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <span className="border text-black rounded mb-2.5"></span>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="min-w-44 rounded-lg shadow-lg"
              >
          
                <DropdownMenuItem>
                  <Link
                    href="/change-password"
                    className="text-sm flex flex-row gap-1"
                  >
                    <KeyRound width={4} height={4} className="mt-1" />
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <SignOutComponent />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
