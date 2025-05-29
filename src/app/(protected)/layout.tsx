import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/app-sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-zinc-100">{children}</main>
    </SidebarProvider>
  );
}
