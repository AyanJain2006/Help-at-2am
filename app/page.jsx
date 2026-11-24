
import Link from "next/link";

const navigation = [
  { icon: "▦", label: "Dashboard", href: "/", active: true },
  { icon: "＋", label: "Emergency Assistance", href: "/student" },
  { icon: "⌖", label: "Campus Locations", href: "/student" },
  { icon: "▤", label: "My Requests", href: "/student" },
  { icon: "☎", label: "Emergency Contacts", href: "#contacts" },
];

const emergencyServices = [
  {
    number: "01",
    title: "Medical Assistance",
    description: "Medical emergencies and health-related concerns.",
    icon: "✚",
    color: "bg-[#FCEAE5] text-[#D77F69]",
  },
  {
    number: "02",
    title: "Campus Security",
    description: "Personal safety and campus security concerns.",
    icon: "◇",
    color: "bg-[#EDF1F5] text-[#64798C]",
  },
  {
    number: "03",
    title: "Fire & Safety",
    description: "Fire hazards and safety-related incidents.",
    icon: "△",
    color: "bg-[#FFF3E5] text-[#C58B4D]",
  },
];

const workflow = [
  {
    number: "01",
    title: "Submit Request",
    description: "Choose an emergency category and describe the situation.",
  },
  {
    number: "02",
    title: "Share Location",
    description: "Select your campus building, floor and specific area.",
  },
  {
    number: "03",
    title: "Staff Response",
    description: "View simulated acknowledgement and request status.",
  },
];

