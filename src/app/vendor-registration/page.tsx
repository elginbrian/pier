import dynamic from "next/dynamic";

const ClientVendorRegistrationPage = dynamic(() => import("./ClientPage"), { ssr: false });

export default function Page() {
  return <ClientVendorRegistrationPage />;
}
