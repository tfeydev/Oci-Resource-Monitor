import { useLocation, Link } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logos/thors-hammer-logo.jpg";

export default function Header() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Compute", href: "/compute" },
    { name: "Networking", href: "/networking" },
    { name: "Object Storage", href: "/storage/buckets" },
    { name: "Identity", href: "/identity" },
  ];

  function isPathActive(path: string) {
    // Erfasst sowohl "/dashboard" als auch "/"
    return location.pathname === path || (path === "/dashboard" && location.pathname === "/");
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-gray-100 shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo mit Link */}
              <Link to="/dashboard" className="flex items-center">
                <img src={logo} alt="OCI Monitor Logo" className="h-14 w-auto" />
              </Link>

              {/* Desktop-Navigation mittig */}
              <div className="hidden sm:flex sm:space-x-3 mx-auto">
                {navigation.map((item) => {
                  const active = isPathActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        "inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium transition-colors",
                        active
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile-Menu-Button */}
              <div className="sm:hidden">
                <DisclosureButton className="p-2 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile-Menü-Panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const active = isPathActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      "block rounded-md border px-3 py-2 text-base font-medium transition-colors",
                      active
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