const emergencyContacts = [
  {
    number: "112",
    title: "Medical Support",
    description: "National emergency helpline for medical emergencies.",
    label: "National Emergency Helpline",
  },
  {
    number: "+91 1824 520150",
    title: "Campus Security",
    description: "LPU student well-being and crisis response contact.",
    label: "Campus Support",
  },
  {
    number: "112",
    title: "Fire & Safety",
    description: "National emergency helpline for fire emergencies.",
    label: "National Emergency Helpline",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F6F7] text-[#343A40]">

      {/* TOP ANNOUNCEMENT */}
      <div className="bg-[#F4A18D] px-4 py-2 text-center text-xs font-medium text-[#343A40]">
        Campus Safety Assistance Portal
        <span className="mx-2">•</span>
        Academic Simulation Prototype
      </div>

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E7E9EB] bg-white">
        <div className="flex h-[76px] items-center justify-between px-5 lg:px-8">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#343A40] text-xl font-bold text-white">
              H
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Help at 2 A.M.
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-[1.8px] text-[#818991]">
                Campus Assistance Portal
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <a href="#services" className="text-sm text-[#626A71] hover:text-[#D77F69]">
              Services
            </a>
            <a href="#process" className="text-sm text-[#626A71] hover:text-[#D77F69]">
              How it works
            </a>
            <a href="#contacts" className="text-sm text-[#626A71] hover:text-[#D77F69]">
              Contacts
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Student Portal</p>
              <p className="text-xs text-[#818991]">Welcome, Student</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCEAE5] font-bold text-[#B96E5B]">
              S
            </div>
          </div>

        </div>
      </header>

      <div className="flex">

        {/* SIDEBAR */}
        <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-[245px] shrink-0 flex-col border-r border-[#E7E9EB] bg-white lg:flex">

          <div className="px-5 pb-3 pt-7">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#A0A6AB]">
              Main Menu
            </p>
          </div>

          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-[#FCEAE5] text-[#B96E5B]"
                    : "text-[#667078] hover:bg-[#F5F6F7] hover:text-[#343A40]"
                }`}
              >
                <span className="w-5 text-center text-lg">
                  {item.icon}
                </span>
                {item.label}
                {item.active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#F4A18D]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="m-4 rounded-xl bg-[#F5F6F7] p-4">
            <p className="text-sm font-semibold">
              Need assistance?
            </p>
            <p className="mt-2 text-xs leading-5 text-[#818991]">
              Open the assistance portal to create a simulated request.
            </p>
            <Link
              href="/student"
              className="mt-4 block rounded-lg bg-[#F4A18D] px-3 py-2.5 text-center text-xs font-bold text-[#343A40] transition hover:bg-[#E88E78]"
            >
              Open Portal →
            </Link>
          </div>

          <div className="border-t border-[#E7E9EB] px-5 py-4">
            <p className="text-xs text-[#9AA1A7]">
              Version 1.0 · Academic Project
            </p>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10">

          {/* PAGE HEADING */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-xs font-medium text-[#92999F]">
                Home / Dashboard
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Student Dashboard
              </h2>
              <p className="mt-1 text-sm text-[#818991]">
                Campus assistance and safety information at one place.
              </p>
            </div>

            <Link
              href="/student"
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#F4A18D] px-5 py-3 text-sm font-semibold text-[#343A40] transition hover:bg-[#E88E78]"
            >
              <span className="text-lg">＋</span>
              New Assistance Request
            </Link>

          </div>

          {/* QUICK OVERVIEW */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            <div className="rounded-xl border border-[#E7E9EB] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#818991]">
                  Emergency Categories
                </p>
                <span className="rounded-lg bg-[#FCEAE5] px-3 py-2 text-[#C77D68]">
                  ✚
                </span>
              </div>
              <h3 className="mt-4 text-3xl font-bold">03</h3>
              <p className="mt-1 text-xs text-[#92999F]">
                Medical, Security and Fire
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E9EB] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#818991]">
                  Location Hierarchy
                </p>
                <span className="rounded-lg bg-[#EEF1F4] px-3 py-2 text-[#64798C]">
                  ⌖
                </span>
              </div>
              <h3 className="mt-4 text-3xl font-bold">03</h3>
              <p className="mt-1 text-xs text-[#92999F]">
                Building, Floor and Area
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E9EB] bg-white p-5 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#818991]">
                  Request Workflow
                </p>
                <span className="rounded-lg bg-[#F0F4EE] px-3 py-2 text-[#56866B]">
                  ✓
                </span>
              </div>
              <h3 className="mt-4 text-3xl font-bold">04</h3>
              <p className="mt-1 text-xs text-[#92999F]">
                Submission to resolution
              </p>
            </div>

          </section>

          {/* MAIN DASHBOARD GRID */}
          <section className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">

            {/* EMERGENCY SERVICES */}
            <div
              id="services"
              className="rounded-xl border border-[#E7E9EB] bg-white p-6"
            >

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#C77D68]">
                    Student Services
                  </p>
                  <h3 className="mt-2 text-xl font-bold">
                    Emergency Assistance
                  </h3>
                </div>
                <Link
                  href="/student"
                  className="text-xs font-semibold text-[#C77D68] hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {emergencyServices.map((service) => (
                  <div
                    key={service.number}
                    className="flex items-center gap-4 rounded-lg border border-[#ECEDEF] p-4 transition hover:border-[#F0B5A6] hover:bg-[#FFFCFB]"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl font-bold ${service.color}`}>
                      {service.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold">
                        {service.title}
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-[#818991]">
                        {service.description}
                      </p>
                    </div>

                    <Link
                      href="/student"
                      className="hidden rounded-md border border-[#E7E9EB] px-3 py-2 text-xs font-semibold transition hover:border-[#F4A18D] hover:bg-[#FCEAE5] sm:block"
                    >
                      Select →
                    </Link>
                  </div>
                ))}
              </div>

              <Link
                href="/student"
                className="mt-5 block rounded-lg bg-[#F4A18D] py-3.5 text-center text-sm font-bold text-[#343A40] transition hover:bg-[#E88E78]"
              >
                Create Assistance Request →
              </Link>

            </div>

            {/* QUICK INFORMATION */}
            <div className="space-y-6">

              <div className="rounded-xl border border-[#E7E9EB] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#C77D68]">
                  Quick Access
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Campus Information
                </h3>

                <div className="mt-5 space-y-4">

                  <Link
                    href="/student"
                    className="flex items-center justify-between border-b border-[#ECEDEF] pb-4 text-sm hover:text-[#C77D68]"
                  >
                    <span>Campus Location Selector</span>
                    <span>→</span>
                  </Link>

                  <a
                    href="#contacts"
                    className="flex items-center justify-between border-b border-[#ECEDEF] pb-4 text-sm hover:text-[#C77D68]"
                  >
                    <span>Emergency Contact Directory</span>
                    <span>→</span>
                  </a>

                  <Link
                    href="/student"
                    className="flex items-center justify-between text-sm hover:text-[#C77D68]"
                  >
                    <span>Track My Requests</span>
                    <span>→</span>
                  </Link>

                </div>
              </div>

              <div className="rounded-xl border border-[#F0D4CB] bg-[#FFF8F5] p-6">
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#C77D68]">
                  Important
                </p>

                <h3 className="mt-3 text-lg font-bold">
                  Know your location.
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#81736F]">
                  Familiarize yourself with your campus building,
                  floor and nearby landmarks to communicate your
                  location clearly.
                </p>

                <Link
                  href="/student"
                  className="mt-4 inline-block text-sm font-bold text-[#B96E5B] hover:underline"
                >
                  Explore Locations →
                </Link>
              </div>

            </div>

          </section>

          {/* WORKFLOW */}
          <section
            id="process"
            className="mt-8 rounded-xl border border-[#E7E9EB] bg-white p-6 sm:p-8"
          >

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#C77D68]">
                  Process Overview
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  How the system works
                </h3>
              </div>

              <p className="text-xs text-[#92999F]">
                Student → Location → Security
              </p>
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-3">
              {workflow.map((step) => (
                <div
                  key={step.number}
                  className="border-l-2 border-[#F4A18D] pl-5"
                >
                  <p className="text-xs font-bold text-[#C77D68]">
                    STEP {step.number}
                  </p>
                  <h4 className="mt-3 font-bold">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#818991]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </section>

          {/* EMERGENCY CONTACTS */}
          <section
            id="contacts"
            className="mt-8 rounded-xl border border-[#E7E9EB] bg-white p-6 sm:p-8"
          >

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#C77D68]">
                  Important Directory
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  Emergency Contacts
                </h3>
              </div>

              <p className="text-xs text-[#92999F]">
                Quick access to emergency assistance numbers.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={contact.title}
                  className="rounded-lg border border-[#ECEDEF] p-5 transition hover:border-[#F0B5A6] hover:bg-[#FFFCFB]"
                >
                  <p className="text-xs text-[#92999F]">
                    CONTACT 0{index + 1}
                  </p>

                  <h4 className="mt-3 font-semibold">
                    {contact.title}
                  </h4>

                  <p className="mt-2 min-h-10 text-xs leading-5 text-[#818991]">
                    {contact.description}
                  </p>

                  <p className="mt-3 text-lg font-bold tracking-wide text-[#343A40]">
                    {contact.number}
                  </p>

                  <p className="mt-1 text-[10px] text-[#92999F]">
                    {contact.label}
                  </p>

                  <a
                    href={`tel:${contact.number.replace(/\s/g, "")}`}
                    className="mt-4 inline-flex items-center rounded-lg border border-orange-200 bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-800 transition hover:bg-orange-200"
                  >
                    ☎ Call Now
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-[#E1E4E6] py-6 text-xs text-[#92999F] sm:flex-row">
            <p>© 2026 Help at 2 A.M. </p>
          </footer>

        </main>
      </div>
    </div>
  );
}
