"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import {
  IconChevronDown,
  IconArrowUpRight,
  IconBook,
  IconBooks,
  IconCalendar,
  IconBriefcase,
  IconMail,
  IconPhone,
  IconClock,
  IconWorld,
  IconTruckDelivery,
  IconBuilding,
  IconPencil,
  IconDeviceLaptop,
  IconId,
  IconPrinter,
  IconDeviceMobile,
  IconMicrophone,
  IconMusic,
  IconConfetti,
  IconMap,
  IconSearch,
  IconAccessible,
  IconDevices,
  IconSchool,
  IconLanguage,
  IconPackage,
  IconDeviceTv,
  IconPhoto,
  IconTicket,
  IconDna,
  IconFileText,
  IconTree,
  IconCamera,
  IconMicroscope,
  IconTarget,
  IconSitemap,
  IconHeart,
  IconAward,
  IconHeartHandshake,
  IconUsers,
  IconHelpCircle,
  IconBabyCarriage,
} from "@tabler/icons-react";
import { navTree, type NavNode } from "@/lib/site-data";
import type { ComponentType } from "react";

type IconProps = { size?: number; stroke?: number; className?: string };
type IconComponent = ComponentType<IconProps>;

const navIconMap: Record<string, IconComponent> = {
  // About
  "175 Years of Service": IconBooks,
  "Contact Us": IconMail,
  "FAQ": IconHelpCircle,
  "Hours, Parking, & Bookdrops": IconClock,
  "Job Openings": IconBriefcase,
  "Library Board": IconSitemap,
  "Policies": IconFileText,
  "Strategic Plan": IconTarget,
  // Services
  "Call Ahead Pickup": IconPhone,
  "Citizenship and Immigration": IconWorld,
  "English Classes": IconLanguage,
  "Home Delivery": IconTruckDelivery,
  "Job Support Appointments": IconBriefcase,
  "Meeting Spaces": IconBuilding,
  "Notary": IconPencil,
  "One-on-One Technology Help": IconDeviceLaptop,
  "Passports": IconId,
  "Print From Anywhere": IconPrinter,
  "Text Notifications": IconDeviceMobile,
  // Events
  "Changing Minds Book Club": IconBook,
  "Event Calendar": IconCalendar,
  "Evening with an Author": IconMicrophone,
  "Harris Sisters Month (April)": IconMusic,
  "Jim Lafayette Memorial Series": IconMicrophone,
  "O'tis a Festival": IconConfetti,
  "Passport to Connecticut Libraries": IconMap,
  // Books & More
  "Catalog": IconBooks,
  "CT Library for Accessible Books": IconAccessible,
  "Digital Collection": IconDevices,
  "Education & Learning Resources": IconSchool,
  "Employment Resources": IconBriefcase,
  "Foreign Language Collections": IconLanguage,
  "Learn a Language": IconLanguage,
  "Library of Things": IconPackage,
  "Media Literacy Monthly": IconDeviceTv,
  "On Exhibit": IconPhoto,
  "Passes to Local Attractions": IconTicket,
  // Local History
  "Ancestry Databases and Resources": IconDna,
  "Local History Policies": IconFileText,
  "Genealogy Collections": IconTree,
  "Historical Photographs": IconCamera,
  "Microfilm Collection": IconMicroscope,
  "Norwich Bulletin Digitized": IconFileText,
  "Research Services": IconSearch,
  "Snippets from Norwich History": IconBook,
  // Youth
  "Children": IconBabyCarriage,
  "Tweens & Teens": IconSchool,
  // How Can I Help?
  "Support Otis Library": IconHeart,
  "Donor Spotlight": IconAward,
  "Volunteer": IconHeartHandshake,
  "Friends of Otis Library": IconUsers,
  "Newsletter": IconMail,
};

type Featured = { label: string; description: string; href: string; external?: boolean };

