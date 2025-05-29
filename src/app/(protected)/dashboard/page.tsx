import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import SignOutButton from "./_components/singoutButton";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Dashboard</PageHeaderTitle>
          <PageDescription>
            Access a detailed overview of key metrics and patient outcomes
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <div>
          <p>{session?.user.name}</p>
          <SignOutButton></SignOutButton>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
