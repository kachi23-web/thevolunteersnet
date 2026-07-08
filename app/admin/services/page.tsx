import { getServices } from "@/lib/content";
import { ServicesForm } from "./services-form";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Services</h1>
        <p className="mt-1 text-slate-600">
          Add, edit, or remove services displayed on the homepage and services
          page. You can have between 1 and 6 services.
        </p>
      </div>

      <ServicesForm initialServices={services} />
    </div>
  );
}
