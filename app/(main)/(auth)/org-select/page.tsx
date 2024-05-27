import { OrganizationList } from "@clerk/nextjs";

const OrgSelectPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-neutral-100">
      <OrganizationList hidePersonal={true} />
    </div>
  );
};

export default OrgSelectPage;