const featuredBySection: Record<string, Featured> = {
  Events: {
    label: "Event Calendar",
    description: "Browse all upcoming programs, talks, and storytimes at Otis Library.",
    href: "https://otislibrarynorwich.libcal.com/calendar/otislibrary?cid=19576&t=g&d=0000-00-00&cal=19576&inc=0",
    external: true,
  },
  "Books & More": {
    label: "Digital Collection",
    description: "Borrow eBooks, audiobooks, movies, and more — free 24/7 with your library card.",
    href: "/digital-collection",
  },
  "Local History": {
    label: "Snippets from Norwich History",
    description: "A monthly series on the history of Norwich, CT — from mills to mariners.",
    href: "/local-history#snippets",
  },
  "How Can I Help?": {
    label: "Support Otis Library",
    description: "Your gift helps fund programs, collections, and services for every Norwich resident.",
    href: "/support",
  },
};

function LinkItem({ node }: { node: NavNode }) {
  const Icon = navIconMap[node.label];
  const base =
    "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white";

  const inner = (
    <>
      {Icon && (
        <Icon
          size={14}
          stroke={1.75}
          className="shrink-0 text-slate-500 transition group-hover:text-brand"
        />
      )}
      <span className="flex-1">{node.label}</span>
      {node.external && (
        <IconArrowUpRight
          size={12}
          className="shrink-0 text-slate-600 transition group-hover:text-brand"
          aria-hidden
        />
      )}
    </>
  );

  return node.external ? (
    <a href={node.href} target="_blank" rel="noopener noreferrer" className={base}>
      {inner}
    </a>
  ) : (
    <NavigationMenu.Link asChild>
      <Link href={node.href} className={base}>
        {inner}
      </Link>
    </NavigationMenu.Link>
  );
}

function Panel({ section }: { section: NavNode }) {
  const children = section.children ?? [];
  const featured = featuredBySection[section.label];
  const half = Math.ceil(children.length / 2);
  const col1 = children.slice(0, half);
  const col2 = children.slice(half);

  return (
    <div className="flex gap-8 p-5">
      {/* Link columns */}
      <div
        className={`grid flex-1 auto-rows-min content-start gap-x-2 ${
          col2.length > 0 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        <div className="flex flex-col gap-0.5">
          {col1.map((child) => (
            <LinkItem key={child.label} node={child} />
          ))}
        </div>
        {col2.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {col2.map((child) => (
              <LinkItem key={child.label} node={child} />
            ))}
          </div>
        )}
      </div>

      {/* Featured card */}
      {featured && (
        <div className="w-48 shrink-0">
          {featured.external ? (
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-brand/20 bg-brand-deep/20 p-4 transition hover:border-brand/50 hover:bg-brand-deep/30"
            >
              <p className="text-sm font-semibold text-white transition group-hover:text-brand">
                {featured.label}
              </p>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-400">
                {featured.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                Open <IconArrowUpRight size={11} aria-hidden />
              </span>
            </a>
          ) : (
            <NavigationMenu.Link asChild>
              <Link
                href={featured.href}
                className="group flex h-full flex-col rounded-xl border border-brand/20 bg-brand-deep/20 p-4 transition hover:border-brand/50 hover:bg-brand-deep/30"
              >
                <p className="text-sm font-semibold text-white transition group-hover:text-brand">
                  {featured.label}
                </p>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-400">
                  {featured.description}
                </p>
                <span className="mt-3 text-xs font-semibold text-brand">Explore →</span>
              </Link>
            </NavigationMenu.Link>
          )}
        </div>
      )}
    </div>
  );
}

export function MegaNav() {
  const sections = navTree.filter((n) => n.children?.length);

  return (
    <NavigationMenu.Root className="relative flex w-full" delayDuration={100}>
      <NavigationMenu.List className="flex items-center gap-0.5">
        {sections.map((section) => (
          <NavigationMenu.Item key={section.label}>
            <NavigationMenu.Trigger className="group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-300 outline-none transition hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-brand data-[state=open]:bg-white/5 data-[state=open]:text-white">
              {section.label}
              <IconChevronDown
                size={13}
                aria-hidden
                className="transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </NavigationMenu.Trigger>

            <NavigationMenu.Content className="w-full">
              <Panel section={section} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* Viewport: anchored to the left edge of the nav row, full width. */}
      <div className="absolute left-0 top-full z-50 w-full pt-1">
        <NavigationMenu.Viewport className="mega-nav-viewport w-full overflow-hidden rounded-xl border border-white/10 bg-ink/95 shadow-2xl backdrop-blur-xl" />
      </div>
    </NavigationMenu.Root>
  );
}
