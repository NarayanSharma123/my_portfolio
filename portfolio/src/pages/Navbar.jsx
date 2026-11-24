"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "Policy", href: "#policy" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B1120]/95 backdrop-blur-xl">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#home"
          className="text-2xl font-bold tracking-tight text-white"
        >
          Portfolio<span className="text-blue-400">.</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-blue-400"
            >
              {item.name}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 lg:inline-flex"
        >
          Let's Connect
        </a>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-lg border border-slate-700 p-2 text-slate-200 transition hover:bg-slate-800 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

        <Dialog.Panel className="fixed inset-y-0 right-0 w-full max-w-xs border-l border-slate-800 bg-[#0B1120] p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-white"
            >
              Portfolio<span className="text-blue-400">.</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Close navigation menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition hover:bg-slate-800 hover:text-blue-400"
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 block rounded-lg bg-blue-500 px-5 py-3 text-center font-semibold text-white hover:bg-blue-600"
          >
            Let's Connect
          </a>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
